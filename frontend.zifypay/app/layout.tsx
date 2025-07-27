import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zifypay.com"),
  title: "Zifypay",
  description:
    "Smart booking software with built-in payments — simple, flexible, and ready to grow with your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17360897385"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17360897385');
          `}
        </Script>
        {/* Event snippet for Contact conversion page */}
        <Script id="conversion-event" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17360897385/6CeTCMzt_vEaEOmKqdZA'
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
