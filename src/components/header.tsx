'use client';

import React from 'react';

import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="https://res.cloudinary.com/duud9d8dv/image/upload/v1708045890/portfolio/icon_a7ignp.png"
              alt=""
              width={256}
              height={256}
              className="h-8 w-8"
            />
            <span className="font-bold  inline-block">
              CustomGradient
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
