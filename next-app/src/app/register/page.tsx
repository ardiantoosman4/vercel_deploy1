import { URL_DATA } from "@/CONSTANT";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Register() {
  async function registerAction(formData: FormData) {
    "use server";
    // ambil data
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    // masuk route
    const response = await fetch(URL_DATA + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const res = await response.json();
    console.log(res, 'register page,"<<<<<<<<<<<<<<');
    if (!response.ok) {
      return redirect("/register?error=" + res.message);
    }

    return redirect("/login");
  }
  return (
    <section className="font-poppins h-screen w-full bg-slate-900">
      <div className="flex items-center justify-center h-screen mx-auto max-w-7xl">
        <div className="flex-1">
          <div className="flex flex-wrap">
            <div className="w-full py-6 bg-gray-950 shadow-md lg:py-7 lg:w-1/2 rounded-l-xl">
              <div className="max-w-md mx-auto">
                <div className="px-4 my-7">
                  <h2 className="my-7 text-4xl font-bold text-center text-gray-100">
                    Create New Account
                  </h2>
                  <form action={registerAction}>
                    <div className="relative flex items-center my-7">
                      <input
                        name="username"
                        type="text"
                        className="w-full py-4 rounded-lg px-7 text-gray-300 bg-gray-800"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="my-7">
                      <input
                        name="email"
                        type="email"
                        className="w-full py-4 rounded-lg px-7 text-gray-300 bg-gray-800"
                        placeholder="Your email"
                        required
                      />
                    </div>

                    <div className="relative flex items-center my-7">
                      <input
                        name="password"
                        type="password"
                        className="w-full py-4 rounded-lg px-7 text-gray-300 bg-gray-800"
                        placeholder="password"
                        required
                      />
                    </div>

                    <button
                      className="w-full py-4 my-5 font-semibold text-gray-300 bg-green-600 rounded-lg px-7 hover:text-blue-200"
                      type="submit"
                    >
                      Register
                    </button>
                    <p className="text-sm text-gray-400 my-7">
                      Already have an account?
                      <Link
                        href="/login"
                        className="ms-1 text-sm font-semibold text-blue-400 hover:text-blue-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
            <div className="relative items-center justify-center hidden w-full lg:flex lg:w-1/2">
              <div className="absolute inset-0 z-10 opacity-60">
                <img
                  className="absolute inset-0 z-0 object-cover w-full h-full ml-auto rounded-r-xl"
                  src="./bg-login.jpg"
                />
              </div>
              <div className="top-0 z-10 max-w-xl mx-auto mb-12 text-center">
                <h2 className="mb-4 text-4xl font-bold text-indigo-100">
                  Welcome to Smart Store
                </h2>
                <div className="max-w-lg mx-auto mb-6">
                  <p className="pt-6 font-medium text-indigo-100">
                    A reliable solution to find the best smartphone at the
                    lowest price
                  </p>
                </div>
                <Link
                  href="/products"
                  className="inline-block px-6 py-2 rounded-lg font-medium bg-green-600 text-gray-300"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
