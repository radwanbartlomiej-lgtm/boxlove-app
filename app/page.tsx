import Link from "next/link";

const boxes = [
  {
    id: 1,
    name: "Box Classic",
    price: 199,
    tag: "Bestseller",
    desc: "Uniwersalny box na spotkanie, prezent lub wieczór we dwoje.",
  },
  {
    id: 2,
    name: "Box Premium",
    price: 219,
    tag: "Premium",
    desc: "Elegancki zestaw na wyjątkowe okazje i bardziej wymagających gości.",
  },
  {
    id: 3,
    name: "Box Sweet",
    price: 189,
    tag: "Na słodko",
    desc: "Słodka kompozycja idealna na urodziny, niespodziankę lub prezent.",
  },
  {
    id: 4,
    name: "Box Party",
    price: 249,
    tag: "Na event",
    desc: "Większy zestaw dla kilku osób — idealny na domówkę lub spotkanie.",
  },
  {
    id: 5,
    name: "Box Fit",
    price: 169,
    tag: "Lekki wybór",
    desc: "Lżejsza opcja z przekąskami na spokojne spotkanie lub lunch.",
  },
  {
    id: 6,
    name: "Box Deluxe",
    price: 299,
    tag: "Największy",
    desc: "Najbogatsza propozycja BOXLOVE na większe okazje.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Wybierz swojego boxa
          </h1>

          <p className="mt-2 text-white/60">
            Pysznie, wygodnie, wyjątkowo.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boxes.map((box) => (
            <div
              key={box.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl"
            >
              <div className="relative flex h-56 items-center justify-center bg-pink-500/20 text-white">
                <span className="text-white/70">Zdjęcie</span>

                <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-black">
                  {box.tag}
                </span>
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {box.name}
                    </h2>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-white/60">
                      {box.desc}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-xl font-bold text-pink-400">
                    {box.price} zł
                  </p>
                </div>

                <Link
                  href={`/box/${box.id}`}
                  className="mt-5 block w-full rounded-2xl bg-pink-500 py-3 text-center text-lg font-semibold text-black"
                >
                  Kup teraz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}