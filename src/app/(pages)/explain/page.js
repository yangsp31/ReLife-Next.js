"use client";//서버 컴포넌트에서 지원하지 않는 기능(useState, useEffect와 같은 리액트 훅(Hook), 브라우저 API 접근 등)을 가능하게 함, 상호작용적인 UI를 위한 이벤트 핸들러

import Link from "next/link";
import styles from "../../page.module.css";

const Button = ({ href, className, children }) => {
  return (
    <Link href={href} className={styles.tab2}>
      {children}
    </Link>
  );
};

//메인페이지 이후 프로그램에 대한 설명이 적혀있는 코드
export default function Component() {
  return (
    <div className={`${styles.main}`} style={{ backgroundImage: `url(../../1.png)`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className = {`${styles.startUpper}`}>
        <span className = {`${styles.startLogo}`}>지금의 공간을 상상도 못한 특별한 장소로 바꿔보세요.</span>
      </div>
      <div className = {`${styles.startCenter}`}>
        <h1 className={`${styles.box3}`}>이미지 생성을 위한 단계</h1>
        <h2 className={`${styles.box3}`}>1. 360도로 볼지 단일 이미지로 볼지 결정합니다.</h2>
        <h2 className={`${styles.box3}`}>2. 바꾸고자 하는 방의 사진을 준비하세요.</h2>
        <h2 className={`${styles.box3}`}>3. 당신만의 특별한 장소를 확인해보세요</h2>
        <div className={`${styles.box4}`}>
        <a className={styles.btn} href="/image/imageUpload">
        단일 이미지로 보기
      </a>
      <a className={styles.btn} href="/image/panoramaUpload">
        360˚로 보기
      </a>
        </div>
      </div>
    </div>
  );
}