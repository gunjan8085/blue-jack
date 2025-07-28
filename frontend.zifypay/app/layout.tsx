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
        {/* ✅ Google Ads / gtag.js */}
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

        {/* ✅ Google Ads Conversion Event */}
        <Script id="conversion-event" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17360897385/6CeTCMzt_vEaEOmKqdZA'
            });
          `}
        </Script>

        {/* ✅ Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1402398147878228');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        {/* ✅ Meta Pixel NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1402398147878228&ev=PageView&noscript=1"
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
