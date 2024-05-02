import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Input, Button, Card, CardHeader, CardContent } from "@/components/ui";
import styles from "./page.module.css";

// 웹사이트의 최초 진입점 입니다 이 페이지가 가장 먼저 보여지는 페이지 이므로 여기서부터 개발하시면 됩니다.
export default function Home() {
  const router = useRouter();

  const handleAgreeClick = () => {
    router.push("/newPage");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 to-blue-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Image
            src="/mountain.svg"
            alt="Mountain Logo"
            width={24}
            height={24}
            priority
          />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Portfolio
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Beautiful Spaces, Beautiful Lives
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Elevate your space with our award-winning interior design. Let's turn your home into a masterpiece.
              </p>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:gap-2 xl:gap-4">
                  <Input className="max-w-lg flex-1" placeholder="Enter your details" type="text" />
                  <Button type="button" onClick={handleAgreeClick}>Submit</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By clicking "Submit," you consent to the use of cookies.
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/pages/home.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
