"use client"; // 클라이언트 사이드 렌더링을 활성화
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { masktheme, themeRanges } from "../../../category/masktheme/masktheme"; 
import styles from '../../../page.module.css'; // CSS 모듈 import

export default function QuizResultPage() {
  const [styleData, setStyleData] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const quizResult = JSON.parse(localStorage.getItem("quizResult") || "[]");
    setQuizResult(quizResult); // quizResult 상태를 설정
    if (quizResult.length > 0) {
      const firstResult = quizResult[0];
      fetchStyleData(firstResult);
    }
  }, []);

 
  // fetchStyleData 함수는 퀴즈 결과에 따라 스타일 데이터를 설정
const fetchStyleData = async (result) => {
  // result("테마이름":"설명") 객체에서 첫 번째 키(테마 이름)를 가져옴
  const styleName = Object.keys(result)[0];
  // result 객체에서 해당 스타일의 설명을 가져옴
  const description = result[styleName];

  //이름과 이미지 넣을 변수 생성
  const themeRange = themeRanges[styleName];
  const images = [];

  // themeRange 범위 내의 모든 이미지 번호를 순회하며 이미지 경로를 추가합니다.
  for (let i = themeRange[0]; i <= themeRange[1]; i++) {
    images.push(`/style/${i}.jpg`);
  }

  // name, description, image 경로를 포함한 스타일 데이터를 설정함
  const data = {
    name: styleName,           // 스타일 이름
    description: description,  // 스타일 설명
    images: images,            // 테마에 맞는 모든 이미지 경로를 설정
  };

  // styleData 상태를 설정하여 화면에 표시될 데이터 업데이트
  setStyleData(data);
};

  if (!styleData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 왼쪽 박스 - 텍스트와 버튼 */}
      <div className={styles.leftBox}>
        <p className="bold-32 p-3 lg:mb-20 mb-15 text-blue-100">
          {styleData.name} Style
        </p>
        {quizResult && (
          <div className="mt-4">
            <h3>Quiz Result:</h3>
            <pre>{JSON.stringify(quizResult, null, 2)}</pre>
          </div>
        )}
        <p className="text-gray-50 lg:mb-20 mb-15">
          {styleData.description}
        </p>
        <div className={styles.buttonGroup}>
          <button className="btn-yellow">
            <Link href="/style">스타일 다시 찾아보기</Link>
          </button>
          <button className="btn-yellow">
            <Link href="/image/imageUpload">찾은 테마로 방꾸미기</Link>
          </button>
        </div>
      </div>

      {/* 오른쪽 박스 - 이미지 */}
      <div className={styles.rightBox}>
        {(styleData.images || []).map((image, index) => (
          <div key={index} className="m-2">
            <Image
              src={image}
              alt={`${styleData.name} Style ${index + 1}`}
              width={250}
              height={250}
              className="rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}