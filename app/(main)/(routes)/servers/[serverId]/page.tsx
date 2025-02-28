import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: Promise<{
    serverId: string;
  }>;
}

async function ServerIdPage({ params }: ServerIdPageProps) {
  const profile = await currentProfile();
  const paramsResolved = await params;

  if (!profile) {
    return RedirectToSignIn({ redirectUrl: "/sign-in" });
  }

  const server = await db.server.findUnique({
    where: {
      id: paramsResolved.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(
    `/servers/${paramsResolved.serverId}/channels/${initialChannel?.id}`
  );
}

export default ServerIdPage;
