import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export const currentProfile = async () => {
  const authorized = await auth();
  const { userId } = authorized;

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  return profile;
};
