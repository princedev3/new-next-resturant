"use server";
export const runtime = "nodejs";

import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  console.log("heii", session);
  return session?.user;
};
