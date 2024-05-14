"use client";

// 이미지 박스를 클릭하면 이미지를 업로드하고, 버튼을 클릭하면 example 주소로 가는 코드
import { useState } from 'react';
import { Label } from "../../../components/components.mjs";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../../../components/components.mjs";
import Link from 'next/link';
import masktheme from "../../../category/masktheme/masktheme"; 
import masktheme2 from "../../../category/masktheme/masktheme_ko"; 
import spaceType from "../../../category/spacetype/spacetype"; 
import spacetype2 from "../../../category/spacetype/spacetype_ko"; 
import { uploadSingleImage } from "../../../api/single/singleUpload";

export default function Component() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [designTheme, setDesignTheme] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [resultUrl, setResultUrl] = useState(''); 



// 이미지 파일을 처리하고 상태를 업데이트
const handleImageChange = (event) => {
  //사용자가 선택한 파일 가져옴
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
 // selectedImage: 이미지가 저장되는 변수, 이미지 데이터의 URL 형식, Base64 인코딩된 문자열(string), 초기값은 null
     setSelectedImage(file);
     reader.onerror = () => alert('Error reading file'); //사용자가 비정상적인 파일을 업로드 했을 때 에러를 핸들링
    };
    //파일 데이터를 url로 읽음
    reader.readAsDataURL(file);
  }
};


  //DesignTheme값 바꾸기
  const handleDesignThemeChange = (event) => {
    const koreanTheme = event.target.value;
    setDesignTheme(masktheme[masktheme2[koreanTheme]]); //한국어->영어->코드값
  };
  //SpaceType값 바꾸기
  const handleSpaceTypeChange = (event) => {
    const koreanType = event.target.value;
    setSpaceType(spaceType[spacetype2[koreanType]]);
  };
  

  //UI 구조 설계
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto py-12 md:py-16 bg-gradient-to-r from-[#e0b0ff] to-[#add8e6]">
      <div className="flex items-center justify-center">
                {/* 이미지 업로드 영역 */}
        <label htmlFor="upload-image" className="cursor-pointer">
          <img
            alt="Placeholder"
            className="rounded-xl"
            height="500"
                        // 업로드된 이미지 표시
            src={selectedImage ? URL.createObjectURL(selectedImage) : '/placeholder.svg'}
            style={{
              aspectRatio: "500/500",
              objectFit: "cover",
            }}
            width="500"
          />
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="flex flex-col items-start justify-center space-y-6">
        <div className="w-full max-w-md">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="category">
            Select Category
          </Label>
          <Select className="w-full" id="category">
            <SelectTrigger>
              {/* SelectValue: 선택된 값을 보여줌 */}
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            {/*드롭다운 메뉴의 항목을 포함*/}
            <SelectContent>
              <SelectItem value="illustration">Illustration</SelectItem>
              <SelectItem value="logo">Logo</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="mobile-app">Mobile App</SelectItem>
              <SelectItem value="print">Print</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-md">
        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="space-type">
            Select Space Type
          </Label>
          <select onChange={handleSpaceTypeChange} defaultValue="">
            <option value="" disabled>Select space Type</option> {/* 기본 선택 옵션 */}
            {Object.entries(spacetype2).map(([korean, english]) => (
              <option key={english} value={korean}>{korean}</option>
            ))}
          </select>
        </div>
        <div className="w-full max-w-md">
        <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="design-theme-select">
            Select Design Theme
          </Label>
          <select onChange={handleDesignThemeChange} defaultValue="">
            <option value="" disabled>Select DesignTheme</option> 
            {Object.entries(masktheme2).map(([korean, english]) => (
              <option key={english} value={korean}>{korean}</option>
            ))}
          </select>
        </div>
        <div className="w-full max-w-md">
          <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="color-preference">
            Select Color Preference
          </Label>
          <Select className="w-full" id="color-preference">
            <SelectTrigger>
              <SelectValue placeholder="Select Color Preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="vibrant">Vibrant</SelectItem>
              <SelectItem value="pastel">Pastel</SelectItem>
            </SelectContent>
          </Select>
        </div>
       
        <div className="flex flex-col items-start justify-center space-y-6">
        <Link href="/image/showSingleImage" passHref>
          <button onClick={handleImageChange} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
            디자인 생성
          </button>
        </Link>
        {resultUrl && (
          <div>
            {/* 선택적으로 이미지 또는 이미지 링크 표시 */}
            <img src={resultUrl} alt="Result" />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

