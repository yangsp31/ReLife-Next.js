"use client";

import { useState, useEffect } from 'react';

// 이미지 처리와 다운로드 기능을 제공하는 컴포넌트
export default function Component() {
  // 업로드된 이미지와 결과 이미지를 저장하기 위한 상태, 초기값은 null
  const [uploadedImage, setUploadedImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  // 컴포넌트 마운트 시 Local Storage에서 이미지 URL을 로드
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const uploadedImg = urlParams.get('uploadedImage');
    const resultImg = urlParams.get('resultUrl');
    console.log("Uploaded Image URL:", uploadedImg);
    console.log("Result Image URL:", resultImg);  
    if (uploadedImg) {
      setUploadedImage(uploadedImg);
    }
    if (resultImg) {
      setResultUrl(resultImg);
    }
  }, []);
  
  // 업로드된 이미지를 다운로드하는 함수
  const handleDownload = (url, fileName = 'downloaded_image.png') => {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // 재생성 버튼의 이벤트 핸들러 (여기서는 예시로만 작성되었습니다)
  const handleRegenerate = () => {
    // 재생성 로직을 여기에 구현하거나 필요한 API를 호출
    console.log("Regenerate the image based on the current settings.");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 to-blue-200">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[600px] gap-8 px-8 md:px-12 xl:gap-12">
        <div className="flex items-center justify-center">
          {uploadedImage && (
            <img
              alt="Uploaded Image"
              src={uploadedImage}
              style={{ width: "480px", height: "270px" }}
            />
          )}
          {resultUrl && (
            <img
              alt="Processed Image"
              src={resultUrl}
              style={{ width: "480px", height: "270px" }}
            />
          )}
        </div>
        <div className="flex flex-col justify-center items-start space-y-4">
          {resultUrl && (
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md"
              onClick={() => handleDownload(resultUrl, 'relife_image.png')}
            >
              Download Result Image
            </button>
          )}
          <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md"
              onClick={handleRegenerate}
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
