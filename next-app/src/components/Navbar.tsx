"use client";
import LogoutHandler from "@/actions/LogoutHandler";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

export default function Navbar() {
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (getCookie("userId")) {
      setIsLogin(true);
    }
  }, []);
  let activeLinkStyle =
    "bg-slate-950 text-white rounded-md px-3 py-2 text-sm font-medium";
  let normalLinkStyle =
    "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
  return (
    <nav className="bg-slate-900 relative">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/*Icon when menu is closed. Menu open: "hidden", Menu closed: "block"*/}

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              {/*Icon when menu is open. Menu open: "block", Menu closed: "hidden"*/}

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:flex sm:flex-shrink-0 items-center">
              <img
                className="h-12 w-auto rounded-full"
                src="logo.png"
                alt="SmartStore"
              />
            </div>
            <div className="hidden sm:flex sm:ml-6 items-center">
              <div className="flex space-x-4 items-center">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link
                  href="/"
                  className={
                    pathName == "/" ? activeLinkStyle : normalLinkStyle
                  }
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={
                    pathName == "/products" ? activeLinkStyle : normalLinkStyle
                  }
                >
                  Products
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLogin ? (
              <>
                <Link href="/wishlist" className={`${normalLinkStyle} me-5`}>
                  <div className="flex justify-center items-center">
                    <div className="relative py-2 px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="file: mt-2 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => LogoutHandler()}
                  className={normalLinkStyle}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className={normalLinkStyle}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <Link
            href="/"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Products
          </Link>
          <Link
            href="/login"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
