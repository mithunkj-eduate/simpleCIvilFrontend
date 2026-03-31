"use client";
import Footer from "@/components/Footer";
import PortfoiloCard from "@/components/PortfolioCard";
import VerstionChange from "@/components/VerstionChange";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
import PortfolioHeroSection from "@/components/PortfolioHeroSection";

export default function Home() {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      {/* ecommers */}
      {/* <HeroSection /> */}
      <PortfolioHeroSection />

      {/* ⭐ Categories */}
      {/* <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900 pb-8">
              Browse Categories
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "Electronics",
                "Furniture",
                "Vehicles",
                "Construction Tools",
                "Fashion",
                "Real Estate",
                "Home Appliances",
                "Sports & Fitness",
              ].map((category) => (
                <div
                  key={category}
                  className="hover:shadow-xl cursor-pointer shadow-sm"
                >
                  <div className="py-6 text-center font-medium text-gray-900">
                    {category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* ⭐ Portfolio Templates */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900 pb-8">
              Choose Your Portfolio Style
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                "Developer Portfolio",
                "Designer Portfolio",
                "Freelancer Profile",
                "Startup Founder",
                "Student Portfolio",
                "Creative Showcase",
                "Minimal Resume",
                "Agency Portfolio",
              ].map((category) => (
                <div
                  key={category}
                  className="hover:shadow-xl cursor-pointer shadow-sm rounded-lg bg-white transition-all duration-200 hover:scale-105"
                >
                  <div className="py-6 text-center font-medium text-gray-900">
                    {category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ecommes */}
      {/* <Card /> */}
      <PortfoiloCard />

      {/* <PriceCard />
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
        <p className="mt-4 text-lg text-gray-600">
          Meet the people behind our success .
        </p>
        <Peoples />
      </div> */}
      <div className="flex justify-center items-center pb-4 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <VerstionChange />
        </div>
      </div>
      {/* <div className="flex justify-center items-center pb-4 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Download Our App</h2>
          <DownloadApk />
        </div>
      </div>

       <div className="flex justify-center items-center pb-4 bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Download Our Photo Share App</h2>
          <DownloadApkShareMyInterst />
        </div>
      </div> */}

      <Footer />
    </>
  );
}
