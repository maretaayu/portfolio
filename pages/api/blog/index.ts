import { NextApiRequest, NextApiResponse } from "next";
import { serverBlogService } from "../../../services/serverBlogService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const posts = await serverBlogService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else if (req.method === "POST") {
    try {
      const postData = req.body;
      const id = await serverBlogService.createPost(postData);
      res.status(201).json({ id, message: "Post created successfully" });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
