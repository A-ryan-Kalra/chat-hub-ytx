import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";

interface InviteCodeProps {
  params: Promise<{ inviteCode: string }>;
}

async function InviteCode({ params }: InviteCodeProps) {
  const profile = await currentProfile();
  const paramsResolved = await params;
  if (!profile) {
    return redirect("/sign-in");
  }

  if (!paramsResolved.inviteCode) {
    return redirect("/");
  }

  const invalidInviteCode = await db.server.findFirst({
    where: {
      inviteCode: paramsResolved.inviteCode,
    },
  });

  if (!invalidInviteCode) {
    return <div className="">Invite code is invalid</div>;
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: paramsResolved.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: paramsResolved.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
}

export default InviteCode;
