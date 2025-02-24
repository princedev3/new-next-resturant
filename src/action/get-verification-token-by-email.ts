"use server";
import prisma from "@/static/prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });
  return existingToken;
};
