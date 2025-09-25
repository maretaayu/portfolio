import { NextApiRequest, NextApiResponse } from "next";
import { serverBlogService } from "../../../services/serverBlogService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const tags = await serverBlogService.getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
}
