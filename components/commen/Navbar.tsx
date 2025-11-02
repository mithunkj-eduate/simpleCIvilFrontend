/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import icon from "@/assets/icon.png";
import { LicenseTypes, UserType } from "@/utils/enum.types";
import { AppContext } from "@/context/context";
import Link from "next/link";

interface NavProps {
  NavType: LicenseTypes;
  AdminDashboard?: boolean;
  className?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ NavType, className }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [items, setItems] = useState<
    { name: string; href: string; current: boolean }[]
  >([]);

  const { state } = useContext(AppContext);
  const Navigation = useMemo(
    () => [
      { name: "Home", href: "/", current: true },
      { name: "Product", href: "/products", current: false },
      // { name: "Contact", href: "/contactus", current: false },
      // { name: "Marketplace", href: "#", current: false },
      { name: "Company", href: "/aboutus", current: false },
      { name: "Blog", href: "/blog", current: false },

      state.user && state.user.id
        ? { name: "Orders", href: "/orders", current: false }
        : { name: "", href: "", current: false },
      state.user &&
      (state.user.role === UserType.ADMIN ||
        state.user.role === UserType.PICE_WORKER ||
        state.user.role === UserType.PROJECT_MANAGER ||
        state.user.role === UserType.RESELLER ||
        state.user.role === UserType.SELLER ||
        state.user.role === UserType.SYSTEM_ADMIN)
        ? { name: "Console", href: "/console", current: false }
        : state.user && state.user.role === UserType.RAIDER
        ? { name: "Console", href: "/dashboard", current: false }
        : { name: "", href: "", current: false },
    ],
    [state.user]
  );

  const ConsoleNavigation = useMemo(
    () => [
      { name: "Dashboard", href: "/console", current: true },
      { name: "Stores", href: "/console/stores", current: false },
      { name: "Users", href: "/console/users", current: false },
      { name: "Products", href: "/console/products", current: false },
      { name: "Orders", href: "/console/orders", current: false },
      { name: "Categories", href: "/console/categories", current: false },
      { name: "Payments", href: "/console/payments", current: false },
    ],
    []
  );

  const ConsoleDelveryBoyNavigation = useMemo(
    () => [
      { name: "Dashboard", href: "/dashboard", current: true },
      { name: "Orders", href: "/dashboard/orders", current: false },
    ],
    []
  );

  useEffect(() => {
    if (NavType === LicenseTypes.ADMIN && state.user) {
      setItems(ConsoleNavigation);
    } else if (NavType === LicenseTypes.USER) {
      setItems(Navigation);
    } else if (NavType === LicenseTypes.RAIDER) {
      setItems(ConsoleDelveryBoyNavigation);
    } else if (NavType === LicenseTypes.NONE) {
      setItems([]);
    }
  }, [NavType, Navigation, ConsoleNavigation]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              alt=""
              src={icon ? icon : ""} // Adjust the path to your logo
              className="h-8 w-auto"
              width={32} // Adjust width as needed
              height={32} // Adjust height as needed
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
                `text-sm/6 font-semibold text-gray-900`
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
              href="/cart"
              className={classNames(
                className ? className : "",
                "text-sm/6 font-semibold text-gray-900 me-2"
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
            href="/login"
            className={classNames(
              className ? className : "",
              "text-sm/6 font-semibold text-gray-900"
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
              <Image
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
                width={32} // Adjust width as needed
                height={32} // Adjust height as needed
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
                  href="/cart"
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
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/signup"
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
