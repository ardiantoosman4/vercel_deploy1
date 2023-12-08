import { URL_DATA } from "@/CONSTANT";
import { WishType } from "@/app/api/wishlist/route";
import { getCookie } from "cookies-next";

export async function getWishlistProduct() {
  let arrProductId: any[] = [];
  if (getCookie("userId")) {
    const responseWishlist = await fetch(URL_DATA + "/api/wishlist", {
      cache: "no-store",
    });
    let result = (await responseWishlist.json()) as { wishlist: WishType[] };
    arrProductId = result.wishlist?.map((el) => el.productDetails);
  }
  return arrProductId;
}
