import "./globals.css";
import Header from "./Header";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body
        className={`${inter.variable} ${playfair.variable} bg-[#050505] text-white`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}