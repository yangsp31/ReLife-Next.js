"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../../page.module.css"
import Image from 'next/image.js';
import { masktheme, themeRanges } from '../../../category/masktheme/masktheme'; // 정확한 경로 확인
import spacetype from '../../../category/spacetype/spacetype'

export default function Component() {
  const validType = ['image/jpeg', 'image/png']
  const fileInputRef = useRef(null)
  const [selectImage, setSelectImage] = useState(null);
  const [showUrl, setShowUrl] = useState('');
  const [prompt, setprompt] = useState('');
  const [designTheme, setDesignTheme] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setHandleImageChange = (image) => {
    const file = image.target.files[0]

    if(file && validType.includes(file.type)) {
      setSelectImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setShowUrl(reader.result);
        localStorage.setItem('selectImage', reader.result)
      }

      reader.readAsDataURL(file)
    }
    else {
      setShowUrl('')
      setSelectImage(null)

      if(fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      alert('이미지 파일은 JPG 또는 PNG 만 가능합니다.');
    }
  }

  const handleGenerate = async () => {
    if(!selectImage || designTheme != '' || spaceType != '') {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', selectImage);
      formData.append('prompt',prompt);
      formData.append('designTheme', designTheme);
      formData.append('spaceType', spaceType);

      try {
        const response = await fetch('https://relife-xi.vercel.app/api/single', {
          method : 'POST',
          body : formData
        })

        if(response.ok) {
          setLoading(false)
          router.push('/image/showSingleImage')
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
  }

  const setPromptText = (text) => {
    setprompt(text.target.value)
  }

  const setDesignThemeCode = (Theme) => {
    setDesignTheme(Theme.target.value)
  }

  const setSpaceTypeCode = (Type) => {
    setSpaceType(Type.target.value)
  }

  if(loading) {
    return (
      <div className={styles.fullscreenCenter} style={{ backgroundImage: 'url(../../../1.png)', backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="text-center" style={{ color: 'white' }}> {/* 텍스트를 중앙에 정렬 */}
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
    )
  }
  else {
    return (
      <div className={`${styles.main}`} style={{ backgroundImage: 'url(../../../1.png)', backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className = {`${styles.startUpper}`}>
          <span className = {`${styles.startLogo}`}>한장으로 보기</span>
        </div>
        <div className={`${styles.startImageCenter}`}>
          <div className={`${styles.box5}`}>
          <p className={styles['regular-18']}> 
                이미지를 넣어주세요.
            </p>
            <div className={`${styles.imageContainer}`}>
              {showUrl && <Image src={showUrl} alt="Selected" width = {400} height = {400} style={{ objectFit: 'cover' }} />}
            </div>
            <div className={`${styles.inputBox}`}>
              <input type = 'file' accept = 'image/*' onChange = {setHandleImageChange} ref = {fileInputRef}/>
            </div>
          </div>
          <div className={`${styles.box6}`}>
            <div className={`${styles.promptBox}`}>
              {/*placeholder:임시 텍스트나 개체*/}
              <input type = 'text' placeholder = '추가 요구사항을 작성하세요.' className={`${styles.input}`} value = {prompt} onChange = {setPromptText}/>
            </div>
            <div className={`${styles.selectBox}`}>
              <div className={`${styles.itemContainer}`}>
                <div className={`${styles.item}`}>
                  <label htmlFor = 'DesignTheme'>디자인 테마 선택</label>
                </div>
                <div className={`${styles.item}`}>
                  <select id = 'DesignTheme' onChange = {setDesignThemeCode} value = {designTheme} className={`${styles.select}`}>
                    <option value = '' disabled hidden>디자인 테마</option>
                    {masktheme.map((item) => (
                      <option value = {item.value} key = {item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={`${styles.itemContainer}`}>
                <div className={`${styles.item}`}>
                  <label htmlFor = 'SpaceType'>공간 유형 선택</label>
                </div>
                <div className={`${styles.item}`}>
                  <select id = 'SpaceType' onChange = {setSpaceTypeCode} value = {spaceType} className={`${styles.select}`}>
                    <option value = '' disabled hidden>공간 유형</option>
                    {spacetype.map((item) => (
                      <option value = {item.value} key = {item.value}>
                        {item.name}
                      </option>
                    ))}
                 </select>
                </div>
              </div>
            </div>
            <div className={`${styles.itemContainer2}`}>
            <button className={`${styles.generateButton}`} onClick = {handleGenerate}>이미지 만들기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}