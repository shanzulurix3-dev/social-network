import { Response } from 'express';
import pool from '../db';
import { Post } from '../types';

export const createPost = async (req: any, res: Response) => {
  try {
    const { content, image_url } = req.body;
    const userId = req.userId;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const result = await pool.query(
      'INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3) RETURNING *',
      [userId, content, image_url || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getFeed = async (req: any, res: Response) => {
  try {
    const userId = req.userId || null;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = parseInt(req.query.offset) || 0;

    // Get posts from followed users and own posts
    let query = `
      SELECT p.*, u.username, u.avatar_url,
             COUNT(DISTINCT l.id) as likes_count,
             COUNT(DISTINCT c.id) as comments_count,
             (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = $1) > 0 as liked_by_me
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
    `;

    if (userId) {
      query += `
        WHERE p.user_id = $1 OR p.user_id IN (
          SELECT following_id FROM followers WHERE follower_id = $1
        )
      `;
    }

    query += `
      GROUP BY p.id, u.id
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [userId, limit, offset]);

    res.json(result.rows);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
};

export const getPost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId || null;

    const result = await pool.query(
      `SELECT p.*, u.username, u.avatar_url,
              (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes_count,
              (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count,
              (SELECT COUNT(*) FROM likes WHERE post_id = p.id AND user_id = $2) > 0 as liked_by_me
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = $1`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const deletePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if user is owner
    const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

    if (post.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.rows[0].user_id !== userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await pool.query('DELETE FROM posts WHERE id = $1', [id]);

    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

export const likePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Check if already liked
    const existing = await pool.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (existing.rows.length > 0) {
      // Unlike
      await pool.query(
        'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
        [id, userId]
      );
      return res.json({ liked: false });
    }

    // Like
    await pool.query(
      'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
      [id, userId]
    );

    res.json({ liked: true });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
};
