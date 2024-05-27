import { NextResponse } from "next/server";
import { requestGenerate } from "../../function/reimaginehomeAPI";
import { setGenerateId, setMaskTaskData } from "../../function/kvRedis";

//생성된 mask이미지 응답 받는 웹훅
export async function POST(request) {
    try {
    const body = await request.json();
    const urls = body.data.masks.map(mask => mask.url);

    // 응답 상태에 따라 생성된 이미지UR f redis(vercel KV)에 저장 후 reImagineHome API에 이미지 변환 요청
    if(body.status === "success" && body.data.job_status === "done") {
        await setMaskTaskData(body.data.job_id, urls)
        const generateId = await requestGenerate(body.data.job_id, urls)
        console.log(body.data.job_id)
        console.log(generateId)

        await setGenerateId(body.data.job_id, generateId)
    }
    else {
        console.log(JSON.stringify(body));
    }
    }
    catch (error) {
        console.log(error)
    }

    return NextResponse.json({success : "ok"}, {status : 200});

}
