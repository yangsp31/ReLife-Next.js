"use client";

// 웹사이트의 최초 진입점 입니다 이 페이지가 가장 먼저 보여지는 페이지 이므로 여기서부터 개발하시면 됩니다.
import Link from "next/link";
import { Button } from "@/components/ui/button";
import backgroundImage from "./1.gif";
import styles from "./page.module.css";

export default function CombinedComponent() {
  return (
    <div className={`${styles.main} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.minHScreen}`} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className={`${styles.absolute} ${styles.top0} ${styles.left0} ${styles.right0} ${styles.flex} ${styles.justifyBetween} ${styles.p5}`}>
        <div className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX4}`}>
          <LightbulbIcon className={`${styles.textWhite} ${styles.h6} ${styles.w6}`} />
          <span className={`${styles.text2xl} ${styles.fontBold} ${styles.textWhite}`}>INTERIOR SIMULATOR</span>
        </div>
        <nav className={`${styles.flex} ${styles.itemsCenter} ${styles.spaceX4}`}>
          <Link href="#" className={`${styles.textWhite} ${styles.hoverTextGray300}`}>about</Link>
          <Link href="#" className={`${styles.textWhite} ${styles.hoverTextGray300}`}>resource</Link>
          <Link href="#" className={`${styles.textWhite} ${styles.hoverTextGray300}`}>inquiry</Link>
          <Button className={`${styles.bgBlue500} ${styles.hoverBgBlue600} ${styles.textWhite} ${styles.fontSemibold} ${styles.py2} ${styles.px4} ${styles.roundedMd} ${styles.shadowLg}`}>
            Start
          </Button>
        </nav>
      </header>
      <h1 className={`${styles.text6xl} ${styles.fontExtrabold} ${styles.textWhite} ${styles.trackingTight} ${styles.textCenter} ${styles.mb16}`}>인테리어 프로그램 이용</h1>
    </div>
  );
}

function LightbulbIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}