"use server";

import prisma from "@/static/prisma";

export const findUserByEmail = async (email: string) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return existingUser;
};
