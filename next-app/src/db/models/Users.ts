import { Db, ObjectId } from "mongodb";
import { getDB } from "../config";
import { hashPassword } from "../helpers/bycrypt";
const COLLECTION_NAME = "Users";
const db: Db = getDB();

export interface UserModel {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
}

type UserInputModel = Omit<UserModel, "_id">;
export const registerUser = async (
  newUser: UserInputModel
): Promise<UserModel> => {
  try {
    if (!newUser.username) {
      throw new Error("username required");
    }
    if (!newUser.email) {
      throw new Error("email required");
    }
    if (!newUser.password) {
      throw new Error("password required");
    }
    const newUserData = {
      ...newUser,
      password: hashPassword(newUser.password),
    };
    const { insertedId } = await db
      .collection(COLLECTION_NAME)
      .insertOne(newUserData);
    return { ...newUser, _id: insertedId };
  } catch (error) {
    throw error;
  }
};

export const getUser = async (): Promise<UserModel[]> => {
  const users = await db
    .collection(COLLECTION_NAME)
    .find({})
    .project<UserModel>({ password: 0 })
    .toArray();
  return users;
};

export const getUserByUsername = async (
  username: string
): Promise<UserModel | null> => {
  try {
    const users = await db
      .collection(COLLECTION_NAME)
      .findOne<UserModel>({ username });
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (
  email: string
): Promise<UserModel | null> => {
  try {
    const users = await db
      .collection(COLLECTION_NAME)
      .findOne<UserModel>({ email });
    return users;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string): Promise<UserModel | null> => {
  try {
    const user = await db
      .collection(COLLECTION_NAME)
      .findOne<UserModel>({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    throw error;
  }
};
