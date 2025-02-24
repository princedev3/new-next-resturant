"use server";
import { v4 as uuid4 } from "uuid";
import { getVerificationTokenByEmail } from "./get-verification-token-by-email";
import prisma from "@/static/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 5);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });
  return verificationToken;
};
