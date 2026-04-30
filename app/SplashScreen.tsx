"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startExit = setTimeout(() => {
      setLeaving(true);
    }, 1400);

    const hide = setTimeout(() => {
      setVisible(false);
    }, 1900);

    return () => {
      clearTimeout(startExit);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          leaving ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-pink-500/30 blur-2xl" />

          <Image
            src="/boxlove-logo.png"
            alt="BOXLOVE"
            width={190}
            height={190}
            className="relative rounded-[2rem] shadow-[0_20px_80px_rgba(236,72,153,0.35)]"
            priority
          />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.4em] text-pink-400">
          BOXLOVE
        </p>

        <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full animate-[loadingBar_1.4s_ease-in-out_forwards] rounded-full bg-pink-500" />
        </div>
      </div>
    </div>
  );
}