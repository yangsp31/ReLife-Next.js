import * as deepl from 'deepl-node';

const translator = new deepl.Translator(process.env.DEEPL_AUTHKEY);
const kor =  /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;

export async function korToEn(prompt) {
    try {
        if(kor.test(prompt)) {
            const result = await translator.translateText(prompt, null, 'en-US');
            
            return result.text;
        }
        else {
            return prompt;
        }
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}