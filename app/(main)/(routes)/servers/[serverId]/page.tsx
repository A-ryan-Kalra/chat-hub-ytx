import { Gavel, MoreVertical, ShieldQuestion } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React from "react";

function ServerIdPage() {
  return (
    <div>
      {" "}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4 text-zinc-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ShieldQuestion className="w-4 h-4 mr-2" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="flex items-center">
                  as
                </DropdownMenuItem>

                <DropdownMenuItem className="flex hover: items-center">
                  ss
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex  items-center">
            <Gavel className="w-4 h-4 mr-2" /> Kick
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ServerIdPage;
