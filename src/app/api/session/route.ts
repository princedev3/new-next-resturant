import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }

  return NextResponse.json(session, { status: 200 });
}
