import { addWishlist, getWishlist, removeWishlist } from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { type } from "os";

export type WishType = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
  productDetails: {
    _id: ObjectId;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  };
};
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("userId");
  const userId = cookie?.value as string;
  const wishlist = (await getWishlist(userId)) as WishType[];
  return NextResponse.json({ wishlist }, { status: 200 });
}
export async function POST(req: NextRequest) {
  const data: { productId: string } = await req.json();
  const cookie = req.cookies.get("userId");
  const userId = cookie?.value;
  if (!userId) {
    return NextResponse.json(
      {
        message: "Need login to add wishlist",
      },
      { status: 403 }
    );
  }

  const wish = await addWishlist(userId, data.productId);
  return NextResponse.json(
    {
      message: "success add wishlist",
    },
    { status: 201 }
  );
}

export async function DELETE(req: NextRequest) {
  const data: { productId: string } = await req.json();
  const cookie = req.cookies.get("userId");
  const userId = cookie?.value;
  if (!userId) {
    return NextResponse.json(
      {
        message: "Need login to remove wishlist",
      },
      { status: 403 }
    );
  }
  const wish = await removeWishlist(userId, data.productId);
  return NextResponse.json(
    {
      message: "success add wishlist",
    },
    { status: 201 }
  );
}
