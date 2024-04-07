import { NextResponse } from "next/server";
import { setGenerateTaskData } from "../../function/kvRedis";

// 생성된 이미지 응답 받는 웹훅
export async function POST(request) {
    const body = await request.json();
    const urls = body.data.generated_images

    // 응답 상태에 따라 생성된 이미지URL redis(vercel KV)에 저장
    if(body.status === "success" && body.data.job_status === "done") {
        setGenerateTaskData(body.data.job_id, urls)
    }
    else {
        console.log(JSON.stringify(body));
    }

    return NextResponse.json({success : "ok"}, {status : 200});
}