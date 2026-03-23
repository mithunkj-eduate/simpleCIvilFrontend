"use client";
import Card from "@/components/Card";
import DownloadApk from "@/components/DownloadApk";
import DownloadApkShareMyInterst from "@/components/DownloadApkShareMyInterst";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import VerstionChange from "@/components/VerstionChange";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";

export default function Home() {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      <HeroSection />
      <h1>Mithun new build</h1>
      <h1>Mithun new build new build two</h1>

      {/* ⭐ Categories */}
      <div className="bg-gray-50">
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
      </div>
      <Card />

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
      <div className="flex justify-center items-center pb-4 bg-gray-100">
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
      </div>

      <Footer />
    </>
  );
}
