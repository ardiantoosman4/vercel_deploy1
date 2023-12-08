import { URL_DATA } from "@/CONSTANT";
import WishButton from "@/components/WishButton";
import { ProductModel, getProductBySlug } from "@/db/models/Product";
import React from "react";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = (await getProductBySlug(params.slug)) as ProductModel;
  return (
    <div className="grid grid-cols-2 h-screen items-center">
      <img
        src={product.thumbnail}
        alt="Angled front view with bag zipped and handles upright."
        className="object-cover object-center sm:rounded-lg h-3/5 mx-auto my-auto"
      />
      <div className=" max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {product.name}
        </h1>

        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">
            {product.price}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6 text-base text-gray-700">
            <p>{product.description}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="sm:flex-col1 mt-10 flex">
            <WishButton _id={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
