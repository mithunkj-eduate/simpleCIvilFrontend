import { Metadata } from "next";
import { portfolioRegistry } from "@/data/portfolios";
import PortfolioPageClient from "@/components/professionalPortfolioComponents/PortfolioPageClient";
import { getPortfolio } from "@/lib/api/portfolio";
import { notFound } from "next/navigation";
import { UrlID } from "@/utils/commenTypes";
import PortfolioComponentsApp from "@/components/professionalPortfolioTwoComponents/PortfolioComponentsApp";
import portfolioData from "@/components/professionalPortfolioTwoComponents/data/portfolioData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const data = portfolioRegistry[slug] ?? portfolioData;

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
  const data = apiData ?? portfolioData;

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

  if (slug === UrlID.DEMO) {
    return <PortfolioPageClient data={portfolioData} />;
  } else {
    const data = await getPortfolio(slug);

    if (!data) {
      return notFound();
      // For demo, fall back to sample data instead of 404
      // return <PortfolioPageClient data={portfolioData} />;
    }

    return <PortfolioComponentsApp data={data} />;
  }
}
