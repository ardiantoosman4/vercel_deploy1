import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import ProtectedPage from "@/components/ProtectedPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartStore Wishlist",
  description:
    "User's smartphone wishlist, contain all product that user want to buy",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <ProtectedPage>
        <Navbar />
        {children}
      </ProtectedPage>
    </section>
  );
}
