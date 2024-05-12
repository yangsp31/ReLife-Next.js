"use client";

//좌측 상단에는 기존의 이미지를, 나머지 3칸에는 생성된 이미지를 제공하는 코드 다운로드를 누르면 다운로드를, 리제너레이트를 누르면 이미지중 한장을 선택하여 기존의 페이지로 돌아가도록
import { useState, useRef } from 'react';

export default function Component() {
  // uploadedImage 상태를 null로 초기화&업데이트
  const [uploadedImage, setUploadedImage] = useState(null);
  //파일 입력 요소에 대한 참조를 생성합
  const fileInputRef = useRef(null);

  // 이미지 파일을 업로드하고 로컬 상태에 저장하는 함수
  const handleImageUpload = (event) => {
    //선택된 파일 가져옴
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 파일 읽기가 완료되면 결과를 uploadedImage 상태에 저장
        setUploadedImage(reader.result);
      };
      //파일을 Data URL 형식으로 읽음
      reader.readAsDataURL(file);
    }
  };

  //업로드된 이미지 다운로드하는 함수
  const handleDownload = () => {
    if (uploadedImage) {
      const downloadLink = document.createElement('a');
      downloadLink.href = uploadedImage;
      downloadLink.download = 'image.png';
      downloadLink.click();
    }
  };

  // 컴포넌트의 JSX 마크업 반환
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 to-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[600px] gap-8 px-8 md:px-12 xl:gap-12">
        <div className="flex items-center justify-center">
          <label htmlFor="upload-image" className="cursor-pointer">
            <img
              alt="Uploaded Image"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
              src={uploadedImage || '/placeholder.svg'}
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
          { /* handlerRegenerate 함수가 존재하고 제대로 작동한다고 가정,이 부분을 누르면 새로운 디자인 생성 */ }          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleDownload /* Change to handleRegenerate */}>
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
