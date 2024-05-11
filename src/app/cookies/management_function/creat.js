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
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = ck_01 + '=' + (id || '') + expires + '; path=/';
    }
};


export const readCookie = (ck_01) => {
    if (typeof window !== 'undefined') {
        let nameEQ = ck_01 + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};
export const deleteCookie = (ck_01) => {
    if (typeof window !== 'undefined') {
        document.cookie = ck_01 + '=; Max-Age=-1; path=/';
    }
};

export const checkCookieConsent = () => {
    const consentFromCookie = readCookie('cookieConsent') === 'true';
    const consentFromLocalStorage = localStorage.getItem('cookieConsent') === 'true';
    return !!consentFromCookie || !!consentFromLocalStorage;

};


export const giveConsent = () => {
    // 현재 날짜와 시간을 구함
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD 형식
    const formattedTime = now.toTimeString().slice(0, 8); // HH:MM:SS 형식

    // 쿠키 값으로 "relife + 날짜 + 시간"을 설정
    const cookieValue = `relife${formattedDate}${formattedTime}`;

    // 쿠키 생성
    createCookie('cookieConsent', cookieValue, 7);
    localStorage.setItem('cookieConsent', cookieValue); // 로컬 스토리지에도 저장

    // 생성된 쿠키 값 출력
    console.log("Created cookie value: ", readCookie('cookieConsent'));
};



//cookies 존재 여부 확인
console.log("User consent status: ", readCookie('cookieConsent'));
