"use client";

import React, { useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Image from 'next/image.js';
import { useRouter } from 'next/navigation';
import {masktheme} from '../../../category/masktheme/masktheme';
import spacetype from '../../../category/spacetype/spacetype';
import styles from '../../../page.module.css';

export default function Component() {
    const [resultUrl, setResultUrl] = useState('');
    const [selectImage, setSelectImage] = useState('');
    const [prompt, setPrompt] = useState('');
    const [designTheme, setDesignTheme] = useState('');
    const [spaceType, setSpaceType] = useState('');
    const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    const fetching = async () => {
        try {
            const response = await fetch('https://relife-sigma.vercel.app/api/result?type=single');

            if (response.ok) {
                const result = await response.json();

                if (result.process === 'success') {
                    setResultUrl(result.url);

                    const select = localStorage.getItem('selectImage');
                    setSelectImage(select);

                    return true;
                }
            }

            return false;
        }
        catch (error) {
            console.log(error);

            return false;
        }
    }

    const downloadButton = async () => {
        const response = await fetch('https://relife-sigma.vercel.app/api/getImage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: `${resultUrl}`})
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `dream.${response.headers.get('content-type')}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    const setPromptText = (text) => {
        setPrompt(text.target.value);
    }

    const setDesignThemeCode = (Theme) => {
        setDesignTheme(Theme.target.value);
    }

    const setSpaceTypeCode = (Type) => {
        setSpaceType(Type.target.value);
    }

    const handleGenerate = async () => {
      setLoading(true)
        if (designTheme !== '' || spaceType !== '') {
            const data = {
                prompt: prompt,
                designTheme: designTheme,
                spaceType: spaceType,
                type: 'single'
            };

            try {
                const response = await fetch('https://relife-sigma.vercel.app/api/retry', {
                    method: 'POST',
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    setRender(true);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const handleNewGenerate = () => {
        router.push('/image/imageUpload')
    }

    useEffect(() => {
        const id = setInterval(async () => {
            const success = await fetching();
            if (success) {
                clearInterval(id);
                setRender(false);
                setLoading(false)
            }
        }, 5000);

        return () => {
            clearInterval(id);
        };
    }, [render]);
    if(!loading) {
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
            <div className={styles.main}>
                <div className={styles.startUpper}>
                    <span className={styles.startLogo}>당신의 상상</span>
                </div>
                <div className={styles.resultCenter}>
                    <div className={styles.resultImageContainer}>
                        <div className={styles.resultItem}>
                            <ReactCompareSlider
                                itemOne={<ReactCompareSliderImage src={selectImage} alt='Image One' />}
                                itemTwo={<ReactCompareSliderImage src={resultUrl} alt='Image Two' />}
                            />
                        </div>
                        <div className={styles.resultItem}>
                            <button className={styles.generateButton} onClick={downloadButton}>이미지 다운로드</button>
                        </div>
                    </div>
                    <div className={styles.box6}>
                        <div className={styles.promptBox}>
                            <input type='text' placeholder='추가 요구사항을 작성하세요.' className={styles.input} value={prompt} onChange={setPromptText} />
                        </div>
                        <div className={styles.selectBox}>
                            <div className={styles.itemContainer}>
                                <div className={styles.item}>
                                    <label htmlFor='DesignTheme'>디자인 테마 선택</label>
                                </div>
                                <div className={styles.item}>
                                    <select id='DesignTheme' onChange={setDesignThemeCode} value={designTheme} className={styles.select}>
                                        <option value='' disabled hidden>디자인 테마</option>
                                        {masktheme.map((item) => (
                                            <option value={item.value} key={item.value}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.itemContainer}>
                                <div className={styles.item}>
                                    <label htmlFor='SpaceType'>공간 유형 선택</label>
                                </div>
                                <div className={styles.item}>
                                    <select id='SpaceType' onChange={setSpaceTypeCode} value={spaceType} className={styles.select}>
                                        <option value='' disabled hidden>공간 유형</option>
                                        {spacetype.map((item) => (
                                            <option value={item.value} key={item.value}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.itemContainer2}>
                            <button className={styles.generateButton} onClick={handleGenerate}>다시 만들기</button>
                        </div>
                        <div className={styles.itemContainer2}>
                            <button className={styles.generateButton} onClick={handleNewGenerate}>새로 만들기</button>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
}
