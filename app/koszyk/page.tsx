"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartItem = {
  boxId: number;
  boxName: string;
  price: number;
  quantity: number;
  total: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("boxlove_cart");

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(Array.isArray(parsedCart) ? parsedCart : []);
    }
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  function removeItem(boxId: number) {
    const updatedCart = cart.filter((item) => item.boxId !== boxId);
    setCart(updatedCart);
    localStorage.setItem("boxlove_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("boxlove_cart");
    window.dispatchEvent(new Event("cartUpdated"));
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <h1 className="mb-8 text-3xl font-bold">Koszyk</h1>

          <p className="text-white/60">Koszyk jest pusty.</p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-2xl bg-pink-500 px-6 py-3 font-semibold text-black"
          >
            Wróć do boxów
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold">Koszyk</h1>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.boxId}
                className="flex gap-4 border-b border-white/10 pb-5 last:border-b-0"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-pink-500/20 text-sm">
                  Zdjęcie
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.boxName}</h2>

                  <p className="mt-1 text-sm text-white/60">
                    Ilość: {item.quantity}
                  </p>

                  <p className="mt-2 text-sm text-white/60">
                    Cena: {item.price} zł / szt.
                  </p>

                  <p className="mt-3 font-bold text-pink-400">
                    Razem: {item.total} zł
                  </p>

                  <button
                    onClick={() => removeItem(item.boxId)}
                    className="mt-3 text-sm text-white/40 underline"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="mb-3 flex justify-between text-white/70">
              <span>Suma produktów</span>
              <span>{totalAmount} zł</span>
            </div>

            <div className="mb-3 flex justify-between text-white/70">
              <span>Dostawa</span>
              <span>0 zł / 19 zł</span>
            </div>

            <div className="mt-5 flex justify-between text-xl font-bold">
              <span>Razem</span>
              <span className="text-pink-400">{totalAmount} zł + dostawa</span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 py-3 text-center font-semibold text-white"
            >
              Dodaj kolejny
            </Link>

            <button
              onClick={clearCart}
              className="rounded-2xl border border-white/15 py-3 font-semibold text-white"
            >
              Wyczyść koszyk
            </button>

            <Link
              href="/dostawa"
              className="rounded-2xl bg-pink-500 py-3 text-center font-semibold text-black"
            >
              Przejdź do dostawy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}