"use client";
import React, { useEffect, useState } from "react";

export default function ProductDetailCarousel({dataImg}:{dataImg:string[]}) {
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    let carouselInt = setInterval(() => {
      setPage((prev) => (prev + 1 >= dataImg.length ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(carouselInt);
  }, []);
  const handlePrevPage = () => {
    setPage((prev) => (prev - 1 < 0 ? dataImg.length - 1 : prev - 1));
  };
  const handleNextPage = () => {
    setPage((prev) => (prev + 1 >= dataImg.length ? 0 : prev + 1));
  };
  return (
    <div className="flex flex-col justify-center items-center h-[70%]">
      <h1 className="font-bold text-xl">
        {" "}
        {`Image ${page + 1} of ${dataImg.length}`}
      </h1>
      <div className="flex items-center justify-center h-full w-full">
        {/* Left arrow */}
        <div onClick={handlePrevPage} className="text-2x1 font-semibold">
          <span className="text-4xl text-cyan-800  inline-block cursor-pointer hover:text-slate-900">
            &lt;-
          </span>
        </div>
        <div className="w-3/5 flex justify-center bg-slate-100 p-5 rounded-lg">
          <img
            className="object-cover object-center rounded-lg"
            alt="Image"
            src={dataImg[page]}
          />
        </div>

        {/* right arrow*/}
        <div onClick={handleNextPage} className="text-2x1 font-semibold">
          <span className="text-4xl text-cyan-800  inline-block cursor-pointer hover:text-slate-900">
            -&gt;
          </span>
        </div>
      </div>
    </div>
  );
}
