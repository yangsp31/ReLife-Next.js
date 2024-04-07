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

        /*const response = await fetch('localhost:5000/flask/panorama', requestOption)
        const result = await response.json()

        return result.panoramaUrl*/
    }
    catch (error) {
        console.log(error)
        throw error
    }
}