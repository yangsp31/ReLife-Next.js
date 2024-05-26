import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { requestMask } from "../function/reimaginehomeAPI";
import { uploadMultiImage } from "./multiUpload";
import { requestPanorama, requestDistortion } from "../function/requestFlask";
import { korToEn } from "../function/translate";
import { setMaskId, setTaskData } from "../function/kvRedis";

// 파노라마 이미지 요청 처리
export async function POST(request) {
    try {
        const cookie = cookies()
        const formData = await request.formData()
        const images = formData.getAll("file")

        // 쿠키와 파일과 같은 필수 리소스 확인
        if(!cookie.has('cookieConsent') || images.length === 0) {
            return NextResponse.json({error : "require cookie or image"}, {status : 400})
        }

        // AWS S3에 파일 업로드 후 flask 서버에 파노라마 이미지 요청 후 reimagineHone API에 mask 생성 요청
        const fileUrls = await uploadMultiImage(cookie.get("cookieConsent").value, images)
        const panoramaUrl = await requestPanorama(cookie.get('cookieConsent').value, fileUrls)
        /*const info = await requestMask(panoramaUrl);

        // reimagineHome API의 응답에 따라 redis(Vercel KV)에 사용자의 작업정보 저장
        if(info.status === 'success') {
            const result = await Promise.all([
                setMaskId(info.data.job_id, cookie.get("cookieConsent").value, 'panorama'),
                korToEn(formData.get("prompt"))
            ])

            const prompt = result[1]

            await setTaskData(cookie.get("cookieConsent").value, panoramaUrl, formData.get("spaceType"), formData.get("designTheme"), prompt)
        }
        else {
            console.log(info)
            return NextResponse.json({error : "Error service"}, {status : 500});
        }*/

        return NextResponse.json({true : "success"}, {status : 200});

    }
    catch (error) {
        console.log(error)
        return NextResponse.json({error : "Error service"}, {status : 500});
    }
}