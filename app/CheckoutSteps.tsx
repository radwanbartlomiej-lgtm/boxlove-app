"use client";

import Link from "next/link";

const steps = [
  { id: "koszyk", label: "Koszyk", href: "/koszyk" },
  { id: "dostawa", label: "Dostawa", href: "/dostawa" },
  { id: "dane", label: "Dane", href: "/dane" },
];

export default function CheckoutSteps({ active }: { active: string }) {
  return (
    <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-3">
      <div className="grid grid-cols-3 gap-2">
        {steps.map((step, index) => {
          const isActive = step.id === active;

          return (
            <Link
              key={step.id}
              href={step.href}
              className={`rounded-2xl px-3 py-3 text-center text-sm font-semibold transition ${
                isActive
                  ? "bg-pink-500 text-black shadow-lg"
                  : "bg-black/40 text-white/50 hover:bg-white/10"
              }`}
            >
              <span className="mr-1">{index + 1}.</span>
              {step.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}