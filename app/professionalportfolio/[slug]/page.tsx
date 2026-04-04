// import { Metadata } from "next";
// import { portfolioRegistry, samplePortfolioData } from "@/data/portfolios";
// import PortfolioPageClient from "@/components/professionalPortfolioComponents/PortfolioPageClient";
// import { getPortfolio } from "@/lib/api/portfolio";
// import { notFound } from "next/navigation";
// import { UrlID } from "@/utils/commenTypes";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// // export async function generateMetadata({
// //   params,
// // }: PageProps): Promise<Metadata> {
// //   const { slug } = await params;
// //   const data = portfolioRegistry[slug] ?? samplePortfolioData;

// //   return {
// //     title: data.meta.seo.title,
// //     description: data.meta.seo.description,
// //     keywords: data.meta.seo.keywords,
// //     openGraph: {
// //       title: data.meta.seo.title,
// //       description: data.meta.seo.description,
// //       images: data.meta.seo.ogImage
// //         ? [{ url: data.meta.seo.ogImage }]
// //         : data.hero.image
// //           ? [{ url: data.hero.image }]
// //           : [],
// //     },
// //     twitter: {
// //       card: "summary_large_image",
// //       title: data.meta.seo.title,
// //       description: data.meta.seo.description,
// //     },
// //   };
// // }

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;

//   const apiData = await getPortfolio(slug);
//   const data = apiData ?? samplePortfolioData;

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

// export async function generateStaticParams() {
//   return Object.keys(portfolioRegistry).map((slug) => ({ slug }));
// }

// export default async function PortfolioPage({ params }: PageProps) {
//   const { slug } = await params;
//   // const data = portfolioRegistry[slug];

//   if(slug === UrlID.DEMO){
// return <PortfolioPageClient data={samplePortfolioData} />;
//   }else{
//   const data = await getPortfolio(slug);

//   if (!data) {
//     return notFound();
//     // For demo, fall back to sample data instead of 404
//     // return <PortfolioPageClient data={samplePortfolioData} />;
//   }

//   return <PortfolioPageClient data={data} />;
// }
// }

import { Metadata } from "next";
import PortfolioPageClient from "@/components/professionalPortfolioComponents/PortfolioPageClient";
import { getPortfolio } from "@/lib/api/portfolio";
import { notFound } from "next/navigation";
import { UrlID } from "@/utils/commenTypes";
import { samplePortfolioData } from "@/data/portfolios";
import PortfolioComponentsApp from "@/components/professionalPortfolioTwoComponents/PortfolioComponentsApp";
import portfolioData from "@/components/professionalPortfolioTwoComponents/data/portfolioData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ✅ Force fully dynamic - This removes the error
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const apiData = await getPortfolio(slug);
  const data = apiData ?? samplePortfolioData; // Note: you used samplePortfolioData

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

// ❌ Remove this completely - This was causing the conflict
// export async function generateStaticParams() {
//   return Object.keys(portfolioRegistry).map((slug) => ({ slug }));
// }

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === UrlID.DEMO) {
    return <PortfolioPageClient data={samplePortfolioData} />;
  } else if (slug === UrlID.DEMO2) {
    return <PortfolioPageClient data={portfolioData} />;
  }

  const data = await getPortfolio(slug);

  if (!data) {
    return notFound();
  }

  // <PortfolioComponentsApp data={data}/>
  return <PortfolioPageClient data={data} />;
}
