"use client";
import Product from "@/components/Product";
import React from "react";
import { ProductModel } from "@/db/models/Product";
import { getWishlistProductId } from "@/db/helpers/getWishlistProductId";
import { useState, useEffect } from "react";
import { getWishlistProduct } from "@/db/helpers/getWishlistProduct";
import Link from "next/link";

export default function Products() {
  const [dataProducts, setDataProducts] = useState<ProductModel[]>([]);
  let [page, setPage] = useState(1);
  let [wishlist, setWishlist] = useState<any[]>([]);
  let [fetchWishlist, setFetchWishlist] = useState(0);

  useEffect(() => {
    getNeedData();
  }, [dataProducts, fetchWishlist]);

  async function getNeedData() {
    let data = await getWishlistProduct();
    setDataProducts(data);
    let dataWishlist = await getWishlistProductId();
    setWishlist(dataWishlist);
  }

  return (
    <div className="mx-auto my-10 max-w-2xl lg:max-w-7xl">
      <h1 className="font-bold text-3xl">Wishlist Items</h1>
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 mt-4">
        {dataProducts.length === 0 ? (
          <div className="flex">
            <h3 className="font-semibold">No wishlist item </h3>
            <Link href={"/products"} className="ms-2 font-bold text-blue-700">
              shop now
            </Link>
          </div>
        ) : (
          dataProducts.map((el) => {
            return (
              <Product
                key={el._id}
                data={el}
                wishlist={wishlist}
                setFetchWishlist={setFetchWishlist}
                setPage={setPage}
                setDataProducts={setDataProducts}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
