export async function getResult(url) {
    try {
        const response = await fetch(url)
        const data = await response.arrayBuffer()

        return data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}