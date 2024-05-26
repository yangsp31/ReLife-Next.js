"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../../page.module.css"
import Image from 'next/image.js';
import masktheme from '../../../category/masktheme/masktheme'
import spacetype from '../../../category/spacetype/spacetype'

export default function Component() {
  const validType = ['image/jpeg', 'image/png']
  const fileInputRef = useRef(null)
  const [selectImage, setSelectImage] = useState([]);
  const [showUrl, setShowUrl] = useState([]);
  const [prompt, setprompt] = useState('');
  const [designTheme, setDesignTheme] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [showCancel, setShowCancel] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const setHandleImageChange = async (image) => {
    const files = image.target.files
    const selectImages = [...selectImage]
    const urls = [...showUrl]

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    for (const file of files) {
        if (file && validType.includes(file.type)) {
            selectImages.push(file);
            try {
                const result = await readFile(file);
                urls.push(result);
            } catch (error) {
                console.error('Error reading file', error);
            }
        } else {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            alert('이미지 파일은 JPG 또는 PNG 만 가능합니다.');
        }
    }

    setShowUrl(urls);
    setSelectImage(selectImages)
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
        const response = await fetch('http://localhost:3000/api/panorama', {
          method : 'POST',
          body : formData
        })

        if(response.ok) {
          setLoading(false)
          router.push('/image/showPanoramaImage')
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
  }

  const removeImage = (index) => {
    const updatedSelectImages = [...selectImage];
    const updatedUrls = [...showUrl];

    updatedSelectImages.splice(index, 1);
    updatedUrls.splice(index, 1);

    setSelectImage(updatedSelectImages);
    setShowUrl(updatedUrls);
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
    <div className={`${styles.main}`} style={{ backgroundImage: 'url(../../../1.gif)', backgroundSize: "cover", backgroundPosition: "center" }}>
      {loading && (
        <div className={`${styles.overlay}`}>
          <div className={`${styles.loader}`}/>
        </div>
      )}
      <div className = {`${styles.startUpper}`}>
        <span className = {`${styles.startLogo}`}>Set Picture. Space Type. Theme. Prompt</span>
      </div>
      <div className={`${styles.startImageCenter}`}>
        <div className={`${styles.box5}`}>
          <div className={`${styles.imageContainer}`}>
            {showUrl && showUrl.map((image, index) => (
                <div key = {index} className={`${styles.panoramaImage}`} onMouseEnter={() => setShowCancel(index)} onMouseLeave={() => setShowCancel(null)} style={{ position: 'relative' }}>
                    <Image src = {image} alt = {`Image ${index}`} width = {200} height = {200}/>
                    {showCancel === index && (
                        <button onClick={() => removeImage(index)} className={styles.generateButton} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            취소
                        </button>
                    )}
                </div>
            ))}
          </div>
          <div className={`${styles.inputBox}`}>
            <input type = 'file' accept = 'image/*' onChange = {setHandleImageChange} ref = {fileInputRef} multiple/>
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