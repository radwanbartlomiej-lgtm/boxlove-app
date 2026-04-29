import "./globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-[#050505] text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}