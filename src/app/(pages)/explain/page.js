"use client";//서버 컴포넌트에서 지원하지 않는 기능(useState, useEffect와 같은 리액트 훅(Hook), 브라우저 API 접근 등)을 가능하게 함, 상호작용적인 UI를 위한 이벤트 핸들러

import Link from "next/link";
import styles from "../../page.module.css";

const Button = ({ href, className, children }) => {
  return (
    <Link href={href}>
      {children}
    </Link>
  );
};

//메인페이지 이후 프로그램에 대한 설명이 적혀있는 코드
export default function Component() {
  return (
    <div className={`${styles.main}`} style={{ backgroundImage: `url(../../1.gif)`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className = {`${styles.startUpper}`}>
        <span className = {`${styles.startLogo}`}>Fast. Secure. Scalable.</span>
      </div>
      <div className = {`${styles.startCenter}`}>
        <h1 className={`${styles.box3}`}>Steps to realize your dreams</h1>
        <h2 className={`${styles.box3}`}>1. Decide if you want to view in 360 or as a single image</h2>
        <h2 className={`${styles.box3}`}>2. Prepare a photo of the room you&apos;re trying to transform</h2>
        <h2 className={`${styles.box3}`}>3. Receive your dreams</h2>
        <div className={`${styles.box4}`}>
        <Button href="/image/imageUpload">
        go single
      </Button>
      <Button href="/image/panoramaUpload">
        go panorama
      </Button>
        </div>
      </div>
    </div>
  );
}