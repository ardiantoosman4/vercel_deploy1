import jwt from "jsonwebtoken";
import * as jose from "jose";
import { ObjectId } from "mongodb";
const secret = process.env.JWT_SECRET as string;

type PayloadToken = {
  _id: ObjectId;
  email: string;
  username: string;
};
export function createToken(payload: PayloadToken) {
  return jwt.sign(payload, secret);
}

export async function decodeToken(token: string) {
  const secretEncode = new TextEncoder().encode(secret);
  const { payload } = await jose.jwtVerify(token, secretEncode);
  return payload;
}
module.exports = { createToken, decodeToken };
