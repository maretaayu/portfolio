import { NextApiRequest, NextApiResponse } from "next";
import { serverBlogService } from "../../../services/serverBlogService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { tag } = req.query;

    try {
      if (tag && typeof tag === "string") {
        // Get posts by tag
        const posts = await serverBlogService.getPostsByTag(tag);
        return res.status(200).json(posts);
      } else {
        // Get all tags with counts
        const tags = await serverBlogService.getAllTags();
        return res.status(200).json(tags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      return res.status(500).json({ error: "Failed to fetch tags" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
