"use client";

import React, { useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { useRouter } from 'next/navigation';
import masktheme from '../../../category/masktheme/masktheme'
import spacetype from '../../../category/spacetype/spacetype'
import styles from '../../../page.module.css'
import { Margarine } from 'next/font/google';

// 이미지 처리와 다운로드 기능을 제공하는 컴포넌트
export default function Component() {
  const [resultUrl, setResultUrl] = useState('');
  const [selectImage, setSelectImage] = useState('');
  const [prompt, setprompt] = useState('');
  const [designTheme, setDesignTheme] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [render, setRender] = useState(false);
  const router = useRouter();

  const fetching = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/result?type=single');

      if(response.ok) {
        const result = await response.json();

        if(result.process == 'success') {
          setResultUrl(result.url)

          const select = localStorage.getItem('selectImage');
          setSelectImage(select)

          return true
        }
      }

      return false
    }
    catch (error) {
      console.log(error)

      return false
    }
  }

  const downloadButton = async () => {
    const response = await fetch('http://localhost:3000/api/getImage', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({url : '185528682/short/frf.jpg'})
    })

    console.log(response)

    const imageUrl = URL.createObjectURL(await response.blob())

    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'image'; // 다운로드될 파일의 이름을 설정합니다.

  // 다운로드 링크를 클릭하여 다운로드를 시작합니다.
    downloadLink.click();

  // 다운로드가 완료된 후에는 URL을 해제합니다.
    URL.revokeObjectURL(imageUrl);
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

  const handleGenerate = async () => {
    if(designTheme != '' || spaceType != '') {
      const data = {
        prompt : prompt,
        designTheme : designTheme,
        spaceType : spaceType
      }

      try {
        const response = await fetch('http://localhost:3000/api/retry', {
          method : 'POST',
          body : JSON.stringify(data)
        })

        if(response.ok) {
          setRender(true)
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
  }

  const handleNewGenerate = () => {
    router.back()
  }

  /*useEffect(() => {
    const id = setInterval(async () => {
      const success = await fetching()

      if(success) {
        clearInterval(id)
        setRender(false)
      }
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [render]);*/
  

  return (
    <div className={`${styles.main}`} style={{ backgroundImage: `url(../../1.gif)`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className={`${styles.startUpper}`}>
        <span className = {`${styles.startLogo}`}>Your Dream</span>
      </div>
      <div className={`${styles.resultCenter}`}>
      <div className={`${styles.resultImageContainer}`}>
        <div className={`${styles.resultItem}`}>
        <ReactCompareSlider
            itemOne = {<ReactCompareSliderImage src = 'https://irsstorage.s3.ap-northeast-2.amazonaws.com/185528682/short/444.jpg' alt = 'Image One'/>}
            itemTwo = {<ReactCompareSliderImage src = 'https://irsstorage.s3.ap-northeast-2.amazonaws.com/185528682/short/frf.jpg' alt = 'Image Two'/>}
        />
        </div>
        <div className={`${styles.resultItem}`}>
          <button className={`${styles.generateButton}`} onClick={downloadButton}>Download Image</button>
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
          <button className={`${styles.generateButton}`} onClick = {handleGenerate}>Re.Generate</button>
          </div>
          <div className={`${styles.itemContainer2}`}>
            <button className={`${styles.generateButton}`} onClick = {handleNewGenerate}>New Generate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
