import Link from "next/link";

const boxes = [
  { id: 1, name: "Box 01", price: 199 },
  { id: 2, name: "Box 02", price: 219 },
  { id: 3, name: "Box 03", price: 189 },
  { id: 4, name: "Box 04", price: 249 },
  { id: 5, name: "Box 05", price: 169 },
  { id: 6, name: "Box 06", price: 299 },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      
      {/* NAGŁÓWEK */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">Wybierz swojego boxa</h1>
        <p className="mt-2 text-white/60">
          Pysznie, wygodnie, wyjątkowo.
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="mb-4 flex h-48 items-center justify-center rounded-2xl bg-pink-500/20">
              Zdjęcie
            </div>

            <h2 className="text-xl font-semibold">{box.name}</h2>

            <p className="mt-1 text-pink-400">{box.price} zł</p>

            <Link
              href={`/box/${box.id}`}
              className="mt-4 block w-full rounded-2xl bg-pink-500 py-3 text-center font-semibold text-black"
            >
              Kup teraz
            </Link>
          </div>
        ))}
      </div>

    </main>
  );
}