"use client";
// 웹사이트의 최초 진입점 입니다 이 페이지가 가장 먼저 보여지는 페이지 이므로 여기서부터 개발하시면 됩니다.

import Link from "next/link";
import styles from "./page.module.css";
import CookieConsentBanner from './cookies/permit_banner/banner.client';


// 아이콘 컴포넌트
function LightbulbIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

// Button 컴포넌트
const Button = ({ href, className, children }) => {
  return (
    <Link href={href} className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}>
      {children}
    </Link>
  );
};

const Logo = {
  fontWeight: 'bold',
  marginLeft: '10px',
  fontSize: '20px',
}

const mainLogo = {
  fontWeight: 'bold',
  fontSize: '50px',
  marginBottom : '60px',
}

export default function CombinedComponent() {
  const backgroundImage = "/1.gif"; // public 폴더의 이미지 경로

  return (
    <div className={`${styles.main}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <CookieConsentBanner />
      <div className = {`${styles.mainUpper}`}>
        <div className={`${styles.box}`}>
        <LightbulbIcon/>
        <span style = {Logo}>INTERIOR SIMULATOR</span>
        </div>
        <div className={`${styles.box2}`}/>
        <nav className={`${styles.box}`}>
          <Link href="/about" className={`${styles.tab}`}>about</Link>
          <Link href="/resource" className={`${styles.tab}`}>resource</Link>
          <Link href="/inquire" className={`${styles.tab}`}>inquiry</Link>
          <Link href="/style" className={`${styles.tab}`}>style find</Link>
          <Button href="/explain" className={`${styles.tab}`}>Start</Button> 
        </nav>
      </div>
      <div className = {`${styles.mainCenter}`}>
        <span style={mainLogo}>인테리어 프로그램 이용</span>
      </div>
    </div>
  );
}
