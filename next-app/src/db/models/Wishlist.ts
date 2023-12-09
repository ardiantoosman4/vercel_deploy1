import { Db, ObjectId } from "mongodb";
import { getDB } from "../config";
const COLLECTION_NAME = "Wishlist";
const db: Db = getDB();

export interface WishlistModel {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
}

export async function addWishlist(userId: string, productId: string) {
  try {
    if (!userId) {
      throw new Error("userId required");
    }
    if (!productId) {
      throw new Error("productId required");
    }
    let wish = await db.collection(COLLECTION_NAME).findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });
    if (wish) {
      throw new Error("Wishlist item already exist");
    }
    let wishObj = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const data = await db.collection(COLLECTION_NAME).insertOne(wishObj);
    return { ...wishObj, _id: data.insertedId };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeWishlist(userId: string, productId: string) {
  try {
    if (!userId) {
      throw new Error("userId required");
    }
    if (!productId) {
      throw new Error("productId required");
    }
    let data = await db.collection(COLLECTION_NAME).findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });
    if (!data) {
      throw new Error("Wishlist item not exist");
    }
    await db.collection(COLLECTION_NAME).deleteOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });
    return { message: "Success delete wishlist item" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getWishlist(userId: string) {
  try {
    const data = await db
      .collection(COLLECTION_NAME)
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "Products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $set: { productDetails: { $first: "$productDetails" } } },
      ])
      .toArray();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
