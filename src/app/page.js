"use client";
// 웹사이트의 최초 진입점 입니다 이 페이지가 가장 먼저 보여지는 페이지 이므로 여기서부터 개발하시면 됩니다.

import Link from "next/link";
import styles from "./page.module.css";
import CookieConsentBanner from './cookies/permit_banner/banner.client';


const mainLogo = {
  fontWeight: 'bold',
  fontSize: '50px',
  marginBottom : '60px',
}

export default function CombinedComponent() {
  const backgroundImage = "/1.png"; // public 폴더의 이미지 경로

  return (
    <div className={`${styles.main}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <CookieConsentBanner />
      <div className = {`${styles.mainCenter}`}>
        <span style={mainLogo}>당신의 방을 새롭게 만들어보세요.</span>
      </div>
    </div>
  );
}
