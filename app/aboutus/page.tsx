import Footer from "@/components/Footer";
import NavBar from "@/components/commen/Navbar";
import { LicenseTypes, PageForNav } from "@/utils/enum.types";
import Image from "next/image";

const links = [
  {
    name: "Buy New",
    text: "Shop high-quality new products from verified vendors.",
    href: "#",
  },
  {
    name: "Resale Marketplace",
    text: "Find budget-friendly pre-owned items in great condition.",
    href: "#",
  },
  {
    name: "Rent Anything",
    text: "Short and long-term rentals with flexible plans.",
    href: "#",
  },
];
const stats = [
  { name: "Offices worldwide", value: "12" },
  { name: "Full-time colleagues", value: "300+" },
  { name: "Hours per week", value: "40" },
  { name: "Paid time off", value: "Unlimited" },
];

export default function Example() {
  return (
    <>
      <NavBar NavType={LicenseTypes.USER} pageForNav={PageForNav.aboutus} />

      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        {/* <Image
          width={500}
          height={500}
          alt="/"
          src="/"
          // src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        /> */}
        <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              About Us
            </h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
              Your all-in-one marketplace for buying, selling, and renting
              products with trust and convenience.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="bg-gray-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-3xl font-semibold mb-10">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Buy New",
                  text: "Shop high-quality new products from verified vendors.",
                },
                {
                  title: "Resale Marketplace",
                  text: "Find budget-friendly pre-owned items in great condition.",
                },
                {
                  title: "Rent Anything",
                  text: "Short and long-term rentals with flexible plans.",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="shadow-md hover:shadow-lg transition">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            {/* <section className="max-w-6xl mx-auto px-6 py-16"> */}
            <h2 className="text-3xl font-semibold mb-10">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Verified Sellers",
                "Secure Payments",
                "Fast Delivery & Pickup",
                "Transparent Pricing",
                "Easy Returns",
                "24/7 Customer Support",
              ].map((text, idx) => (
                <div key={idx} className="shadow-sm">
                  <div className="p-6 text-center text-lg font-medium">
                    {text}
                  </div>
                </div>
              ))}
            </div>
            {/* </section> */}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 text-lg">
              <li>🌱 Sustainability — Reduce waste through resale & rentals</li>
              <li>🤝 Trust — Verified users and secure transactions</li>
              <li>💡 Innovation — Built for a modern, flexible lifestyle</li>
              <li>📞 Reliability — Always available to support you</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Join */}
      <section className="bg-gray-100 mt-10 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-gray-700 text-lg mb-6">
            Become part of a fast-growing marketplace where you can buy, sell,
            and rent with confidence.
          </p>
          <a
            href="/signup"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
