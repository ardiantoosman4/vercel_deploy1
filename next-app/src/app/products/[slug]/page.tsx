import { URL_DATA } from "@/CONSTANT";
import WishButton from "@/components/WishButton";
import { rupiahFormat } from "@/db/helpers/currency";
import { ProductModel, getProductBySlug } from "@/db/models/Product";
import React from "react";
import Head from "next/head";
import ProductDetailCarousel from "@/components/ProductDetailCarousel";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {

  // fetch data
  const product = (await getProductBySlug(params.slug)) as ProductModel;

  return {
    title: `${params.slug} | SmartStore`,
    description: product.description,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const product = (await getProductBySlug(params.slug)) as ProductModel;
  let dataImg = product.images;
  return (
    <>
      <div className="grid grid-cols-2 h-screen items-center">
        <ProductDetailCarousel dataImg={dataImg} />
        <div className=" max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-xl font-bold text-gray-900">
              {rupiahFormat(product.price)}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6 text-base text-gray-700">
              <p>{product.excerpt}</p>
            </div>

            <div className="space-y-6 text-base text-gray-700 mt-4">
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
    </>
  );
}
