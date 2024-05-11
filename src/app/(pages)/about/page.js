import backgroundImg from './1.gif';
//import image1 from './2.png';
//import image2 from './3.png';
//import image3 from './4.png';

export default function Component() {
  return (
    <div
      className="text-white p-12 flex justify-center"
      style={{
        backgroundImage: `url(${backgroundImg})`, 
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-5xl font-bold">why we made?</h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <img
              alt="elaborate details"
              className="rounded-lg"
              height="400"
              src={image1}
              style={{
                aspectRatio: "300/400",
                objectFit: "cover",
              }}
              width="300"
            />
            <h2 className="text-xl font-semibold">elaborate details</h2>
            <p>내용</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img
              alt="instead of a professional, ai"
              className="rounded-lg"
              height="400"
              src={image2} 
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
              alt="수기한 내용"
              className="rounded-lg"
              height="400"
              src={image3} // 변경된 부분
              style={{
                aspectRatio: "300/400",
                objectFit: "cover",
              }}
              width="300"
            />
            <h2 className="text-xl font-semibold">수기한 내용</h2>
            <p>내용3</p>
          </div>
        </div>
      </div>
    </div>
  )
}
