import styles from "../../page.module.css";

export default function Component() {
  return (
    <div className={`${styles.main} ${styles.flex} ${styles.flexCol} ${styles.itemsCenter} ${styles.justifyCenter} ${styles.minHScreen}`} style={{ backgroundImage: `url()`, backgroundSize: "cover", backgroundPosition: "center" }}>

    <div
      className="text-white p-12 flex justify-center"
      style={{
        backgroundImage: "url('/placeholder.svg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-5xl font-bold">why we made?</h1>
          <div className="flex flex-col items-center space-y-4">
            <img
              alt="elaborate details"
              className="rounded-lg"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/400",
                objectFit: "cover",
              }}
              width="300"
            />
            <h2 className="text-xl font-semibold">elaborate details</h2>
            <p>내용1</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img
              alt="instead of a professional, ai"
              className="rounded-lg"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/400",
                objectFit: "cover",
              }}
              width="300"
            />
            <h2 className="text-xl font-semibold">instead of a professional, ai</h2>
            <p>내용2</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img
              alt="내용33"
              className="rounded-lg"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "300/400",
                objectFit: "cover",
              }}
              width="300"
            />
            <h2 className="text-xl font-semibold">내용33</h2>
            <p>내용3</p>
          </div>
        </div>
      </div>
    </div>
  )
}
