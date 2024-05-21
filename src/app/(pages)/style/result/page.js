"use client"; // 클라이언트 사이드 렌더링을 활성화
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../../page.module.css";

export default function Result() {
  const searchParams = useSearchParams(); // 쿼리 파라미터를 가져옴
  const result = JSON.parse(searchParams.get('result')); // 결과를 JSON으로 파싱

  return (
    <div className={`${styles.main}`} style={{ backgroundImage: `url('/back.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl mb-6" style={{ color: 'white' }}>퀴즈 결과</h1>
        {result.map((item, index) => (
          <div key={index} className="bg-white bg-opacity-75 p-4 m-4 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">{Object.keys(item)[0]}</h2>
            <p className="mb-2">{item[Object.keys(item)[0]]}</p>
            <Image
              src={`/style/img${Object.keys(item)[0].slice(-1)}.jpg`} // 해당 이미지 경로
              alt={Object.keys(item)[0]}
              width={200}
              height={200}
              className="rounded"
            />
            {quizResult && (
                <div className="mt-4">
                  <h3>Quiz Result:</h3>
                  <pre>{JSON.stringify(quizResult, null, 2)}</pre>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
