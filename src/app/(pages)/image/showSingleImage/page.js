"use client";

import React, { useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { useRouter } from 'next/navigation';
import masktheme from '../../../category/masktheme/masktheme';
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
            const response = await fetch('http://localhost:3000/api/result?type=single');

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
        const response = await fetch('http://localhost:3000/api/getImage', {
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
                const response = await fetch('http://localhost:3000/api/retry', {
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
        router.back();
    }

    useEffect(() => {
        const id = setInterval(async () => {
            const success = await fetching();

            if (success) {
                clearInterval(id);
                setRender(false);
            }
        }, 5000);

        setLoading(false)

        return () => {
            clearInterval(id);
        };
    }, [render]);

    return (
        <div className={styles.main} style={{ backgroundImage: `url(../../1.gif)`, backgroundSize: "cover", backgroundPosition: "center" }}>
          {loading && (
            <div className={`${styles.overlay}`}>
              <div className={`${styles.loader}`}/>
            </div>
          )}
            <div className={styles.startUpper}>
                <span className={styles.startLogo}>Your Dream</span>
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
                        <button className={styles.generateButton} onClick={downloadButton}>Download Image</button>
                    </div>
                </div>
                <div className={styles.box6}>
                    <div className={styles.promptBox}>
                        <input type='text' placeholder='Enter any additional comments' className={styles.input} value={prompt} onChange={setPromptText} />
                    </div>
                    <div className={styles.selectBox}>
                        <div className={styles.itemContainer}>
                            <div className={styles.item}>
                                <label htmlFor='DesignTheme'>Select DesignTheme</label>
                            </div>
                            <div className={styles.item}>
                                <select id='DesignTheme' onChange={setDesignThemeCode} value={designTheme} className={styles.select}>
                                    <option value='' disabled hidden>Design Theme</option>
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
                                <label htmlFor='SpaceType'>Select SpaceType</label>
                            </div>
                            <div className={styles.item}>
                                <select id='SpaceType' onChange={setSpaceTypeCode} value={spaceType} className={styles.select}>
                                    <option value='' disabled hidden>Space Type</option>
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
                        <button className={styles.generateButton} onClick={handleGenerate}>Re.Generate</button>
                    </div>
                    <div className={styles.itemContainer2}>
                        <button className={styles.generateButton} onClick={handleNewGenerate}>New Generate</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
