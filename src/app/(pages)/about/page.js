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
          <div className={styles.aboutBox}>
            <h2 className="text-xl font-semibold">머리로만 상상하는것은 그만, 상상을 눈으로 보며 계획해보세요.</h2>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-xl font-semibold">A.I</h1>
            <h2 className="text-xl font-semibold">ReimagineHome A.I 서비스의 API를 사용 하였습니다.</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
