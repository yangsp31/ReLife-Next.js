import Link from 'next/link';
import styles from "../page.module.css";

const Logo = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginLeft: '0.5rem',
  color: 'puple', 
  textDecoration: 'none' // 링크 밑줄 제거

};

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

export default function TopBar() {
  return (
    <div className={styles.mainUpper}>
      <div className={styles.box}>
        <LightbulbIcon />
        <Link href="/">
          <span style={Logo}>INTERIOR SIMULATOR</span>
        </Link>      </div>
      <div className={styles.box2} />
      <nav className={styles.box}>
        <Link href="/about" className={styles.tab}>about</Link>
        <Link href="/resource" className={styles.tab}>resource</Link>
        <Link href="/inquire" className={styles.tab}>inquiry</Link>
        <Link href="/style" className={styles.tab}>style find</Link>
        <Button href="/explain" className={styles.tab}>Start</Button>
      </nav>
    </div>
  );
}
