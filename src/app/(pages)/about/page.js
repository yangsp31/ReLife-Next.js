import styles from "../../page.module.css";

export default function Component() {
  return (
    <div className={`${styles.main} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.minHScreen}`} >
    <div
      className="text-white p-12 flex justify-center"
      style={{
        backgroundImage: "url('/placeholder.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-5xl font-bold">목적</h1>
        <div className={`${styles.aboutBox} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter}`}>
          <h2 className="text-xl font-semibold">우리의 AI는 실시간으로 다양한 인테리어 스타일을 시뮬레이션합니다. 여러분의 아이디어를 빠르게 확인하고, 다양한 디자인 옵션을 통해 자신만의 특별한 공간을 구현해보세요.</h2>
          <div className={styles.imageContainer1}>
            <img src="/home-cover-1.jpg" alt="Home Cover" className={styles.image1} />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-xl font-semibold">A.I</h1>
          <h2 className="text-xl font-semibold">ReimagineHome A.I 서비스의 API를 사용 하였습니다.</h2>
          <div className={styles.imageContainer1}>
            <img src="/reimagine.jpg" alt="Home Cover" className={styles.image1} />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
