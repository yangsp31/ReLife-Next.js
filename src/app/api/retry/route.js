import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { reGenerate } from "../function/reimaginehomeAPI";
import { reGenerateTask, setReGenerateId } from "../function/kvRedis";

//이미지 변환 재요청 처리
export async function POST (request) {
    try {
        const cookie = cookies();
        const data = await request.json();

        if(!cookie.has("cookieConsent")) {
            return NextResponse.json({error : "require cookie"}, {status : 400})
        }

        // redis(vercel KV)에 사용자의 데이터 입력 여부에 따라 작업정보를 갱신
        const taskData = await reGenerateTask(cookie.get("cookieConsent").value, data)

        // 갱신된 사용자 작업 정보를 바탕으로 reimagineHome API로 이미지 재변환 요청
        const info = await reGenerate(taskData)

        // 쿠키와 이미지 재변환ID 매칭
        await setReGenerateId(cookie.get("cookieConsent").value, info,data.type)

        return NextResponse.json({true : "success"}, {status : 200});
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({error : "Error service"}, {status : 500});
    }
}