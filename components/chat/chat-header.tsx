import { Hash } from "lucide-react";
import React from "react";
import MobileToggle from "../mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

function ChatHeader({ name, serverId, type, imageUrl }: ChatHeaderProps) {
  return (
    <div className="dark:border-neutral-800 font-semibold items-center border-b-2 border-neutral-200 flex h-12 px-3">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      <p className="font-semibold text-black dark:text-white">{name}</p>
    </div>
  );
}

export default ChatHeader;
