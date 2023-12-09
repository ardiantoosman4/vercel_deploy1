"use client";

import React from "react";
import swal from "sweetalert";
import { useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';

export default function NotifComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname()
  const errorMessage = searchParams.get("error");
  if (errorMessage) {
    swal("Error", errorMessage, "error");
    router.push(pathName)
  }
  return <></>;
}
