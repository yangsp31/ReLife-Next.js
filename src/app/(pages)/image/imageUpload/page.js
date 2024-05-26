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
      const formData = new FormData()
      formData.append('file', selectImage);
      formData.append('prompt',prompt);
      formData.append('designTheme', designTheme);
      formData.append('spaceType', spaceType);

      try {
        const response = await fetch('http://localhost:3000/api/single', {
          method : 'POST',
          body : formData
        })

        if(response.ok) {
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

  return (
    <div className={`${styles.main}`}>
      <div className = {`${styles.startUpper}`}>
        <span className = {`${styles.startLogo}`}>Set Picture. Space Type. Theme. Prompt</span>
      </div>
      <div className={`${styles.startImageCenter}`}>
        <div className={`${styles.box5}`}>
          <div className={`${styles.imageContainer}`}>
            {showUrl && <Image src={showUrl} alt="Selected" width = {400} height = {400} style={{ objectFit: 'cover' }} />}
          </div>
          <div className={`${styles.inputBox}`}>
            <input type = 'file' accept = 'image/*' onChange = {setHandleImageChange} ref = {fileInputRef}/>
          </div>
        </div>
        <div className={`${styles.box6}`}>
          <div className={`${styles.promptBox}`}>
            <input type = 'text' placeholder = 'Enter any additional comments' className={`${styles.input}`} value = {prompt} onChange = {setPromptText}/>
          </div>
          <div className={`${styles.selectBox}`}>
            <div className={`${styles.itemContainer}`}>
              <div className={`${styles.item}`}>
                <label htmlFor = 'DesignTheme'>Select DesignTheme</label>
              </div>
              <div className={`${styles.item}`}>
                <select id = 'DesignTheme' onChange = {setDesignThemeCode} value = {designTheme} className={`${styles.select}`}>
                  <option value = '' disabled hidden>Design Theme</option>
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
                <label htmlFor = 'SpaceType'>Select SpaceType</label>
              </div>
              <div className={`${styles.item}`}>
                <select id = 'SpaceType' onChange = {setSpaceTypeCode} value = {spaceType} className={`${styles.select}`}>
                  <option value = '' disabled hidden>Space Type</option>
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
          <button className={`${styles.generateButton}`} onClick = {handleGenerate}>generate</button>
          </div>
        </div>
      </div>
    </div>
  );
}