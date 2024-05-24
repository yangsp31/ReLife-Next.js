"use client"; // 클라이언트 사이드 렌더링을 활성화 
import StyleGallery from "./styleGallery"; // StyleGallery 컴포넌트를 가져옴
import { useEffect, useState } from "react"; // useEffect와 useState 훅을 가져옴
import Masonry from "react-responsive-masonry"; // 반응형 masonry 레이아웃을 위한 컴포넌트를 가져옴
import { shuffleArray, calculateResult } from "../../style-function/function"; 
import imageList from '../../category/imageList'; // 이미지 목록을 가져옴
import Image from 'next/image'; // next/image :최적화된 이미지 로딩, 자동 크기 조절, 지연 로딩(화면을 스크롤할 때 필요한 이미지만 로드), 최신 웹 표준 지원
import styles from '../../page.module.css'; // CSS 모듈 import

// 이미지 목록을 가져오는 함수
function getImages() {
  return imageList;
}

// Home 컴포넌트를 정의 
export default function Home() {
  const [images, setImages] = useState([]);  // useState : 상태변수(true/false)
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const allImages = getImages();
    const shuffledImages = shuffleArray(allImages);
    setImages(shuffledImages.slice(0, 30)); // 무작위로 30개 이미지 선택
    setLoading(false);
  }, []);

  // 이미지 클릭 이벤트 핸들러
  const handleImageClick = (image) => { // image : 이미지 이름
    if (selectedIds.includes(image.path)) {
      setSelectedIds((prevSelected) => prevSelected.filter((id) => id !== image.path));
    } else {
      setSelectedIds((prevSelected) => [...prevSelected, image.path]);
    }
  };

  // 제출 버튼 클릭 시 호출되는 함수
  const handleSubmit = () => {
    const result = calculateResult(selectedIds, images);
    console.log("Quiz Result: ", result);
    setQuizResult(result);
    localStorage.setItem('quizResult', JSON.stringify(result)); // 로컬 스토리지에 결과 저장
    window.location.href = '/style/result'; // 결과 페이지로 이동
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
      ) : ( // loading이 false인 경우 실제 컨텐츠를 표시
        <div className={styles.fullContainer}>
          <div className={styles.leftBox}>
          <p className={`${styles['regular-40']} mb-4`}> {/*객체 형식으로 접근하여 스타일 접근*/}
              {/* CSS 모듈에서 정의된 클래스 regular-40과 mb-4을 추가하여 요소에 하단 마진을 부여 */}
              당신의 방을 선택하세요.
            </p>
            <p className={styles['regular-18']}> 
              마음에 드는 이미지를 모두 선택한 후 제출하기 버튼을 누르세요.
            </p>
            <button
              className={`${styles['btn']} mt-auto`}
              onClick={handleSubmit}
            >
              제출하기
            </button>
          </div>
          <div className={styles.rightBox}>
            <Masonry columnsCount={3} gutter="3px"> // Masonry 레이아웃을 사용하여 이미지들을 3열로 배치하고 간격을 3px로 설정
              {images.map((image, index) => (
                <StyleGallery
                  _id={image.id.toString()} // 각 이미지의 고유한 ID를 문자열로 변환하여 _id 속성에 전달
                  image={image.path} // 이미지 경로
                  name={image.name} // 이미지 이름
                  key={image.id.toString()} // 고유한 이미지 ID를 키로 사용 (React의 리스트 렌더링 최적화를 위해 필요)
                  onClick={() => handleImageClick(image)} // 이미지 클릭 시 handleImageClick 함수를 호출, 이미지 객체를 매개변수로 전달
                />
              ))}
            </Masonry>
          </div>
        </div>
      )}
    </main>
  );
  
}
