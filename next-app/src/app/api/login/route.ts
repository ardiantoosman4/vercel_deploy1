import { comparePassword, hashPassword } from "@/db/helpers/bycrypt";
import { createToken } from "@/db/helpers/jwt";
import { getUserByEmail } from "@/db/models/Users";
import { NextResponse } from "next/server";
import { z } from "zod";

type inputLogin = {
  email: string;
  password: string;
};

const LoginSchema = z.object({
  email: z
    .string({ required_error: "emails is required" })
    .email({ message: "invalid email format" }),
  password: z
    .string({ required_error: "password is required" })
});
export async function POST(req: Request) {
  const data: inputLogin = await req.json();

  const loginParsed = LoginSchema.safeParse(data);
    if (!loginParsed.success) {
      return NextResponse.json(
        { message: loginParsed.error.errors[0].message },
        { status: 400 }
      );
    }

  const user = await getUserByEmail(data.email);
  if (!user) {
    return NextResponse.json(
      { message: "Invalid email/password" },
      { status: 401 }
    );
  }
  if (!comparePassword(data.password, user.password)) {
    return NextResponse.json(
      { message: "Invalid email/password" },
      { status: 401 }
    );
  }
  const token = createToken({
    _id: user._id,
    email: user.email,
    username: user.username,
  });
  return NextResponse.json(
    {
      data: {
        _id: user._id,
        email: user.email,
        username: user.username,
        access_token: token,
      },
    },
    { status: 200 }
  );
}
