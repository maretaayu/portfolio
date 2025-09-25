import { NextApiRequest, NextApiResponse } from "next";
import { serverBlogService } from "../../../services/serverBlogService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  if (req.method === "PUT") {
    try {
      const updates = req.body;
      await serverBlogService.updatePost(id, updates);
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  } else if (req.method === "DELETE") {
    try {
      await serverBlogService.deletePost(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
