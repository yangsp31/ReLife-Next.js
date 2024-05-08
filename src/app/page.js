"use client";

// 웹사이트의 최초 진입점 입니다 이 페이지가 가장 먼저 보여지는 페이지 이므로 여기서부터 개발하시면 됩니다.
import React from 'react';
import Link from "next/link";
import { Input, Button, Card, CardHeader, CardContent, Textarea } from "@/components/components";
import styles from "./page.module.css";
import CookieConsentBanner from './cookies/permit_banner/banner.client';

export default function HomePage() {
  return (
    <div className={`flex flex-col min-h-screen ${styles.main}`}>
      <CookieConsentBanner />

      <header className={`${styles.description} px-4 lg:px-6 h-14 flex items-center`}>
        <Link href="#">
          {/* `as` 속성으로 직접 HTML 요소를 지정하지 않고 `Link` 컴포넌트만 사용 */}
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/explain/page">About</Link>
          <Link href="/imageUpload/page.js">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Contact</Link>
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
                <Link href="/explain/page">
                  <Button>Generation</Button>
                </Link>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By clicking "Agree," you consent to the use of cookies.
                <Link href="/terms">Terms & Conditions</Link>
              </p>
            </div>
          </div>
        </section>
        {/* Additional sections for About, Services, Portfolio, Contact */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="ml-auto flex gap-4">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy</Link>
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
