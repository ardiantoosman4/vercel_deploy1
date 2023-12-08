import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = cookies().get("Authorization");
  if (!auth) {
    return redirect("/login");
  }
  return <>{children}</>;
}
