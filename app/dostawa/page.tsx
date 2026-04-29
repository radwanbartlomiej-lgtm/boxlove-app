"use client";

import Link from "next/link";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { pl } from "date-fns/locale";
import CheckoutSteps from "../CheckoutSteps";

const slots = ["09:00 - 12:00", "12:00 - 15:00", "15:00 - 18:00"];

export default function DeliveryPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const today = new Date();
  const minDeliveryDate = new Date(
    today.getTime() + 2 * 24 * 60 * 60 * 1000
  );

  function saveDelivery() {
    if (!selectedDate || !selectedSlot) {
      alert("Wybierz datę i przedział godzinowy dostawy.");
      return;
    }

    localStorage.setItem(
      "boxlove_delivery",
      JSON.stringify({
        date: selectedDate.toLocaleDateString("pl-PL"),
        slot: selectedSlot,
      })
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-3 text-3xl font-bold">Dostawa</h1>
        <CheckoutSteps active="dostawa" />

        <p className="mb-8 text-sm text-white/60">
          Zamówienie należy złożyć minimum 48 godzin przed planowaną dostawą.
        </p>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="mb-4 text-xl font-semibold">
            Wybierz datę dostawy
          </h2>

          <div className="mb-8 rounded-2xl bg-black/30 p-4">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: minDeliveryDate }}
              locale={pl}
            />
          </div>

          <h2 className="mb-4 text-xl font-semibold">
            Wybierz przedział godzinowy
          </h2>

          <div className="mb-6 space-y-3">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`flex w-full justify-between rounded-2xl border px-4 py-4 ${
                  selectedSlot === slot
                    ? "border-pink-400 bg-pink-500/20 text-pink-200"
                    : "border-white/10 bg-black/30 text-white"
                }`}
              >
                <span>{slot}</span>
                <span className="text-pink-400">Dostępne</span>
              </button>
            ))}
          </div>

          <div className="mb-6 rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4 text-sm text-white/70">
            Darmowa dostawa do 10 km od Ożarowa Mazowieckiego. Poza strefą
            koszt dostawy wynosi 19 zł.
          </div>

          {!selectedDate || !selectedSlot ? (
            <button
              type="button"
              onClick={saveDelivery}
              className="w-full rounded-2xl bg-pink-500 py-3 font-semibold text-black"
            >
              Przejdź do danych
            </button>
          ) : (
            <Link
              href="/dane"
              onClick={saveDelivery}
              className="block w-full rounded-2xl bg-pink-500 py-3 text-center font-semibold text-black"
            >
              Przejdź do danych
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}