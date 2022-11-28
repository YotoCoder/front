import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Menudrop from "./Menudrop";

import Menuliga from "./Menuliga";
import Usermenu from "./Usermenu";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [session, setSession] = useState(false);

  useEffect(() => {
    window.localStorage.getItem("token") ? setSession(true) : setSession(false);
  }, []);

  return (
    <div>
      <nav className="bg-[#202225]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <img
                    className="h-16 w-16"
                    src="../images/escudo.png"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className={`${
                      router.pathname == "/"
                        ? "border-b-[2px] border-select"
                        : ""
                    } hover:bg-yellow-700 text-white px-3 py-2  text-sm font-medium`}
                  >
                    Home
                  </Link>

                  <div className="relative z-[1000]">
                    <Menudrop />
                  </div>

                  <div className="relative z-[1000]">
                    <Menuliga />
                  </div>

                  <Link
                    href="/sponsors"
                    className={`${
                      router.pathname == "/sponsors"
                        ? "border-b-[2px] border-select"
                        : ""
                    } hover:bg-yellow-700 text-white px-3 py-2  text-sm font-medium`}
                  >
                    Sponsors
                  </Link>

                  <Link
                    href="/contacto"
                    className={`${
                      router.pathname == "/contacto"
                        ? "border-b-[2px] border-select"
                        : ""
                    } hover:bg-yellow-700 text-white px-3 py-2  text-sm font-medium`}
                  >
                    Contacto
                  </Link>

                  <Link
                    href="/nosotros"
                    className={`${
                      router.pathname == "/nosotros"
                        ? "border-b-[2px] border-select"
                        : ""
                    } hover:bg-yellow-700 text-white px-3 py-2  text-sm font-medium`}
                  >
                    Nosotros
                  </Link>
                </div>
              </div>
              <div className="absolute z-[2000] right-10">
                {session ? (
                  <div className="">
                    <Usermenu />
                  </div>
                ) : (
                  <Link
                    href="/user/login"
                    className="text-white flex items-center justify-center hover:bg-yellow-700 px-3 py-2  text-base font-medium gap-2"
                  >
                    Login
                    <img src="../icons/user.svg" className="w-4 lg:w-8" />{" "}
                  </Link>
                )}
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className=" inline-flex items-center justify-center m-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-300 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/"
                  className={`${
                    router.pathname == "/" ? "bg-yellow-700 w-full" : ""
                  } text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Home
                </Link>

                <Link
                  href="/nosotros"
                  className={`${
                    router.pathname == "/nosotros" ? "bg-yellow-700 w-full" : ""
                  } text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Nosotros
                </Link>

                <div className="relative z-[1005]">
                  <Menudrop />
                </div>

                <div className="relative z-[1000]">
                  <Menuliga />
                </div>

                <Link
                  href="/sponsors"
                  className={`${
                    router.pathname == "/sponsors" ? "bg-yellow-700 w-full" : ""
                  } text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Sponsors
                </Link>

                <Link
                  href="/contacto"
                  className={`${
                    router.pathname == "/contacto" ? "bg-yellow-700 w-full" : ""
                  } text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Contacto
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Nav;
