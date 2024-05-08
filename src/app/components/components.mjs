"use client";
import React from 'react';
import '../page.module.css'; // 모든 컴포넌트의 스타일을 하나의 CSS 파일로 관리
import Link from "next/link";

// Input 컴포넌트
export const Input = ({ className, placeholder, type }) => {
  return (
    <input
      className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${className}`}
      type={type}
      placeholder={placeholder}
    />
  );
};

// Button 컴포넌트
export const Button = ({ className, children, href }) => {
  // `href`를 받아서 `Link` 컴포넌트로 감싸는 방식으로 처리
  return href ? (
    <Link href={href}>
      <a
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {children}
      </a>
    </Link>
  ) : (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  );
};

// Card 컴포넌트
export const Card = ({ children }) => {
  return <div className="border border-gray-200 rounded-xl overflow-hidden">{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="bg-gray-100 dark:bg-gray-700 p-4">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

// Textarea 컴포넌트
export const Textarea = ({ className, placeholder }) => {
  return (
    <textarea
      className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${className}`}
      placeholder={placeholder}
    ></textarea>
  );
};

// MountainIcon 컴포넌트
export const MountainIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
};
