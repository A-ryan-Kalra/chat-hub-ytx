import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getorCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
interface MemberPageProps {
  params: Promise<{
    memberId: string;
    serverId: string;
  }>;
  searchParams: Promise<{
    video?: boolean;
  }>;
}
async function MemberIdPage({ params, searchParams }: MemberPageProps) {
  const profile = await currentProfile();
  const paramsResolved = await params;
  const searchParamsResolved = await searchParams;

  if (!profile) {
    return RedirectToSignIn({});
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: paramsResolved.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getorCreateConversation(
    currentMember.id,
    paramsResolved.memberId
  );

  if (!conversation) {
    return redirect(`/servers/${paramsResolved.serverId}`);
  }
  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={paramsResolved.serverId}
        type={"conversation"}
      />
      {searchParamsResolved.video && (
        <MediaRoom chatId={conversation.id} video={true} audio={true} />
      )}
      {!searchParamsResolved.video && (
        <>
          <div className="flex-1 overflow-y-auto">
            <ChatMessages
              member={currentMember}
              name={otherMember.profile.name}
              chatId={conversation.id}
              type="conversation"
              apiUrl="/api/direct-messages"
              paramKey="conversationId"
              paramValue={conversation.id}
              socketUrl="/api/socket/direct-messages"
              socketQuery={{
                conversationId: conversation.id,
              }}
            />
          </div>
          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiUrl="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
}

export default MemberIdPage;
