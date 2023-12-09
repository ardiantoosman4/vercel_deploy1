"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { addWishHandler } from "@/actions/AddWishHandler";
import { ProductModel } from "@/db/models/Product";
import { ObjectId } from "mongodb";
import { removeWishHandler } from "@/actions/removeWishHandler";
import { getCookie } from "cookies-next";
import swal from "sweetalert";
import { rupiahFormat } from "@/db/helpers/currency";


export default function Product({
  data,
  wishlist,
  setFetchWishlist,
  setPage,
  setDataProducts,
}: {
  data: ProductModel;
  wishlist: any[];
  setFetchWishlist: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDataProducts: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (getCookie("userId")) {
      setIsLogin(true);
    }
  }, []);

  function handleClickRemove(_id: string) {
    if (isLogin) {
      swal("Success", "Success remove item from wishlist", "success");
      removeWishHandler(_id);
      setFetchWishlist((prev) => prev + 1);
      setPage(1);
      setDataProducts([]);
    } else {
      swal("Permision denied", "You need to login to do this action", "error");
    }
  }
  function handleClickAdd(_id: string) {
    if (isLogin) {
      swal("Success", "Success add item to wishlist", "success");
      addWishHandler(_id);
      setFetchWishlist((prev) => prev + 1);
      setPage(1);
      setDataProducts([]);
    } else {
      swal("Permision denied", "You need to login to do this action", "error");
    }
  }
  return (
    <div className="group drop-shadow-xl border rounded p-4">
      <Link href={`/products/${data.slug}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg transform object-cover transition duration-700 group-hover:scale-110">
          <img
            src={data.thumbnail}
            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Link>
      <div className="flex-1 flex-col justify-between mt-4">
        <Link href={`/products/${data.slug}`}>
          <div className="flex flex-col">
            <h3 className="text-lg text-gray-900 font-bold">{data.name}</h3>
            <p className="text-sm text-gray-700 mt-4">{data.excerpt}</p>
          </div>
        </Link>
        <div className="flex justify-between items-center mt-4">
          {wishlist && wishlist.includes(data._id) ? (
            <button
              onClick={() => handleClickRemove(data._id)}
              className="self-end drop-shadow-sm rounded-full border bg-red-800 px-4 py-2 text-sm text-center text-gray-300 hover:bg-slate-950 hover:text-white"
            >
              Remove Wish
            </button>
          ) : (
            <button
              onClick={() => handleClickAdd(data._id)}
              className="self-end drop-shadow-sm rounded-full border bg-slate-800 px-4 py-2 text-sm text-center text-gray-300 hover:bg-slate-950 hover:text-white"
            >
              Add Wishlist
            </button>
          )}
          <p className="text-sm text-gray-900 font-semibold">{rupiahFormat(data.price)}</p>
        </div>
      </div>
    </div>
  );
}
