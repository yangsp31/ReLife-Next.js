"use client";

// 웹사이트의 최초 진입점 입니다 이 페이지가 가장 먼저 보여지는 페이지 이므로 여기서부터 개발하시면 됩니다.
import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { Input, Button, Card, CardHeader, CardContent, Textarea } from "@/Components";
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();
    const handleAgreeClick = () => {
      router.push("/explain/page");
    }

  return (
    <div className={`flex flex-col min-h-screen ${styles.main}`}>
      <header className={`${styles.description} px-4 lg:px-6 h-14 flex items-center`}>
        <Link href="#">
          <a className="flex items-center justify-center">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </a>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/about"><a className="text-sm font-medium hover:underline underline-offset-4">About</a></Link>
          <Link href="/services"><a className="text-sm font-medium hover:underline underline-offset-4">Services</a></Link>
          <Link href="/portfolio"><a className="text-sm font-medium hover:underline underline-offset-4">Portfolio</a></Link>
          <Link href="/contact"><a className="text-sm font-medium hover:underline underline-offset-4">Contact</a></Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Beautiful Spaces, Beautiful Lives
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl lg:text-lg xl:text-xl dark:text-gray-400">
              Elevate your space with our award-winning interior design. Let's turn your home into a masterpiece.
            </p>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <Input className="max-w-lg flex-1" placeholder="Generate" type="text" />
                <Button onClick={handleAgreeClick}>Agree</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By clicking "Agree," you consent to the use of cookies.
                <Link href="/terms"><a className="underline">Terms & Conditions</a></Link>
              </p>
            </div>
          </div>
        </section>
        {/* Additional sections for About, Services, Portfolio, Contact */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="ml-auto flex gap-4">
          <Link href="/terms"><a className="text-xs hover:underline">Terms of Service</a></Link>
          <Link href="/privacy"><a className="text-xs hover:underline">Privacy</a></Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}