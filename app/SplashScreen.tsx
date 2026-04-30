"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <Image
          src="/app-icon.png"
          alt="BOXLOVE"
          width={180}
          height={180}
          className="rounded-[2rem]"
          priority
        />

        <p className="mt-6 text-sm uppercase tracking-[0.35em] text-pink-400">
          BOXLOVE
        </p>
      </div>
    </div>
  );
}