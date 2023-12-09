import Link from "next/link";
import React from "react";

export default function HeroLanding() {
  return (
    <div className="flex justify-center items-center bg-[url('https://img.freepik.com/premium-photo/white-background-with-blue-background-word-white-it_207225-64.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
      <div className="flex justify-between items-center max-w-2xl lg:max-w-7xl">
        <img src="./remove-bg-1.png" alt="" />
        <div className="mx-auto max-w-2xl">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome To SmartStore
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-semibold">
              Get the latest smartphone technology at unbeatable prices.Upgrade
              your phone and your life with our cutting-edge devices. Say
              goodbye to expensive phone bills with our affordable plans
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/products"
                className="rounded-md border border-transparent bg-slate-800 px-8 py-3 text-center font-medium text-gray-200 hover:text-white hover:bg-slate-950"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        <img src="./remove-bg-2.png" alt="" />
      </div>
    </div>
  );
}
