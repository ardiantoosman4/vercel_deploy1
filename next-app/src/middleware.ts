import { decodeToken } from "@/db/helpers/jwt";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    if (req.nextUrl.pathname.startsWith("/api/wishlist")) {
      const cookie = req.cookies.get("Authorization");
      if (!cookie) {
        return NextResponse.json(
          { message: "Authentication failed" },
          { status: 401 }
        );
      }
      const token = cookie?.value.split(" ")[1];
      const payloadData = (await decodeToken(token)) as {
        _id: string;
        email: string;
        username: string;
      };
      // if (! payloadData._id) {
      //   return NextResponse.json(
      //     { message: "Authentication failed" },
      //     { status: 401 }
      //     );
      //   }
      // }
      const reqHeaders = new Headers(req.headers);
      reqHeaders.set("userId", payloadData._id);
      reqHeaders.set("userEmail", payloadData.email);
      reqHeaders.set("userUsername", payloadData.username);
      const response = NextResponse.next({
        request: {
          headers: reqHeaders,
        },
      });
      return response;
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  }
}
