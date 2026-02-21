/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import icon from "@/assets/icon.png";
import { LicenseTypes, PageForNav } from "@/utils/enum.types";
import { AppContext } from "@/context/context";
import Link from "next/link";

interface NavProps {
  NavType: LicenseTypes;
  AdminDashboard?: boolean;
  className?: string;
  pageForNav?: PageForNav;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ NavType, className, pageForNav }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [items, setItems] = useState<
    { name: string; href: string; current: boolean }[]
  >([]);

  const { state } = useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ConsoleDelveryBoyNavigation = useMemo(
    () => [
      { name: "Dashboard", href: "/farmer/dashboard?v=2", current: true },
      { name: "Trends", href: "/farmer/trends?v=2", current: false },
      { name: "Add Report", href: "/farmer/addReport?v=2", current: false },

      { name: "My Reports", href: "/farmer/myReports?v=2", current: false },

      { name: "Suggestions", href: "/farmer/suggestions?v=2", current: false },
      { name: "Crop Plan", href: "/farmer/cropPlan?v=2", current: false },

      { name: "Profile", href: "/farmer/profile?v=2", current: false },
      { name: "Analytics", href: "/farmer/analytics?v=2", current: false },
    ],
    [],
  );

  useEffect(() => {
    if (NavType === LicenseTypes.FARMER) {
      setItems(ConsoleDelveryBoyNavigation);
    } else if (NavType === LicenseTypes.NONE) {
      setItems([]);
    }
  }, [state.user, ConsoleDelveryBoyNavigation, NavType]);

  return (
    <header
      //  className="absolute inset-x-0 top-0 z-50 sticky"
      className={
        pageForNav === PageForNav.aboutus
          ? `absolute inset-x-0 top-0 z-50 sticky transition-all duration-300 bg-white`
          : `absolute inset-x-0 top-0 z-50 sticky transition-all duration-300 ${
              isScrolled ? "bg-white" : "bg-transparent"
            }`
      }
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/?v=2" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src={icon ? icon : ""} // Adjust the path to your logo
              className="h-8 w-auto"
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              // className={`text-sm/6 font-semibold text-gray-900 text-white`}
              className={classNames(
                className ? className : "",
                `text-sm/6 font-semibold text-gray-900`,
              )}
              // className={classNames(
              //   item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
              //   'block rounded-md px-3 py-2 text-base font-medium',
              // )}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {state.user && state.user.id ? (
            <Link
              href="/cart?v=2"
              className={classNames(
                className ? className : "",
                "text-sm/6 font-semibold text-gray-900 me-2",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Link>
          ) : null}

          <a
            href="/login?v=2"
            className={classNames(
              className ? className : "",
              "text-sm/6 font-semibold text-gray-900",
            )}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/signup" className="text-sm/6 font-semibold text-gray-900">
            Signup <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {/* <Image
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
                width={32} // Adjust width as needed
                height={32} // Adjust height as needed
              /> */}
              <Image
                alt=""
                src={icon ? icon : ""} // Adjust the path to your logo
                className="h-8 w-auto"
                width={200} // Adjust width as needed
                height={200} // Adjust height as needed
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="/cart?v=2"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/login?v=2"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/signup?v=2"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  SignUp
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
