import {
  getUserByEmail,
  getUserByUsername,
  registerUser,
} from "@/db/models/Users";
import { NextResponse } from "next/server";
import { z } from "zod";

type inputRegister = {
  username: string;
  email: string;
  password: string;
};

const RegisterSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .min(5, { message: "username length must be 5 or greater" }),
  email: z
    .string({ required_error: "emails is required" })
    .email({ message: "invalid email format" }),
  password: z
    .string({ required_error: "password is required" })
    .min(5, { message: "password length must be 5 or greater" }),
});

export async function POST(req: Request) {
  try {
    const data: inputRegister = await req.json();
    const registerParsed = RegisterSchema.safeParse(data);
    if (!registerParsed.success) {
      return NextResponse.json(
        { message: registerParsed.error.errors[0].message },
        { status: 400 }
      );
    }
    // email already exist
    let user = await getUserByEmail(data.email);
    if (user) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    }
    user = await getUserByUsername(data.username);
    if (user) {
      return NextResponse.json(
        { message: "Username already exist" },
        { status: 400 }
      );
    }

    const newUser = await registerUser(data);

    return NextResponse.json(
      { message: "Success create new user" },
      { status: 201 }
    );
  } catch (error) {
    let message = "Internal Server Error";
    let status = 500;
    if (error instanceof z.ZodError) {
      message = `${error.issues[0].message}`;
      status = 400;
    }
    return NextResponse.json({ message }, { status });
  }
}
