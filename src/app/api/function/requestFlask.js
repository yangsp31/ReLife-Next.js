const header = new Headers();
header.append('Content-Type', 'application/json')

//Flaks 서버에 파노라마 이미지 요청 (테스트 불가)
export async function requestPanorama(cookie, fileUrls) {
    try {
        const body = JSON.stringify({
            cookie : cookie,
            fileUrls : fileUrls
        })

        const requestOption = {
            method : 'POST',
            headers : header,
            body : body,
        }

        console.log(requestOption)

        const response = await fetch('http://3.37.56.42:5000/Flask/Generate', requestOption)

        if(response.ok) {
            const result = await response.json()
            return result.fileUrl
        }
        else {
            throw new Error('서버 응답 오류');
        }
    }
    catch (error) {
        console.log(error)
        throw error
    }
}

export async function requestDistortion(cookie, fileUrl) {
    try {
        const body = JSON.stringify({
            cookie : cookie,
            fileUrl : fileUrl
        })

        const requestOption = {
            method : 'POST',
            headers : header,
            body : body,
        }

        const response = await fetch('http://3.37.56.42:5000/Flask/Distortion', requestOption)

        if(response.ok) {
            const result = await response.json()
            return result.fileUrl
        }
        else {
            return fileUrl
        }
    }
    catch (error) {
        console.log(error)
        throw error
    }
}