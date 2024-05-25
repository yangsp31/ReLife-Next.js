"use client"; // 클라이언트 사이드 렌더링을 활성화
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { masktheme, themeRanges } from "../../../category/masktheme/masktheme"; 
import styles from '../../../page.module.css'; // CSS 모듈 import

export default function QuizResultPage() {
  const [styleData, setStyleData] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const quizResult = JSON.parse(localStorage.getItem("quizResult") || "[]");
    setQuizResult(quizResult); // quizResult 상태를 설정
    if (quizResult.length > 0) {
      const firstResult = quizResult[0];
      fetchStyleData(firstResult);
    } else {
      setLoading(false); // quizResult가 없는 경우 로딩을 false로 설정
      alert('이미지를 선택해주세요.');
      window.location.href = "/style";
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
  setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 설정
};

  return (
    <main className={styles.main}> 
      {loading ? ( // loading이 true인 경우 로딩 스피너를 표시
        <div className={styles.fullscreenCenter}>
          <div className="text-center"> {/* 텍스트를 중앙에 정렬 */}
            <p>이미지 로딩 중...</p>
            <div className="relative">
              <Image
                src="/loading.svg" // 로딩 스피너 이미지 소스
                width={200} // 이미지 너비
                height={200} // 이미지 높이
                alt="Loading" // alt 속성 추가 (이미지가 로드되지 않을 때 대신 표시할 텍스트를 지정)
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
    ) : ( 
      <div className={styles.fullContainer}>
        {/* 왼쪽 박스 - 텍스트와 버튼 */}
        <div className={styles.leftBoxResult}>
          <p className={`${styles['regular-40']} mb-4`}> {/*객체 형식으로 접근하여 스타일 접근*/}
            {styleData.name} 스타일
          </p>
          <p className={styles['regular-18']}> 
            {styleData.description}
          </p>
          <div className={styles.buttonGroup}>
            <button className={`${styles['btn']} mt-auto`}>
              <Link href="/style">다시 찾기</Link>
            </button>
            <button className={`${styles['btn']} mt-auto`}>
              <Link href="/image/imageUpload">방 꾸미기</Link>
            </button>
          </div>
        </div>

        {/* 오른쪽 박스 - 이미지 */}
        <div className={styles.rightBoxResult}>
            {(styleData.images || []).map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image
                  src={image}
                  alt={`${styleData.name} Style ${index + 1}`}
                  layout="responsive" // 이미지 비율 유지
                  width={250}
                  height={250}
                  className={styles.image}
                  />
              </div>
            ))}
        </div>
      </div>
    )}
    </main>
  );
}
