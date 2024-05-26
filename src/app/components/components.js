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
    <Link href={href} passHref>
      <a className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] px-8 py-3 text-2xl font-bold text-white shadow-lg transition-colors hover:from-[#FFA500] hover:to-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}>

        {children}
      </a>
    </Link>
  ) : (
    <button
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] px-8 py-3 text-2xl font-bold text-white shadow-lg transition-colors hover:from-[#FFA500] hover:to-[#FF6B6B] focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
};

// Label 컴포넌트
export const Label = ({ htmlFor, children, className = '' }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </label>
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

// Select 컴포넌트
export const Select = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      <select className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        {children}
      </select>
    </div>
  );
};

// SelectItem 컴포넌트
export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

// SelectValue 컴포넌트
export const SelectValue = ({ placeholder }) => {
  return <option value="">{placeholder}</option>;
};

// SelectTrigger 컴포넌트
export const SelectTrigger = ({ children }) => {
  return <>{children}</>;
};

// SelectContent 컴포넌트
export const SelectContent = ({ children }) => {
  return <>{children}</>;
};
