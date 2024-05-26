import { Inter } from "next/font/google";
import TopBar from "./components/topBar";
import "./globals.css"; // 전역 스타일 파일 가져오기

// 전체 프로젝트에 적용될 공통적인 CSS를 적용하는 방식 입니다. 이 한줄만 추가한다면 적용가능함 필요에 따라 삭제가능 함

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Re Life",
  description: "Browser Tab Title",
};

// 이 함수가 없다면 페이지 출력 시도시 에러 발생 됩니다.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Re Life</title>
      </head>
      <body className={inter.className}>
        <TopBar /> {/* TopBar를 여기서 추가 */}
        {children}
      </body>
    </html>
  );
}
