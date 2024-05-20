import { v4 as uuidv4 } from 'uuid'; //쿠키값을 고유식별자로 성정하기 위해 필요한 기능

//////////////////////////////////////////////////////////////////////////
///모든 쿠키 즉시 삭제 (테스트를 위한 코드로 테스트 완료시 삭제하시면 됩니다.)
export const clearAllCookies = () => {
    if (typeof window !== 'undefined') {
        const cookies = document.cookie.split(";");

        for (let c of cookies) {
            const eqPos = c.indexOf('=');
            const cookieName = eqPos > -1 ? c.substr(0, eqPos) : c.trim();
            document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
    }
};
export const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
        localStorage.clear();
    }
};

///////////////////////////////

//id: 사용자 고유의 식별자 또는 데이터로, 쿠키에 저장될 값 (id가 제공되지않으면 빈 문자열이 기본값)
export const createCookie = (ck_01, id, days=7) => {
    //서버 측 렌더링을 확인(실행환경이 클라이언트 환경일때만 실행)
    if (typeof window !== 'undefined') {
        //expires 변수는 쿠키 만료일을 나타내는 문자열을 저장할 공간으로 초기화
        let expires = '';
        //day(만료일이 주어졌을때 실행)
        if (days) {
            //Date객체: 날짜와 시간가져옴
            let date = new Date();
            //현재 시간을 기준으로 만료일(days)을 밀리초 단위로 계산
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            // UTC(협정세계시) 형식으로 만료일 설정
            expires = '; expires=' + date.toUTCString();
        }
        //쿠키 설정
        document.cookie = ck_01 + '=' + (id || '') + expires + '; path=/';
    }
};

export const readCookie = (ck_01) => {
    if (typeof window !== 'undefined') { //클라이언트 환경에서 실행되고 있는지 확인
        let nameEQ = ck_01 + '=';
        //각 쿠키는 ;으로 구분
        let ca = document.cookie.split(';');
        //document.cookie에서 반환된 모든 쿠키를 순차적으로 검사
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            //앞 공백제거(공백을 제거하지 않으면 올바르게 비교X-> 원하는 쿠키 값을 찾을 수 없음)
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            //nameEQ = 쿠키이름(46번줄)->동일한 쿠키이름임이 성립되면 쿠키이름을 제외한값 추출(substring 명령어)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};
//ck_01이름의 쿠키삭제 
export const deleteCookie = (ck_01) => {
    if (typeof window !== 'undefined') {
        // 쿠키 만료 시간을 과거로 설정하여 삭제
        document.cookie = ck_01 + '=; Max-Age=-1; path=/';
    }
};

// 쿠키와 로컬 스토리지에서 사용자 동의 확인
export const checkCookieConsent = () => {
    const consentFromCookie = readCookie('cookieConsent') === 'true';    //쿠키에서 동의여부 확인 
    return !consentFromCookie; //동의했으면 true반환 

};

// 사용자의 동의를 받아 쿠키와 로컬 스토리지에 저장
export const giveConsent = () => {
    const cookieValue = uuidv4(); // 쿠키값 UUID(범용고유식별자)로 생성 
    // 쿠키 생성 ->쿠키에 저장
    createCookie('cookieConsent', cookieValue, 7); 
    console.log("Created cookie value: ", cookieValue); // 생성된 쿠키 값 출력
};


//cookies 존재 여부 확인(콘솔창)
console.log("User consent status: ", readCookie('cookieConsent'));
