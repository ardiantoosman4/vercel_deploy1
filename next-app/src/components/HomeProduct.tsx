import React from "react";

export default function HomeProduct() {
  return (
    <div className="max-w-screen-xl mx-auto w-full p-4 mt-20">
      <ul className="grid gap-4 md:grid-cols-2">
        <li style={{ opacity: 1 }}>
          <a
            className="group relative block h-80 w-full overflow-hidden rounded-md"
            href="/search?categories=womens-clothing"
          >
            <img
              alt="All Product"
              decoding="async"
              data-nimg="fill"
              className="transform object-cover transition duration-700 group-hover:scale-110 rounded-2xl"
              src="./all-hero.png"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-md bg-black bg-opacity-50 p-6">
                <h2 className="mb-2 border-b-4 text-center text-3xl font-bold text-white md:text-4xl">
                  Explore All
                </h2>
              </div>
            </div>
          </a>
        </li>
        <li style={{ opacity: 1 }}>
          <a
            className="group relative block h-80 w-full overflow-hidden rounded-md"
            href="/search?categories=mens-clothing"
          >
            <img
              alt="Samsung"
              decoding="async"
              data-nimg="fill"
              className="transform object-cover transition duration-700 group-hover:scale-110 rounded-2xl"
              src="./samsung-hero.png"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-md bg-black bg-opacity-50 p-6">
                <h2 className="mb-2 border-b-4 text-center text-3xl font-bold text-white md:text-4xl">
                  Samsung
                </h2>
              </div>
            </div>
          </a>
        </li>
        <li style={{ opacity: 1 }}>
          <a
            className="group relative block h-80 w-full overflow-hidden rounded-md"
            href="/search?categories=electronics"
          >
            <img
              alt="Iphone"
              decoding="async"
              data-nimg="fill"
              className="transform object-cover transition duration-700 group-hover:scale-110 rounded-2xl"
              src="./iphone-hero-2.png"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-md bg-black bg-opacity-50 p-6">
                <h2 className="mb-2 border-b-4 text-center text-3xl font-bold text-white md:text-4xl">
                  Iphone
                </h2>
              </div>
            </div>
          </a>
        </li>
        <li style={{ opacity: 1 }}>
          <a
            className="group relative block h-80 w-full overflow-hidden rounded-md"
            href="/search?categories=jewelery"
          >
            <img
              alt="Xiaomi"
              decoding="async"
              data-nimg="fill"
              className="transform object-cover transition duration-700 group-hover:scale-110 rounded-2xl"
              src="./xiaomi-hero.png"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-md bg-black bg-opacity-50 p-6">
                <h2 className="mb-2 border-b-4 text-center text-3xl font-bold text-white md:text-4xl">
                  Xiaomi
                </h2>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
