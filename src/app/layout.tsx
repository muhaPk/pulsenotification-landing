import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PulseNotification — Real-time Crypto Volatility Monitor",
  description:
    "Monitor thousands of crypto pairs across Binance, Bybit, OKX, Kraken, and Coinbase. Get instant push notifications when abnormal price movements are detected.",
  openGraph: {
    title: "PulseNotification — Real-time Crypto Volatility Monitor",
    description:
      "Never miss a volatility spike. Real-time monitoring with instant push notifications across 5+ exchanges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-background">{children}</body>
    </html>
  );
}
