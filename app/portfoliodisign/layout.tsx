import type { Metadata } from "next";
// import "./style.css";
import portfolioData from "@/components/portfoliodisignComponents/data/portfolio";

const { meta, hero } = portfolioData;

export const metadata: Metadata = {
  title: meta.seo.title,
  description: meta.seo.description,
  keywords: meta.seo.keywords,
  authors: [{ name: meta.name }],
  creator: meta.name,
  openGraph: {
    type: "website",
    title: meta.seo.title,
    description: meta.seo.description,
    images: hero.image ? [{ url: hero.image, alt: meta.name }] : [],
    siteName: meta.name,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.seo.title,
    description: meta.seo.description,
    images: hero.image ? [hero.image] : [],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: `https://yoursite.com/${meta.slug}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={meta.accentColor} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --accent: ${meta.accentColor}; }`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
