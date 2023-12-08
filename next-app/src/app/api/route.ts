import { getUser } from "@/db/models/Users";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

// export async function GET(req: Request) {
//   return Response.json(
//     { statusCode: 200, message: "test get next" },
//     { status: 200 }
//   );
// }

export async function GET(req: Request): Promise<Response> {
  const users = await getUser();
  return NextResponse.json(
    {
      statusCode: 200,
      message: "GET Users success!",
      data: users,
    },
    {
      status: 200,
    }
  );
}
