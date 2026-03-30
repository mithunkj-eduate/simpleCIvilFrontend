import { Metadata } from "next";
import { portfolioRegistry, samplePortfolioData } from "@/data/portfolios";
import PortfolioPageClient from "@/components/professionalPortfolioComponents/PortfolioPageClient";
import { getPortfolio } from "@/lib/api/portfolio";
import NotFound from "@/app/not-found";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const data = portfolioRegistry[slug] ?? samplePortfolioData;

//   return {
//     title: data.meta.seo.title,
//     description: data.meta.seo.description,
//     keywords: data.meta.seo.keywords,
//     openGraph: {
//       title: data.meta.seo.title,
//       description: data.meta.seo.description,
//       images: data.meta.seo.ogImage
//         ? [{ url: data.meta.seo.ogImage }]
//         : data.hero.image
//           ? [{ url: data.hero.image }]
//           : [],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: data.meta.seo.title,
//       description: data.meta.seo.description,
//     },
//   };
// }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const apiData = await getPortfolio(slug);
  const data = apiData ?? samplePortfolioData;

  return {
    title: data.meta.seo.title,
    description: data.meta.seo.description,
    keywords: data.meta.seo.keywords,
    openGraph: {
      title: data.meta.seo.title,
      description: data.meta.seo.description,
      images: data.meta.seo.ogImage
        ? [{ url: data.meta.seo.ogImage }]
        : data.hero.image
          ? [{ url: data.hero.image }]
          : [],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.seo.title,
      description: data.meta.seo.description,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(portfolioRegistry).map((slug) => ({ slug }));
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  // const data = portfolioRegistry[slug];

  const data = await getPortfolio(slug);

  if (!data) {
    return notFound();
    // For demo, fall back to sample data instead of 404
    // return <PortfolioPageClient data={samplePortfolioData} />;
  }

  return <PortfolioPageClient data={data} />;
}
