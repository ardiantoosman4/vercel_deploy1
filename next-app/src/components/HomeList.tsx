"use client";
import Product from "@/components/Product";
import React from "react";
import { ProductModel } from "@/db/models/Product";
import { getWishlistProductId } from "@/db/helpers/getWishlistProductId";
import { useState, useEffect } from "react";
import { getWishlistProduct } from "@/db/helpers/getWishlistProduct";
import Link from "next/link";
import { URL_DATA } from "@/CONSTANT";

export default function HomeList() {
  const [dataProducts, setDataProducts] = useState<ProductModel[]>([]);
  let [page, setPage] = useState(1);
  let [wishlist, setWishlist] = useState<any[]>([]);
  let [fetchWishlist, setFetchWishlist] = useState(0);

  useEffect(() => {
    getNeedData();
  }, [fetchWishlist]);

  async function getNeedData() {
    let response = await fetch(URL_DATA + "/api/products?page=1", {
      cache: "no-store",
    });
    let data = await response.json();
    setDataProducts(data.dataProducts);
    let dataWishlist = await getWishlistProductId();
    setWishlist(dataWishlist);
  }

  return (
    <div className="bg-[url('https://media.istockphoto.com/id/1438638998/vector/beautiful-watercolor-style-background-illustration.jpg?s=612x612&w=0&k=20&c=2ChLNza-4hzn1b_neq0bMfGWlmoQ0cYLyVObkqsBK4U=')] w-full h-screen bg-cover bg-center bg-no-repeat">
      <div className="mx-auto my-10 max-w-2xl lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Latest Products
        </h1>
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 my-10">
          {dataProducts.map((el, index) => {
            if (index < 4) {
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
            }
          })}
        </div>
        <Link href="/products">
          <p className="flex-1 bg-white text-slate-800 rounded-full text-center py-2 font-bold border-solid border-2 border-slate-300 hover:bg-slate-200">See All Products</p>
        </Link>
      </div>
    </div>
  );
}
