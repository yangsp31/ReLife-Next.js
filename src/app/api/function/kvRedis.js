import { createClient } from "@vercel/kv";

// redis (Vercel KV)와 연결
const relifeKv = createClient({
    url : process.env.KV_REST_API_URL,
    token : process.env.KV_REST_API_TOKEN
});

// 쿠키를 키값으로 사용자별 작업 데이터 저장
export async function setTaskData(cookie, url, spaceType, designTheme, prompt) {
    try {
        const exit = await relifeKv.exists(cookie)

        if(exit === 1) {
            await relifeKv.del(cookie);
            await relifeKv.hset(`${cookie}`, {imageUrl : url, spaceType : spaceType, designTheme : designTheme, prompt : prompt})
        }
        else {
            await relifeKv.hset(`${cookie}`, {imageUrl : url, spaceType : spaceType, designTheme : designTheme, prompt : prompt})
        }
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

// API로 부터 받아온 mask작업ID를 키값으로 요청한 사용자의 쿠키와 매칭
export async function setMaskId(jobId, cookie) {
    try {
        await relifeKv.set(`${jobId}`, `${cookie}`, {ex : 300, nx : true})
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

// API로 부터 받아온 generate작업ID를 키값으로 요청한 사용자의 쿠키와 매칭
export async function setGenerateId(maskJobId, generateJobId) {
    try {
        const cookie = await relifeKv.get(`${maskJobId}`)

        await relifeKv.set(`${generateJobId}`, `${cookie}`, {ex : 300, nx : true})
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

// 웹훅을 통해 API로부터 받아온 mask이미지URL을 사용자와 매칭후 저장
export async function setMaskTaskData(jobId, url) {
    try {
        const cookie = await relifeKv.get(`${jobId}`)

        await relifeKv.hset(`${cookie}`, {maskUrl : url})
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

// 웹훅을 통해 API로부터 받아온 generate이미지URL을 사용자와 매칭후 저장
export async function setGenerateTaskData(jobId, url) {
    try {
        const cookie = await relifeKv.get(`${jobId}`)

        await relifeKv.hset(`${cookie}`, {generateUrl : url})
    } 
    catch (error) {
        console.log(error)
        throw error;
    }
}

// mask작업ID를 이용하여 사용자 탐색 후 사용자 작업정보에서 필요한 값 가져오기
export async function getMaskTaskData(jobId) {
    try {
        const cookie = await relifeKv.get(`${jobId}`)
        const fields = ["imageUrl", "spaceType", "designTheme", "prompt"]
        const values = {}

        for (const field of fields) {
            const value = await relifeKv.hget(`${cookie}`, field)

            values[field] = value
        }

        return values
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

// 쿠키를 사용하여 사용자 작업정보에서 변환된 이미지 URL 가져오기
export async function getGenerateUrl (cookie) {
    try {
        const url = await relifeKv.hget(`${cookie}`, "generateUrl")

        return url
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}

// 쿠키와 사용자에게 받아온 데이터를 활용하여 작업 데이터 갱신/가져오기
export async function reGenerateTask(cookie, data) {
    try {
        await relifeKv.hdel(`${cookie}`, "generateUrl")

        if(data.setting === true) {
            await relifeKv.hset(`${cookie}`, {designTheme : data.designTheme, prompt : data.prompt})
        }

        const taskData = await relifeKv.hgetall(`${cookie}`)

        return taskData
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

// 재요청한 이미지 변환 작업ID 쿠키와 매칭
export async function setReGenerateId(cookie, generateJobId) {
    try {
        await relifeKv.set(`${generateJobId}`, `${cookie}`, {ex : 300, nx : true})
    }
    catch (error) {
        console.log(error)
        throw error
    }
}