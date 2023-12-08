"use server";
import { URL_DATA } from "@/CONSTANT";
import { cookies } from "next/headers";

export async function removeWishHandler(productId: string) {
  const response = await fetch(URL_DATA + "/api/wishlist", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({
      productId,
    }),
  });
}
