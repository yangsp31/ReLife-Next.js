"use client";

//좌측 상단에는 기존의 이미지를, 나머지 3칸에는 생성된 이미지를 제공하는 코드 다운로드를 누르면 다운로드를, 리제너레이트를 누르면 이미지중 한장을 선택하여 기존의 페이지로 돌아가도록
import { useState, useRef } from 'react';
import { Button } from "../../../components/components.mjs";


export default function Component() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (uploadedImage) {
      const downloadLink = document.createElement('a');
      downloadLink.href = uploadedImage;
      downloadLink.download = 'image.png';
      downloadLink.click();
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 to-blue-200">
      <div className="grid items-start w-full min-h-[600px] gap-8 px-8 md:px-12 xl:gap-12 xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))_300px]">
        <div className="grid items-start gap-4">
          <div className="relative">
            {uploadedImage && (
              <img
                alt="Image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
                src={uploadedImage}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div
              className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-50"
              onClick={() => fileInputRef.current.click()}
            >
              A
            </div>
          </div>
          {/* Placeholder images */}
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
            src="/placeholder.svg"
            width="480"
            height="270"
          />
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
            src="/placeholder.svg"
            width="480"
            height="270"
          />
          <img
            alt="Image"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center border"
            src="/placeholder.svg"
            width="480"
            height="270"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button className="w-full h-12" variant="outline" onClick={handleDownload}>
            Download
          </Button>
          <Button className="w-full h-12" variant="outline" onClick={handleRegenerate}>
            Regenerate
          </Button>
        </div>
      </div>
    </div>
  );
}
