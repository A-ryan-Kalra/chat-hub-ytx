import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

async function ServerIdLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { serverId: string };
}) {
  const profile = await currentProfile();
  const { serverId } = await params;
  if (!profile) {
    return RedirectToSignIn({});
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }

  return (
    <div className="h-full">
      <div className="max-md:hidden md:flex h-full w-60 z-20 fixed flex-col inset-y-0  ">
        Server Sidebar
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}

export default ServerIdLayout;
