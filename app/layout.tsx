import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "My Store",
//   description: "Welcome to the shop",
//   openGraph: {
//     title: "My Store",
//     description: "Welcome to the shop",
//     url: "https://apisr.shareurinterest.com",
//     siteName: "My Store",
//     type: "website",
//   },
// };

export const metadata:Metadata = {
  title: "ShareUrInterest AI",
  description: "Create and share your professional portfolio instantly.",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "ShareUrInterest AI 🚀",
    description:
      "Build and share stunning portfolios in seconds with AI.",
    url: "https://ai.shreurinterest.com",
    siteName: "ShareUrInterest",
    images: [
      {
        url: "https://ai.shreurinterest.com/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShareUrInterest AI Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ShareUrInterest AI 🚀",
    description:
      "Build and share stunning portfolios in seconds with AI.",
    images: ["https://ai.shreurinterest.com/og/og-image.png"],
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
        {/* <VersionRecovery /> */}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
