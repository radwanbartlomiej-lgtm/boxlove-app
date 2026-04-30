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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        {/* LOGO */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <Link href="/">
            <Image
              src="/boxlove-logo.png"
              alt="BOXLOVE"
              width={520}
              height={220}
              className="h-auto w-48 sm:w-72"
              priority
            />
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
            <a href="#sklep" className="hover:text-white">
              Sklep
            </a>
            <a href="#onas" className="hover:text-white">
              O nas
            </a>
            <a href="#dostawa" className="hover:text-white">
              Dostawa
            </a>
            <a href="#kontakt" className="hover:text-white">
              Kontakt
            </a>
          </nav>

          {/* KOSZYK */}
          <Link
            href="/koszyk"
            className="relative rounded-xl border border-white/15 bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Koszyk

            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-black">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* MENU MOBILE */}
        <nav className="mt-3 flex justify-center gap-4 text-sm text-white/70 sm:hidden">
          <a href="#sklep" className="hover:text-white">
            Sklep
          </a>
          <a href="#onas" className="hover:text-white">
            O nas
          </a>
          <a href="#dostawa" className="hover:text-white">
            Dostawa
          </a>
          <a href="#kontakt" className="hover:text-white">
            Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}