import { NextApiRequest, NextApiResponse } from "next";
import { serverBlogService } from "../../services/serverBlogService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Test Firebase connection
    const posts = await serverBlogService.getAllPosts();
    const tags = await serverBlogService.getAllTags();

    res.status(200).json({
      status: "connected",
      message: "Firebase connection successful!",
      stats: {
        postsCount: posts.length,
        tagsCount: tags.length,
      },
    });
  } catch (error) {
    console.error("Firebase test error:", error);
    res.status(500).json({
      status: "error",
      message: "Firebase connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
