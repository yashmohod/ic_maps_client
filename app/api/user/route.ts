import { getUser } from "@/db";
import { NextResponse } from "next/server";

const BACKEND = "http://localhost:8080";

export async function GET(req: Request) {
  const qs = new URL(req.url).search;
  const curUser = await getUser(qs);
  let res = JSON.stringify(curUser);
  // safest passthrough (doesn't explode on non-json errors)
  return new NextResponse(res, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
