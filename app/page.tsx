import Link from "next/link";

const boxes = [
  {
    id: 1,
    name: "Box Classic",
    price: 199,
    tag: "Bestseller",
    desc: "Uniwersalny box na spotkanie, prezent lub wieczór we dwoje.",
    image: "/boxes/classic.jpg",
  },
  {
    id: 2,
    name: "Box Premium",
    price: 219,
    tag: "Premium",
    desc: "Elegancki zestaw na wyjątkowe okazje.",
    image: "/boxes/premium.jpg",
  },
  {
    id: 3,
    name: "Box Sweet",
    price: 189,
    tag: "Na słodko",
    desc: "Słodka kompozycja idealna na prezent.",
    image: "/boxes/sweet.jpg",
  },
  {
    id: 4,
    name: "Box Party",
    price: 249,
    tag: "Na event",
    desc: "Większy zestaw dla kilku osób.",
    image: "/boxes/party.jpg",
  },
  {
    id: 5,
    name: "Box Fit",
    price: 169,
    tag: "Lekki wybór",
    desc: "Lżejsza opcja z przekąskami.",
    image: "/boxes/fit.jpg",
  },
  {
    id: 6,
    name: "Box Deluxe",
    price: 299,
    tag: "Największy",
    desc: "Najbogatsza propozycja BOXLOVE.",
    image: "/boxes/deluxe.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-pink-400">
            Gotowe na każdą okazję
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Wybierz swojego boxa
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/55">
            Zamów elegancki box eventowy z dostawą. Minimum 48 godzin przed
            planowaną dostawą.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {boxes.map((box) => (
            <article
              key={box.id}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:border-pink-400/40"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={box.image}
                  alt={box.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-black shadow-lg">
                  {box.tag}
                </span>

                <p className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-lg font-bold text-pink-400 backdrop-blur">
                  {box.price} zł
                </p>
              </div>

              <div className="p-5">
                <h2 className="text-2xl font-semibold">{box.name}</h2>

                <p className="mt-2 min-h-12 text-sm leading-6 text-white/60">
                  {box.desc}
                </p>

                <Link
                  href={`/box/${box.id}`}
                  className="mt-5 block w-full rounded-2xl bg-pink-500 py-3 text-center font-semibold text-black transition hover:bg-pink-400"
                >
                  Kup teraz
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}