"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  quantity: number;
};

export default function Header() {
  const [count, setCount] = useState(0);

  function updateCount() {
    const savedCart = localStorage.getItem("boxlove_cart");

    if (!savedCart) {
      setCount(0);
      return;
    }

    const cart = JSON.parse(savedCart);

    const total = Array.isArray(cart)
      ? cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
      : 0;

    setCount(total);
  }

  useEffect(() => {
    updateCount();

    window.addEventListener("storage", updateCount);
    window.addEventListener("focus", updateCount);
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("focus", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 py-4 sm:relative sm:flex-row">
        <Link href="/" className="block">
          <Image
            src="/boxlove-logo.png"
            alt="BOXLOVE"
            width={520}
            height={220}
            className="h-auto w-72 sm:w-96"
            priority
          />
        </Link>

        <Link
          href="/koszyk"
          className="relative rounded-xl border border-white/15 bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2"
        >
          Koszyk

          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-black">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}