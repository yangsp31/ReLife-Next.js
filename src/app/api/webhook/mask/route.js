import { NextResponse } from "next/server";
import { requestGenerate } from "../../function/reimaginehomeAPI";
import { setGenerateId, setMaskTaskData } from "../../function/kvRedis";

//생성된 mask이미지 응답 받는 웹훅
export async function POST(request) {
    const body = await request.json();
    const urls = body.data.masks.map(mask => mask.url);

    // 응답 상태에 따라 생성된 이미지URL redis(vercel KV)에 저장 후 reImagineHome API에 이미지 변환 요청
    if(body.status === "success" && body.data.job_status === "done") {
        setMaskTaskData(body.data.job_id, urls)
        const generateId = await requestGenerate(body.data.job_id, urls)

        setGenerateId(body.data.job_id, generateId)
    }
    else {
        console.log(JSON.stringify(body));
    }

    return NextResponse.json({success : "ok"}, {status : 200});
}