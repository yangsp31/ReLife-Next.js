"use client";

import { useState, useRef } from 'react';

// 이미지 처리와 다운로드 기능을 제공하는 컴포넌트
export default function Component() {
  // 업로드된 이미지를 저장하기 위한 상태, 초기값은 null
  const [uploadedImage, setUploadedImage] = useState(null);
  
  // 파일 입력 요소에 대한 참조 생성
  const fileInputRef = useRef(null);

  // 파일 선택 시 이미지 파일을 읽고 상태에 저장하는 함수
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // 사용자가 선택한 파일 가져옴
    if (file) {
      const reader = new FileReader(); // FileReader 인스턴스 생성
      reader.onloadend = () => {
        // 파일 읽기 완료 후, 결과(데이터 URL)를 uploadedImage 상태에 저장
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  // 업로드된 이미지를 다운로드하는 함수
  const handleDownload = () => {
    if (uploadedImage) {
      // 다운로드 링크 생성 및 설정
      const downloadLink = document.createElement('a');
      downloadLink.href = uploadedImage; // 링크 주소 설정
      downloadLink.download = 'image.png'; // 다운로드 파일 이름 설정
      downloadLink.click(); 
    }
  };

  // 컴포넌트의 JSX 마크업 반환
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 to-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[600px] gap-8 px-8 md:px-12 xl:gap-12">
        <div className="flex items-center justify-center">
          <label htmlFor="upload-image" className="cursor-pointer">
            {/* 이미지 업로드 영역 */}
            <img
              alt="Uploaded Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
              src={uploadedImage || '/placeholder.svg'} // 업로드된 이미지 또는 플레이스홀더 표시
              style={{ width: "480px", height: "270px" }}
            />
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="sr-only"
            />
          </label>
        </div>
        <div className="flex flex-col justify-center items-start space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleDownload}>
            Download
          </button>
          {/* 가정: handleRegenerate 함수가 존재하고 올바르게 작동하며, 이 버튼을 누르면 새로운 이미지가 생성됨 */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleDownload /* 실제로는 handleRegenerate 함수로 변경 필요 */}>
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
