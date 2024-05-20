import { getResult } from "../function/getResultImage";
import { extname } from 'path';
import { NextResponse } from "next/server";


export async function POST(request, response) {
    try {
        const data = await request.json();
    
        const image = await getResult(data.url)
        const ext = extname(data.url).slice(1)
        console.log(image)
        
        return new NextResponse(image, {
            status : 200,
            headers : {
                'Content-Type' : ext
            }
        })
    }
    catch (error) {
        console.log(error)
    }
}