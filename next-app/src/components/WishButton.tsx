"use client";
import { addWishHandler } from "@/actions/AddWishHandler";
import { removeWishHandler } from "@/actions/removeWishHandler";
import { getWishlistProductId } from "@/db/helpers/getWishlistProductId";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

export default function WishButton({ _id }: { _id: string }) {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [fetchWishlist, setFetchWishlist] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (getCookie("userId")) {
      setIsLogin(true);
    }
    getNeedData();
    console.log(fetchWishlist);
  }, [fetchWishlist]);

  async function getNeedData() {
    let dataWishlist = await getWishlistProductId();
    setWishlist(dataWishlist);
  }

  function handleClickRemove(_id: string) {
    if (isLogin) {
      swal("Success", "Success remove item from wishlist", "success");
      removeWishHandler(_id);
      setFetchWishlist((prev) => prev + 1);
    } else {
      swal("Permision denied", "You need to login to do this action", "error");
    }
  }
  function handleClickAdd(_id: string) {
    if (isLogin) {
      swal("Success", "Success add item to wishlist", "success");
      addWishHandler(_id);
      setFetchWishlist((prev) => prev + 1);
    } else {
      swal("Permision denied", "You need to login to do this action", "error");
    }
  }

  return (
    <div>
      {wishlist && wishlist.includes(_id) ? (
        <button
          onClick={() => handleClickRemove(_id)}
          className="self-end drop-shadow-sm rounded-full border bg-red-800 px-4 py-2 text-sm text-center text-gray-300 hover:bg-slate-950 hover:text-white"
        >
          Remove Wish
        </button>
      ) : (
        <button
          onClick={() => handleClickAdd(_id)}
          className="self-end drop-shadow-sm rounded-full border bg-slate-800 px-4 py-2 text-sm text-center text-gray-300 hover:bg-slate-950 hover:text-white"
        >
          Add Wishlist
        </button>
      )}
    </div>
  );
}
