import { Response } from 'express';
import pool from '../db';

export const getUserProfile = async (req: any, res: Response) => {
  try {
    const { username } = req.params;
    const currentUserId = req.userId || null;

    const result = await pool.query(
      `SELECT u.id, u.username, u.email, u.first_name, u.last_name, u.bio, u.avatar_url, u.cover_image_url, u.is_active, u.created_at,
              (SELECT COUNT(*) FROM followers WHERE following_id = u.id) as followers_count,
              (SELECT COUNT(*) FROM followers WHERE follower_id = u.id) as following_count,
              (SELECT COUNT(*) FROM posts WHERE user_id = u.id) as posts_count,
              (SELECT COUNT(*) FROM followers WHERE follower_id = $1 AND following_id = u.id) > 0 as followed_by_me
       FROM users u
       WHERE u.username = $2`,
      [currentUserId, username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const { first_name, last_name, bio, avatar_url, cover_image_url } = req.body;

    const result = await pool.query(
      `UPDATE users SET first_name = COALESCE($1, first_name), 
                        last_name = COALESCE($2, last_name),
                        bio = COALESCE($3, bio),
                        avatar_url = COALESCE($4, avatar_url),
                        cover_image_url = COALESCE($5, cover_image_url),
                        updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, username, email, first_name, last_name, bio, avatar_url, cover_image_url, is_active, created_at, updated_at`,
      [first_name, last_name, bio, avatar_url, cover_image_url, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const followUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const followerId = req.userId;

    if (parseInt(id) === followerId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const existing = await pool.query(
      'SELECT * FROM followers WHERE follower_id = $1 AND following_id = $2',
      [followerId, id]
    );

    if (existing.rows.length > 0) {
      // Unfollow
      await pool.query(
        'DELETE FROM followers WHERE follower_id = $1 AND following_id = $2',
        [followerId, id]
      );
      return res.json({ following: false });
    }

    // Follow
    await pool.query(
      'INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)',
      [followerId, id]
    );

    res.json({ following: true });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
};

export const getUserPosts = async (req: any, res: Response) => {
  try {
    const { username } = req.params;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const offset = parseInt(req.query.offset) || 0;

    const result = await pool.query(
      `SELECT p.*, u.username, u.avatar_url
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE u.username = $1
       ORDER BY p.created_at DESC
       LIMIT $2 OFFSET $3`,
      [username, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
};
