import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/context";
import VersionRecovery from "@/components/VersionRecovery/VersionRecovery";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Store",
  description: "Welcome to the shop",
  openGraph: {
    title: "My Store",
    description: "Welcome to the shop",
    url: "https://apisr.shareurinterest.com",
    siteName: "My Store",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VersionRecovery />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
