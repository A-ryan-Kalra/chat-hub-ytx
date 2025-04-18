import { Member, Profile, Server } from "@prisma/client";
import { NextApiResponse } from "next";
import { Socket, Server as NetServer } from "net";
import { Server as SocketIoServer } from "socket.io";
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};
