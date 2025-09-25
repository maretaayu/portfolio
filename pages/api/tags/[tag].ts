import { NextApiRequest, NextApiResponse } from 'next';
import { serverBlogService } from '../../../services/serverBlogService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tag } = req.query;

  if (!tag || typeof tag !== 'string') {
    return res.status(400).json({ error: 'Tag parameter is required' });
  }

  if (req.method === 'GET') {
    try {
      const posts = await serverBlogService.getPostsByTag(tag);
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      return res.status(500).json({ error: 'Failed to fetch posts by tag' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}