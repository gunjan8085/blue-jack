import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"

// Inter font config
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://zifypay.com"),
  title: "Zifypay",
  description:
    "Smart booking software with built-in payments — simple, flexible, and ready to grow with your business.",
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}
        <Toaster/>
      </body>
    </html>
  );
}
