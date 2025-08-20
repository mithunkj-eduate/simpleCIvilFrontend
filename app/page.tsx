"use client";
import Card from "@/components/Card";
import HeroSection from "@/components/HeroSection";
import Peoples from "@/components/Peoples";
import PriceCard from "@/components/PriceCard";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";

export default function Home() {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      <HeroSection />
      <Card />
      <PriceCard />
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
        <p className="mt-4 text-lg text-gray-600">
          Meet the people behind our success.
        </p>
        <Peoples />
      </div>
    </>
  );
}
