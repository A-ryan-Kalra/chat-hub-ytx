import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { memberId: string } }
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

//     if (!params.memberId) {
//       return new NextResponse("Member Id Missing", { status: 400 });
//     }

//     const server = await db.server.update({
//       where: {
//         id: serverId,
//         profileId: profile.id,
//       },
//       data: {
//         members: {
//           deleteMany: {
//             id: params.memberId,
//             profileId: {
//               not: profile.id,
//             },
//           },
//         },
//       },
//       include: {
//         members: {
//           include: {
//             profile: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(server);
//   } catch (error) {
//     console.error("[MEMBER_ID_DELETE", error);

//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

export async function DELETE(req: NextRequest) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const memberId = req.nextUrl.pathname.split("/").pop(); // Extract memberId from the URL

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id Missing", { status: 400 });
    }
    if (!memberId) {
      return new NextResponse("Member Id Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { memberId: string } }
// ) {
//   try {
//     const profile = await currentProfile();

//     const { searchParams } = new URL(req.url);
//     const { role } = await req.json();

//     const serverId = searchParams.get("serverId");
//     if (!profile) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (!serverId) {
//       return new NextResponse("Server Id Missing", { status: 400 });
//     }

//     if (!params.memberId) {
//       return new NextResponse("Member Id Missing", { status: 400 });
//     }

//     const server = await db.server.update({
//       where: {
//         id: serverId,
//         profileId: profile.id,
//       },
//       data: {
//         members: {
//           update: {
//             where: {
//               id: params.memberId,
//               profileId: {
//                 not: profile.id,
//               },
//             },
//             data: {
//               role,
//             },
//           },
//         },
//       },
//       include: {
//         members: {
//           include: {
//             profile: true,
//           },
//           orderBy: {
//             role: "asc",
//           },
//         },
//       },
//     });

//     return NextResponse.json(server);
//   } catch (error) {
//     console.error("[MEMBERS_ID_PATCH]", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
export async function PATCH(req: NextRequest) {
  try {
    const profile = await currentProfile();
    const { role } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const memberId = req.nextUrl.pathname.split("/").pop(); // Extract memberId from the URL

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server Id Missing", { status: 400 });
    }
    if (!memberId) {
      return new NextResponse("Member Id Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
