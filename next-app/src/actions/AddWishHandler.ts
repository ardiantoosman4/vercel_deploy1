"use server";
import { URL_DATA } from "@/CONSTANT";
import { cookies } from "next/headers";

export async function addWishHandler(productId: string) {
  const response = await fetch(URL_DATA + "/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({
      productId,
    }),
  });
  
}
