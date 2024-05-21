import { getMaskTaskData, setReGenerateId, reGenerateTask } from "./kvRedis";

const header = new Headers();
header.append("api-key", process.env.REIMAGINEHOME_API_KEY)
header.append("Content-Type", "application/json")

// reImagineHome API에 mask생성 요청
export async function requestMask(url) {
    try {
        const body = JSON.stringify({
            "image_url" : `${url}`,
            "webhook_url" : "https://e1eb-61-34-253-110.ngrok-free.app/api/webhook/mask"
        });

        const requestOption = {
            method : "POST",
            headers : header,
            body : body,
            redirect : 'follow'
        };

        console.log(url)

        const response = await fetch(`${process.env.NEXT_PUBLIC_REIMAGINEHOME_API_URL}/v1/create_mask`, requestOption);
        const result = await response.json()
        
        return result;
    }
    catch(error) {
        console.log(error)
        throw error;
    }
}

// reImagineHome API에 이미지 변환 요청
export async function requestGenerate(jobId, maskUrl) {
    try {
        const data = await getMaskTaskData(jobId)

        const body = JSON.stringify({
            "image_url" : `${data.imageUrl}`,
            "mask_urls" : maskUrl,
            "mask_category" : 'furnishing',
            "space_type" : `${data.spaceType}`,
            "design_theme" : `${data.designTheme}`,
            "additional_prompt" : `${data.prompt}`,
            "generation_count" : 1,
            "webhook_url" : "https://e1eb-61-34-253-110.ngrok-free.app/api/webhook/generate"
        });
        
        const requestOption = {
            method : "POST",
            headers : header,
            body : body,
            redirect : 'follow'
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_REIMAGINEHOME_API_URL}/v1/generate_image`, requestOption)
        const result = await response.json()

        return result.data.job_id
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

// reImagineHome API에 이미지 재변환 요청
export async function reGenerate(taskData) {
    try {

        const body = JSON.stringify({
            "image_url" : `${taskData.imageUrl}`,
            "mask_urls" : taskData.maskUrl,
            "mask_category" : 'furnishing',
            "space_type" : `${taskData.spaceType}`,
            "design_theme" : `${taskData.designTheme}`,
            "additional_prompt" : `${taskData.prompt}`,
            "generation_count" : 1,
            "webhook_url" : "https://e1eb-61-34-253-110.ngrok-free.app/api/webhook/generate"
        });
        
        const requestOption = {
            method : "POST",
            headers : header,
            body : body,
            redirect : 'follow'
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_REIMAGINEHOME_API_URL}/v1/generate_image`, requestOption)
        const result = await response.json()

        return result.data.job_id
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}
