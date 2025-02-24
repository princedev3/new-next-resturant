"use server";

import prisma from "@/static/prisma";

export const findUserById = async (id: string) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return existingUser;
};
