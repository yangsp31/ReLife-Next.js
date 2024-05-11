"use client";

import Link from "next/link";

// 메인 페이지의 메인 컴포넌트 정의
export default function Component() {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] bg-gradient-to-br from-purple-200 to-blue-200">
      {/* 이미지 */}
      <div className="mt-8">
        <img
          alt="Image"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
          height="465"
          src="/placeholder.svg"
          width="825"
        />
        <div className="mt-4" />
      </div>

      {/* 설명 내용 */}
      <div className="grid items-start gap-4 xl:gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fast. Secure. Scalable.</h1>
          <p className="text-gray-500 dark:text-gray-400">The homepage of your dreams.</p>
        </div>

        {/* 각 섹션 설명 */}
        <div className="space-y-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Section One</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This is the first section of the homepage. It's where you can introduce your product or company.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Section Two</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This is the second section of the homepage. You might want to talk about features or services here.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Section Three</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This is the third section of the homepage. Perhaps this is where you tell people what to do next.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Generate</h2>
            <p className="text-gray-500 dark:text-gray-400">Click the button below to generate your dream homepage.</p>
            {/* Link 컴포넌트 사용-> /imageUpload/page로 이동*/}
            <Link href="/image/imageUpload" passHref>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                Generate
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
