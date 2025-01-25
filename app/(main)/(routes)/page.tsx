"use client";

import { ModeToggle } from "@/components/model-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="">
      <UserButton />
      <ModeToggle />
    </div>
  );
}
