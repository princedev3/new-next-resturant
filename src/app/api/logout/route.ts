import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await signOut();
    return NextResponse.redirect(new URL("http://localhost:3000/login"));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "logout failed", status: 500 });
  }
};
