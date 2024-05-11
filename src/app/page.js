"use client";
// 웹사이트의 최초 진입점 입니다 이 페이지가 가장 먼저 보여지는 페이지 이므로 여기서부터 개발하시면 됩니다.

import Link from "next/link";
import styles from "./page.module.css";

//아이콘 컴포넌트
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
    <Link href={href}>
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {children}
    </Link>
  );
};

export default function CombinedComponent() {
  const backgroundImage = "/1.gif"; // public 폴더의 이미지 경로

  return (
    <div
      className={`${styles.main} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.minHScreen}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header
        className={`${styles.absolute} ${styles.top0} ${styles.right0} ${styles.flex} ${styles.justifyBetween} ${styles.p5}`}
      >
        <div className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX4}`}>
          <LightbulbIcon className={`${styles.textWhite} ${styles.h6} ${styles.w6}`} />
          <span className={`${styles.text2xl} ${styles.fontBold} ${styles.textWhite}`}>INTERIOR SIMULATOR</span>
        </div>
        <nav className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX4}`}>
          <Link href="/about" className={`${styles.textWhite} ${styles.hoverTextGray300}`}>about</Link>
          <Link href="/resource" className={`${styles.textWhite} ${styles.hoverTextGray300}`}>resource</Link>
          <Link href="/inquire" className={`${styles.textWhite} ${styles.hoverTextGray300}`}>inquiry</Link>
          <Button href="/explain" className="">Start</Button>
        </nav>
      </header>
      <h1 className={`${styles.text6xl} ${styles.fontExtrabold} ${styles.textWhite} ${styles.trackingTight} ${styles.textCenter} ${styles.mb16}`}>
        인테리어 프로그램 이용
      </h1>
    </div>
  );
}
