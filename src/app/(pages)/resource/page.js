import styles from '../../page.module.css'


export default function Component() {
  return (
    <div className={`${styles.main}`}>
      <div className="absolute inset-0 bg-[#0c0032] bg-gradient-to-r from-[#190061] to-[#240090] text-white p-12">
        <div className={styles.textOverlay}>
          <h1 className="text-4xl font-bold mb-8">서비스 개발 참여자</h1>
          <div className={styles.aboutBox}>
            <div>
              <h2 className="text-xl">김정호</h2>
            </div>
            <div>
              <h2 className="text-xl">양승필</h2>
            </div>
            <div>
              <h2 className="text-xl">임종호</h2>
            </div>
            <div>
              <h2 className="text-xl">조혜령</h2>
            </div>
          </div>
          <div>
              <h1 className={`text-2xl font-semibold ${styles.marginTop}`}>사용 기술</h1>
              <h2 className="text-xl">Next.js, React, AWS EC2, AWS S3, Redis, OpenCV, Three.js</h2>
            </div>
        </div>
        <div className={styles.imageContainer2}>
              <img src="/tech1.jpg" alt="Home Cover" className={`${styles.image2} ${styles.largeImage}`}/>
            </div>
      </div>
    </div>
  )
}