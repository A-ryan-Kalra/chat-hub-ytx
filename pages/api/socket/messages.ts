import { currentProfilePages } from "@/lib/current-profile-pages";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!serverId) {
      return res.status(400).json({ error: "Server Id Missing" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel Id Missing" });
    }
    if (!content) {
      return res.status(400).json({ error: "Content Missing" });
    }
  } catch (error) {
    console.error("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
