import { Db, ObjectId } from "mongodb";
import { getDB } from "../config";
const COLLECTION_NAME = "Products";
const db: Db = getDB();

export interface ProductModel {
  _id: string;
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
}

export const getProducts = async (): Promise<ProductModel[]> => {
  const products = await db
    .collection(COLLECTION_NAME)
    .find<ProductModel>({})
    .toArray();
  return products;
};

export async function getSearchProduct(
  search: string,
  skip: number,
  limit: number
) {
  try {
    const regex = new RegExp(search, "i");
    const data = await db
      .collection(COLLECTION_NAME)
      .find({ name: regex })
      .skip(skip)
      .limit(limit)
      .toArray();
    const totalItems = await db
      .collection(COLLECTION_NAME)
      .find({ name: regex })
      .toArray();

    return { data, hasMore: skip + limit < totalItems.length } ;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getProductBySlug = async (slug:string): Promise<ProductModel|null> => {
  try {
    const product = await db
      .collection(COLLECTION_NAME)
      .findOne<ProductModel>({slug});
    return product;
  } catch (error) {
    throw error;
  }
};