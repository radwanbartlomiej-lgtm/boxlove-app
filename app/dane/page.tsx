"use client";

import { useEffect, useState } from "react";

type CartItem = {
  boxId: number;
  boxName: string;
  price: number;
  quantity: number;
  total: number;
};

type Delivery = {
  date: string;
  slot: string;
};

export default function CustomerDataPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
    notes: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("boxlove_cart");
    const savedDelivery = localStorage.getItem("boxlove_delivery");

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(Array.isArray(parsedCart) ? parsedCart : []);
    }

    if (savedDelivery) {
      setDelivery(JSON.parse(savedDelivery));
    }
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  function updateField(field: string, value: string) {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  }

  function validate() {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Podaj imię i nazwisko";
    if (!form.phone.trim()) newErrors.phone = "Podaj numer telefonu";
    if (!form.email.trim()) newErrors.email = "Podaj e-mail";
    if (!form.street.trim()) newErrors.street = "Podaj ulicę";
    if (!form.postalCode.trim()) newErrors.postalCode = "Podaj kod pocztowy";
    if (!form.city.trim()) newErrors.city = "Podaj miasto";

    if (!delivery?.date) newErrors.delivery = "Wybierz datę dostawy";
    if (!delivery?.slot) newErrors.delivery = "Wybierz godzinę dostawy";

    if (cart.length === 0) newErrors.cart = "Koszyk jest pusty";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function sendOrderEmail() {
    if (!validate()) return;

    setIsSending(true);
    setMessage("");

    const response = await fetch("/api/send-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        cart,
        totalAmount,
        delivery,
      }),
    });

    if (response.ok) {
      setMessage("Zamówienie zostało wysłane ✅");
      localStorage.removeItem("boxlove_cart");
      localStorage.removeItem("boxlove_delivery");
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      setMessage("Coś poszło nie tak.");
    }

    setIsSending(false);
  }

  function inputClass(error: string) {
    return `w-full rounded-2xl border px-4 py-3 text-white ${
      error
        ? "border-red-500 bg-red-500/10"
        : "border-white/10 bg-black/30"
    }`;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-bold">Dane do zamówienia</h1>

        {errors.cart && (
          <p className="mb-4 text-red-400">{errors.cart}</p>
        )}

        <div className="mb-6 rounded-3xl border border-pink-400/20 bg-pink-400/10 p-5">
          <h2 className="mb-3 text-xl font-semibold">Podsumowanie</h2>

          {cart.map((item) => (
            <div key={item.boxId} className="flex justify-between text-sm">
              <span>
                {item.boxName} × {item.quantity}
              </span>
              <span>{item.total} zł</span>
            </div>
          ))}

          <div className="mt-3 flex justify-between border-t pt-3 font-bold">
            <span>Suma</span>
            <span>{totalAmount} zł</span>
          </div>

          <p className="mt-3 text-sm text-white/70">
            Data: {delivery?.date || "Brak"}
          </p>
          <p className="text-sm text-white/70">
            Godzina: {delivery?.slot || "Brak"}
          </p>

          {errors.delivery && (
            <p className="mt-2 text-red-400">{errors.delivery}</p>
          )}
        </div>

        <div className="space-y-4">
          <input
            className={inputClass(errors.name)}
            placeholder="Imię i nazwisko"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

          <input
            className={inputClass(errors.phone)}
            placeholder="Telefon"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}

          <input
            className={inputClass(errors.email)}
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

          <input
            className={inputClass(errors.street)}
            placeholder="Ulica"
            value={form.street}
            onChange={(e) => updateField("street", e.target.value)}
          />
          {errors.street && <p className="text-red-400 text-sm">{errors.street}</p>}

          <input
            className={inputClass(errors.postalCode)}
            placeholder="Kod pocztowy"
            value={form.postalCode}
            onChange={(e) => updateField("postalCode", e.target.value)}
          />
          {errors.postalCode && (
            <p className="text-red-400 text-sm">{errors.postalCode}</p>
          )}

          <input
            className={inputClass(errors.city)}
            placeholder="Miasto"
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
          />
          {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}

          <textarea
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white"
            placeholder="Uwagi"
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>

        <button
          onClick={sendOrderEmail}
          disabled={isSending}
          className="mt-6 w-full rounded-2xl bg-pink-500 py-3 font-semibold text-black disabled:opacity-50"
        >
          {isSending ? "Wysyłanie..." : "Wyślij zamówienie"}
        </button>

        {message && (
          <p className="mt-4 text-center text-white/70">{message}</p>
        )}
      </div>
    </main>
  );
}