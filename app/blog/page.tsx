import Footer from "@/components/Footer";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";
import Image from "next/image";

const posts = [
  {
    id: 1,
    title: "The Ultimate Guide to Saving Money with Rentals",
    href: "#",
    description:
      "Renting helps you avoid big upfront costs while getting access to premium tools, electronics, and home equipment.",
    date: "Jan 12, 2025",
    datetime: "2025-01-12",
    category: { title: "Rental", href: "#" },
    author: {
      name: "Mithun K J",
      role: "Founder / Full-Stack Developer",
      href: "#",
      imageUrl:
        "https://lh3.googleusercontent.com/ogw/AF2bZyicwzZyGJ7UWIpP5UWsoMc-K5juACOF4bx7Qt-DfF2cX_I=s32-c-mo",
    },
  },
  {
    id: 2,
    title: "How to Sell Your Used Products Faster: Pro Tips",
    href: "#",
    description:
      "Simple tricks like better photography, honest descriptions, and the right pricing can help you sell pre-owned items quickly.",
    date: "Jan 05, 2025",
    datetime: "2025-01-05",
    category: { title: "Resale", href: "#" },
    author: {
      name: "Kiran",
      role: "Co-Founder / Product Lead",
      href: "#",
      imageUrl:
        "https://lh3.googleusercontent.com/ogw/AF2bZyicwzZyGJ7UWIpP5UWsoMc-K5juACOF4bx7Qt-DfF2cX_I=s32-c-mo",
    },
  },
  {
    id: 3,
    title: "Top 10 Best-Selling Items on Our Marketplace",
    href: "#",
    description:
      "A look at the most popular new, used, and rental items customers are loving right now.",
    date: "Dec 20, 2024",
    datetime: "2024-12-20",
    category: { title: "Sale", href: "#" },
    author: {
      name: "Pavan",
      role: "Content Strategist",
      href: "#",
      imageUrl:
        "https://lh3.googleusercontent.com/ogw/AF2bZyicwzZyGJ7UWIpP5UWsoMc-K5juACOF4bx7Qt-DfF2cX_I=s32-c-mo",
    },
  },
  {
    id: 4,
    title: "Why Buying Pre-Owned Is a Smart & Sustainable Choice",
    href: "#",
    description:
      "Pre-owned products are affordable, reliable, and eco-friendly. Here’s why resale is becoming a growing trend.",
    date: "Nov 30, 2024",
    datetime: "2024-11-30",
    category: { title: "Resale", href: "#" },
    author: {
      name: "Asha",
      role: "Sustainability Analyst",
      href: "#",
      imageUrl:
        "https://lh3.googleusercontent.com/ogw/AF2bZyicwzZyGJ7UWIpP5UWsoMc-K5juACOF4bx7Qt-DfF2cX_I=s32-c-mo",
    },
  },
  {
    id: 5,
    title: "How Our Marketplace Works: Buy, Sell & Rent Easily",
    href: "#",
    description:
      "A complete walkthrough of how our platform simplifies shopping across sale, resale, and rental categories.",
    date: "Nov 10, 2024",
    datetime: "2024-11-10",
    category: { title: "Guide", href: "#" },
    author: {
      name: "Ganesh",
      role: "Front-End Developer",
      href: "#",
      imageUrl:
        "https://lh3.googleusercontent.com/ogw/AF2bZyicwzZyGJ7UWIpP5UWsoMc-K5juACOF4bx7Qt-DfF2cX_I=s32-c-mo",
    },
  },
];

export default function Example() {
  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />

      <div className="bg-white  sm:py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between rounded-md shadow-sm p-3"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <Image
                    alt=""
                    width={100}
                    height={100}
                    // src={post.author.imageUrl}
                    src={"/profile.svg"}
                    className="size-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
