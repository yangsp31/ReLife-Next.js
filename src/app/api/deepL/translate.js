import * as deepl from 'deepl-node';

const authKey = "01d980d0-8136-4271-9cf8-98c5fc1c7a93:fx"; //키값
//클래스 인스턴스 생성(DeepL API로 텍스트 번역 요청)
const translator = new deepl.Translator(authKey); 

(async () => {
    const result = await translator.translateText(prompt, null, 'en'); //(번역할 텍스트, 소스언어(null로 지정하면 자동으로 감지, 번역결과 언어)
    //콘솔창에 결과값 띄움
    console.log(result.text); 
})();