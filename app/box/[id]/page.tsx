"use client";

import Link from "next/link";
import { use, useState } from "react";

const boxes = [
  { id: 1, name: "Box Classic", price: 199 },
  { id: 2, name: "Box Premium", price: 219 },
  { id: 3, name: "Box Sweet", price: 189 },
  { id: 4, name: "Box Party", price: 249 },
  { id: 5, name: "Box Fit", price: 169 },
  { id: 6, name: "Box Deluxe", price: 299 },
];

export default function BoxPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);

  const boxId = Number(id);
  const box = boxes.find((item) => item.id === boxId) || boxes[0];

  function addToCart() {
    const savedCart = localStorage.getItem("boxlove_cart");
    const cart = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cart.find((item: any) => item.boxId === box.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item: any) =>
        item.boxId === box.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              total: item.price * (item.quantity + quantity),
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          boxId: box.id,
          boxName: box.name,
          price: box.price,
          quantity,
          total: box.price * quantity,
        },
      ];
    }

    localStorage.setItem("boxlove_cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-[#050505] pb-28 text-white">
      {toast && (
        <div className="fixed left-1/2 top-6 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-3xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-500 text-xl">
              ✅
            </div>

            <div className="flex-1">
              <p className="font-semibold text-white">Dodano do koszyka</p>
              <p className="text-sm text-white/50">
                {box.name} × {quantity}
              </p>
            </div>
          </div>

          <Link
            href="/koszyk"
            className="mt-4 block w-full rounded-2xl bg-pink-500 py-3 text-center font-semibold text-black"
          >
            Przejdź do koszyka
          </Link>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/" className="mb-6 inline-block text-sm text-pink-400">
          ← Wróć do boxów
        </Link>

        <h1 className="mb-6 text-3xl font-bold">{box.name}</h1>

        <div className="mb-6 flex h-64 items-center justify-center rounded-2xl bg-pink-500/20">
          Zdjęcie boxa
        </div>

        <p className="mb-4 text-lg font-bold text-pink-400">
          {box.price} zł
        </p>

        <p className="mb-6 leading-7 text-white/70">
          Tutaj będzie pełny opis boxa.
        </p>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="mb-3 font-semibold">Ilość boxów</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-11 w-11 rounded-xl border border-white/10 bg-black/30 text-xl"
            >
              -
            </button>

            <span className="min-w-8 text-center text-xl font-bold">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="h-11 w-11 rounded-xl border border-white/10 bg-black/30 text-xl"
            >
              +
            </button>
          </div>

          <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
            <span className="text-white/60">Suma</span>
            <span className="font-bold text-pink-400">
              {box.price * quantity} zł
            </span>
          </div>
        </div>

        <button
          onClick={addToCart}
          className="hidden w-full rounded-2xl bg-pink-500 py-3 text-center font-semibold text-black sm:block"
        >
          Dodaj do koszyka
        </button>

        <Link
          href="/"
          className="mt-4 block w-full rounded-2xl border border-pink-400/30 py-3 text-center font-semibold text-pink-300 hover:bg-pink-500/10"
        >
          Wróć do listy boxów
        </Link>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black p-4 sm:hidden">
        <button
          onClick={addToCart}
          className="w-full rounded-2xl bg-pink-500 py-3 text-center font-semibold text-black"
        >
          Dodaj do koszyka • {box.price * quantity} zł
        </button>
      </div>
    </main>
  );
}