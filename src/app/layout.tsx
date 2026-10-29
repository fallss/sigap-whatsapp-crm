import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import ScreenSwitcher from "@/components/ScreenSwitcher";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sigap - Asisten CS WhatsApp untuk UMKM",
  description: "Platform asisten CS WhatsApp otomatis untuk UMKM jasa. Menjawab pertanyaan berulang, mengingat tiap pelanggan, dan memanggil mereka kembali tepat waktu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-slate-800 bg-[#f8faf9] min-h-screen">
        {children}
        <ScreenSwitcher />
      </body>
    </html>
  );
}
