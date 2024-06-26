import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { uploadSingleImage } from "./singleUpload";
import {requestMask} from "../function/reimaginehomeAPI";
import { setMaskId, setTaskData } from "../function/kvRedis";
import { korToEn } from "../function/translate";

//단일 이미지 요청 처리 
export async function POST(request) {
    try {
        const cookie = cookies();
        const formData = await request.formData();
        const file = formData.get("file");
        var prompt

        // 쿠키와 파일과 같은 필수 리소스 확인
        if(!cookie.has("cookieConsent") || !file) {
            return NextResponse.json({error : "require cookie or image"}, {status : 400})
        }

        // AWS S3에 파일 업로드 후 reimagineHone API에 mask 생성 요청
        const fileUrl = await uploadSingleImage(cookie.get("cookieConsent").value, file);
        const info = await requestMask(fileUrl);

        // reimagineHome API의 응답에 따라 redis(Vercel KV)에 사용자의 작업정보 저장
        if(info.status === 'success') {
            const result = await Promise.all([
                setMaskId(info.data.job_id, cookie.get("cookieConsent").value, 'single'),
                korToEn(formData.get("prompt"))
            ])

            const prompt = result[1]
            console.log(prompt)
            await setTaskData(cookie.get("cookieConsent").value, fileUrl, formData.get("spaceType"), formData.get("designTheme"), prompt)
        }
        else {
            console.log(info)
            return NextResponse.json({error : "Error service"}, {status : 500});
        }

        return NextResponse.json({true : "success"}, {status : 200});
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({error : "Error service"}, {status : 500});
    }
}