'use client';

import React from 'react';

import Image from 'next/image';

import { Button } from './ui/button';

export default function Header() {
  const triggerDownload = () => {
    localStorage.setItem('triggerDownload', 'true');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="https://res.cloudinary.com/duud9d8dv/image/upload/v1708045890/portfolio/icon_a7ignp.png"
              alt=""
              width={256}
              height={256}
              className="h-8 w-8"
            />
            <span className="hidden font-bold sm:inline-block">
              CustomGradient
            </span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button
            variant="outline"
            onClick={triggerDownload}
            className="flex flex-row space-x-2 items-center justify-center"
          >
            <span className="text-sm">Download</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
