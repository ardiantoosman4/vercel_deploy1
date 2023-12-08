"use client";
import Product from "@/components/Product";
import SearchProduct from "@/components/SearchProduct";
import React from "react";
import { URL_DATA } from "@/CONSTANT";
import { ProductModel } from "@/db/models/Product";
import { getWishlistProductId } from "@/db/helpers/getWishlistProductId";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products() {
  const [dataProducts, setDataProducts] = useState<ProductModel[]>([]);
  let [wishlist, setWishlist] = useState<any[]>([]);
  let [fetchWishlist, setFetchWishlist] = useState(0);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getNeedData();
  }, [page, search, fetchWishlist]);

  async function getNeedData() {
    let response = await fetch(
      URL_DATA + `/api/products?search=${search}&page=${page}`,
      {
        cache: "no-store",
      }
    );
    let data = await response.json();
    setDataProducts([...dataProducts, ...data.dataProducts]);
    setHasMore(data.hasMore);

    let dataWishlist = await getWishlistProductId();
    setWishlist(dataWishlist);
  }

  const fetchMoreData = () => {
    setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  };

  return (
    <div className="mx-auto my-10 max-w-2xl lg:max-w-7xl">
      <div className="mb-10 flex justify-between items-center">
        <h1 className="font-bold text-3xl">Products Collection</h1>
        <SearchProduct
          setSearch={setSearch}
          setPage={setPage}
          setDataProducts={setDataProducts}
        />
      </div>
      <InfiniteScroll
        dataLength={dataProducts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="text-xl font-bold mt-6 text-center text-red-600">
            Loading...
          </div>
        }
        endMessage={
          <div className="text-xl font-bold mt-6 text-center text-red-600">
            No More Item
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {dataProducts.map((el) => {
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
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
