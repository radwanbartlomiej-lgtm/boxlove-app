import "./globals.css";
import Header from "./Header";
import SplashScreen from "./SplashScreen";

import { Inter, Playfair_Display } from "next/font/google";
import type { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "BOXLOVE",
  description: "Boxy eventowe z dostawą",
  applicationName: "BOXLOVE",

  appleWebApp: {
    capable: true,
    title: "BOXLOVE",
    statusBarStyle: "black-translucent",
  },

  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

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
        {/* SPLASH SCREEN */}
        <SplashScreen />

        {/* HEADER */}
        <Header />

        {/* CONTENT */}
        {children}
      </body>
    </html>
  );
}