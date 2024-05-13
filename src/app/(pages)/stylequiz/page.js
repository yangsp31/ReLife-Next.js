"use client"; //React 훅(useState 및 useEffect)을 사용(클라이언트 사이드에서만 실행), 해당 컴포넌트가 서버 컴포넌트로 처리. Next.js 13 이상에서는 서버 컴포넌트와 클라이언트 컴포넌트를 명확히 구분
import React, { useState, useEffect } from 'react';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        // API에서 퀴즈 질문을 가져오는 가상의 함수
        fetch('/quiz-test')
            .then(response => response.json())
            .then(data => {
                setQuestions(data);
                setCurrentQuestion(data[0]);
            });
    }, []);

    return (
        <div>
            {currentQuestion && (
                <div>
                    <h1>{currentQuestion.question}</h1>
                    <ul>
                        {currentQuestion.options.map(option => (
                            <li key={option.id}>{option.text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Quiz;
