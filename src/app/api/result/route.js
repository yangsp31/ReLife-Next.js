import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getGenerateUrl } from "../function/kvRedis"

// 최종 결과물 요청 처리
export async function GET(request) {
    try {
        const cookie = cookies()

        // 쿠키값 존재 확인
        if(!cookie.has("user")) {
            return NextResponse.json({error : "Not Cookie"}, {status : 400})
        }

        // 쿠키값을 기반으로 최종 결과이미지 URL 가져오기
        const result = await getGenerateUrl(cookie.get("user").value)

        // 이미지 URL의 존재 여부에 따라 client에게 대기요청 또는 결과물 응답
        if(result !== null && result !== undefined) {
            return NextResponse.json({process : "success", url : result}, {status : 200})
        }
        else {
            return NextResponse.json({process : "wating"}, {status : 200})
        }
    }
    catch (error) {
        console.log(error)
    }
}