import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../management_function/creat.client';

const CookieConsentBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (getCookie('userConsent') !== 'true') {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        setCookie('userConsent', 'true', 7); 
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div style={bannerStyle}>
            <p>이 웹사이트는 사용자 경험을 향상시키기 위해 쿠키를 사용합니다. 계속 진행하려면 쿠키 사용에 동의해 주세요.</p>
            <button onClick={handleAccept}>동의하기</button>
        </div>
    );
};

const bannerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'lightgray',
    padding: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 3px rgba(0,0,0,0.2)'
};

export default CookieConsentBanner;
