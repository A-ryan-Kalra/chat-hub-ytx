import { NextResponse, NextRequest } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { channelId: string } }
// ) {
//   try {
//     const profile = await currentProfile();
//     const { searchParams } = new URL(req.url);
//     const serverId = searchParams.get("serverId");

//     if (!profile) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (!serverId) {
//       return new NextResponse("Server Id Missing", { status: 400 });
//     }
//     if (!params.channelId) {
//       return new NextResponse("Channel Id Missing", { status: 400 });
//     }

//     const server = await db.server.update({
//       where: {
//         id: serverId,
//         members: {
//           some: {
//             profileId: profile.id,
//             role: {
//               in: [MemberRole.ADMIN, MemberRole.MODERATOR],
//             },
//           },
//         },
//       },
//       data: {
//         channels: {
//           delete: {
//             id: params.channelId,
//             name: {
//               not: "general",
//             },
//           },
//         },
//       },
//     });

//     return NextResponse.json(server);
//   } catch (error) {
//     console.error("[CHANNEL_ID_DELETE]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

export async function DELETE(req: NextRequest) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const channelId = req.nextUrl.pathname.split("/").pop(); // Extract channelId from the URL

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id Missing", { status: 400 });
    }
    if (!channelId) {
      return new NextResponse("Channel Id Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
// export async function PATCH(
//   req: Request,
//   { params }: { params: { channelId: string } }
// ) {
//   try {
//     const profile = await currentProfile();
//     const { name, type } = await req.json();
//     const { searchParams } = new URL(req.url);
//     const serverId = searchParams.get("serverId");

//     if (!profile) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (!serverId) {
//       return new NextResponse("Server Id Missing", { status: 400 });
//     }
//     if (!params.channelId) {
//       return new NextResponse("Channel Id Missing", { status: 400 });
//     }

//     if (name === "general") {
//       return new NextResponse("Name cannot be 'general'", {
//         status: 400,
//       });
//     }

//     const server = await db.server.update({
//       where: {
//         id: serverId,
//         members: {
//           some: {
//             profileId: profile.id,
//             role: {
//               in: [MemberRole.ADMIN, MemberRole.MODERATOR],
//             },
//           },
//         },
//       },
//       data: {
//         channels: {
//           update: {
//             where: {
//               id: params.channelId,
//               NOT: {
//                 name: "general",
//               },
//             },
//             data: {
//               name,
//               type,
//             },
//           },
//         },
//       },
//     });

//     return NextResponse.json(server);
//   } catch (error) {
//     console.error("[CHANNEL_ID_PATCH]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

export async function PATCH(req: NextRequest) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const channelId = req.nextUrl.pathname.split("/").pop(); // Extract channelId from the URL

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id Missing", { status: 400 });
    }
    if (!channelId) {
      return new NextResponse("Channel Id Missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", {
        status: 400,
      });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNEL_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
