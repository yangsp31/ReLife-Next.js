import { Inter } from "next/font/google";
import './globals.css' //전체 프로젝트에 적용될 공통적인 CSS를 적용하는 방식 입니다. 이 한줄만 추가한다면 적용가능합니다. 필요에 따라 삭제가능 합니다.

// 프로젝트의 전체 레이아웃과 브라우저의 탭 부분 디자인 설정 입니다. 개발시 필요와 목적에 따라 수정해서 사용하시면 됩니다.
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Re Life",
  description: "Browser Tab Title",
};

// 이 함수가 없다면 페이지 출력 시도시 에러 발생 됩니다.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
