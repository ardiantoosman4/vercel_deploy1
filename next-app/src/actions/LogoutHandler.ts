"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogoutHandler() {
  cookies().get("userId") && cookies().delete("userId");
  cookies().get("Authorization") && cookies().delete("Authorization");
  redirect("/login");
}
