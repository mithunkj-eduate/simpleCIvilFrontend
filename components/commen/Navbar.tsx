/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import icon from "@/assets/icon.png";
import { LicenseTypes, PageForNav, UserType } from "@/utils/enum.types";
import { AppContext } from "@/context/context";
import Link from "next/link";
import { payloadTypes } from "@/context/reducer";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [items, setItems] = useState<
    { name: string; href: string; current: boolean }[]
  >([]);

  const { state, dispatch } = useContext(AppContext);
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

  const LogoutFun = () => {
    localStorage.setItem("token", "");
    Cookies.remove("token");
    dispatch({
      type: payloadTypes.SET_USER,
      payload: { user: null },
    });
  };

  // remove ?v=2 before compare
  const isActive = (href: string) => {
    const cleanHref = href.split("?")[0];
    return pathname === cleanHref;
  };

  const Navigation = useMemo(() => {
    const items = [
      { name: "Home", href: `/?v=${state.version}`, current: true },
      { name: "Product", href: `/products?v=${state.version}`, current: false },
      // { name: "Contact", href: "/contactus", current: false },
      // { name: "Marketplace", href: "#", current: false },
      { name: "Company", href: `/aboutus?v=${state.version}`, current: false },
      { name: "Blog", href: `/blog?v=${state.version}`, current: false },
      { name: "Wallet", href: `/wallet?v=${state.version}`, current: false },
      { name: "Games", href: `/games?v=${state.version}`, current: false },
      {
        name: "Portpolio",
        href: `/portfolio?v=${state.version}`,
        current: false,
      },
    ];

    if (state.user?.id) {
      items.push({
        name: "Orders",
        href: `/orders?v=${state.version}`,
        current: false,
      });
    }

    if (state.user?.id) {
      items.push({
        name: "Profile",
        href: `/profile?v=${state.version}`,
        current: false,
      });
    }
    if (
      state.user &&
      state.user.role &&
      [
        UserType.ADMIN,
        UserType.PICE_WORKER,
        UserType.PROJECT_MANAGER,
        UserType.RESELLER,
        UserType.SELLER,
        UserType.SYSTEM_ADMIN,
        UserType.FARMER,
      ].includes(state.user.role as UserType)
    ) {
      items.push({
        name: "Console",
        href: `/console?v=${state.version}`,
        current: false,
      });
    }

    if (state.user && state.user?.role === UserType.RAIDER) {
      items.push({
        name: "Console",
        href: `/dashboard?v=${state.version}`,
        current: false,
      });
    }

    if (
      state.user &&
      state.user.role &&
      [UserType.ADMIN, UserType.SYSTEM_ADMIN, UserType.FARMER].includes(
        state.user.role as UserType,
      )
    ) {
      items.push({
        name: "Farmer",
        href: `/farmer/dashboard?v=${state.version}`,
        current: false,
      });
    }

    return items;
  }, [state.user, state.version]);

  const ConsoleNavigation = useMemo(() => {
    const items = [
      { name: "Dashboard", href: `/console?v=${state.version}`, current: true },
      {
        name: "Stores",
        href: `/console/stores?v=${state.version}`,
        current: false,
      },
      // { name: "Categories", href: "/console/categories", current: false },

      {
        name: "Products",
        href: `/console/products?v=${state.version}`,
        current: false,
      },
      {
        name: "Orders",
        href: `/console/orders?v=${state.version}`,
        current: false,
      },
      {
        name: "Payments",
        href: `/console/payments?v=${state.version}`,
        current: false,
      },
    ];

    if (
      state.user &&
      state.user.role &&
      [UserType.ADMIN, UserType.SYSTEM_ADMIN].includes(
        state.user.role as UserType,
      )
    ) {
      items.push(
        {
          name: "Users",
          href: `/console/users?v=${state.version}`,
          current: false,
        },

        {
          name: "Categories",
          href: `/console/categories?v=${state.version}`,
          current: false,
        },
      );
    }

    return items;
  }, [state.user, state.version]);

  const ConsoleDelveryBoyNavigation = useMemo(
    () => [
      {
        name: "Dashboard",
        href: `/dashboard?v=${state.version}`,
        current: true,
      },
      {
        name: "Orders",
        href: `/dashboard/orders?v=${state.version}`,
        current: false,
      },
      // { name: "Map", href: "/dashboard/routemap", current: false },
    ],
    [state.version],
  );
  console.log(state.version);
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
  }, [
    NavType,
    Navigation,
    ConsoleNavigation,
    state.user,
    ConsoleDelveryBoyNavigation,
    state.version,
  ]);

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
                isActive(item.href)
                  ? "text-gray-600 border-b-2 border-gray-600"
                  : "text-gray-900 hover:text-gray-600",
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
              href={`/cart?v=${state.version}`}
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

          {state.user ? (
            <a
              href="/?v=2"
              className={classNames(
                className ? className : "",
                "text-sm/6 font-semibold text-gray-900",
              )}
              onClick={LogoutFun}
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <a
              href={`/login?v=${state.version}`}
              className={classNames(
                className ? className : "",
                "text-sm/6 font-semibold text-gray-900",
              )}
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
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
                onClick={() => router.push("/?v=2")}
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
                    // className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    className={classNames(
                      className ? className : "",
                      "block rounded-lg px-3 py-2 font-semibold",
                      isActive(item.href)
                        ? "bg-gray-100 text-gray-700"
                        : "hover:bg-gray-50",
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={`/cart?v=${state.version}`}
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
                {state.user ? (
                  <a
                    href="/?v=2"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={LogoutFun}
                  >
                    Log out
                  </a>
                ) : (
                  <a
                    href={`/login?v=${state.version}`}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                )}
              </div>
              <div className="py-6">
                <a
                  href={`/signup?v=${state.version}`}
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
