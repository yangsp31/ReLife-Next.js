import {korToEn} from '../function/translate'
import { NextResponse } from 'next/server';

export async function GET() {
    console.log(await korToEn('Hi? jenny 22'));

    return NextResponse.json({success : "ok24jfdfd"}, {status : 200});
}