import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import React from "react";

interface ProfileType {
  name: string;
  id: string;
  userId: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}
async function SetupPage() {
  const profile = (await initialProfile()) as ProfileType;

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  return <InitialModal />;
}

export default SetupPage;
