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

  const { q } = req.query;

  if (typeof q !== "string") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const posts = await serverBlogService.searchPosts(q);
    res.status(200).json(posts);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to search posts" });
  }
}
