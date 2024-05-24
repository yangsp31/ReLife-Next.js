"use client";
import React, { useEffect, useState } from 'react';
import { checkCookieConsent, giveConsent  } from "../management_function/creat";

const CookieConsentBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const hasConsent = checkCookieConsent();
        setShowBanner(!hasConsent);
    }, []);

    const handleGiveConsent = () => {
        giveConsent();
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white', 
            color: '#333',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            zIndex: 1000,
        }}>
            <div style={{flex: 1}}>
                <h4 style={{margin: 0}}>이 사이트는 쿠키를 사용합니다</h4>
                <p>
                    당사는 당사 웹 사이트의 기능성 및 메인에 있는 사용자 체험을 위해 쿠키를 사용함
                    쿠키는 로그인 기능을 대신해 사용자를 식별할 목적으로 쓰입니다. 쿠키를 제공을 거부할 시 해당 사이트의 이용이 제한됩니다.
                    쿠키 설정 및 기타 설정을 변경하려면 <strong>쿠키 설정</strong>을 확인하세요.

                </p>
            </div>
            <div>
                <button onClick={handleGiveConsent} style={{
                    backgroundColor: "mediumpurple",
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    alignItems: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    marginRight: '10px',

                }}>
                    수락
                </button>
            </div>
        </div>
    );
};

export default CookieConsentBanner;