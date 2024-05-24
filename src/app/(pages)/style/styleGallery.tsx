import React, { useState } from "react"; // React와 useState 훅을 가져옴
import { FaCheckCircle } from "react-icons/fa"; // React Icons 라이브러리에서 FaCheckCircle 아이콘을 가져옴

// StyleGallery 컴포넌트가 받을 props 타입을 정의 
interface StyleGalleryProps {
  _id: string; // 스타일 갤러리 항목의 고유 ID
  name: string; // 스타일 갤러리 항목의 이름
  image: string; // 스타일 갤러리 항목의 이미지 URL
  innerRef?: (node?: Element | null | undefined) => void; // 참조를 설정하는 함수 (선택 사항)
  onClick?: (name: string) => void; // 클릭 시 호출되는 함수 (선택 사항)
  index: number; // 스타일 갤러리 항목의 인덱스
}

// StyleGallery 컴포넌트를 정의 
const StyleGallery: React.FC<StyleGalleryProps> = ({
  _id,
  name,
  image,
  index,
  innerRef,
  onClick,
}) => {
  const [selected, setSelected] = useState(false); // 선택 여부를 추적하는 상태 변수

  // 클릭 이벤트 핸들러 함수
  const handleClick = () => {
    if (onClick) {
      //prevSelected: selected의 이전 상태 값
      setSelected((prevSelected) => !prevSelected); // 선택 상태를 토글 
      onClick(_id); // 클릭 시 부모 컴포넌트로부터 받은 onClick 함수를 호출 
    }
  };

  return (
    <React.Fragment>
      <div className="" ref={innerRef} onClick={handleClick}>
        <div
          style={{
            position: "relative",
            height: index % 2 ? "200px" : "250px", // 인덱스가 홀수이면 200px, 짝수이면 250px 높이를 설정 
            margin: "2px",
          }}
        >
          <img
            src={image}
            alt="image options" // 이미지 설명 텍스트
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // 이미지가 컨테이너에 맞게 조정됩니다.
            }}
          />
          {selected && ( // 선택된 상태일 때만 체크 아이콘 버튼을 렌더링 
            <button className="absolute top-0 right-2 border-none rounded-full p-2 cursor-pointer">
              <FaCheckCircle color="#304561" size={20} /> {/* 체크 아이콘을 표시  */}
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default StyleGallery; // StyleGallery 컴포넌트를 기본 내보내기로 설정 
