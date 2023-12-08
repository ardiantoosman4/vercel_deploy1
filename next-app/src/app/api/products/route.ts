import { getSearchProduct } from "@/db/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let search = searchParams.get("search");
  if (!search) {
    search = "";
  }
  let page = Number(searchParams.get("page"));
  if (!page) {
    page = 1;
  }
  const limit = 8;
  const skip = (page - 1) * limit;
  const result = await getSearchProduct(search, skip, limit);

  return NextResponse.json(
    {
      dataProducts: result.data,
      hasMore: result.hasMore,
    },
    { status: 200 }
  );
}
