import { Response } from 'express';
import pool from '../db';

export const sendMessage = async (req: any, res: Response) => {
  try {
    const { recipient_id, content } = req.body;
    const senderId = req.userId;

    if (!recipient_id || !content) {
      return res.status(400).json({ error: 'Recipient and content are required' });
    }

    if (senderId === recipient_id) {
      return res.status(400).json({ error: 'Cannot message yourself' });
    }

    const result = await pool.query(
      'INSERT INTO messages (sender_id, recipient_id, content) VALUES ($1, $2, $3) RETURNING *',
      [senderId, recipient_id, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessages = async (req: any, res: Response) => {
  try {
    const { userId: otherUserId } = req.params;
    const currentUserId = req.userId;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;

    const result = await pool.query(
      `SELECT m.*, 
              sender.username as sender_username, 
              recipient.username as recipient_username
       FROM messages m
       JOIN users sender ON m.sender_id = sender.id
       JOIN users recipient ON m.recipient_id = recipient.id
       WHERE (m.sender_id = $1 AND m.recipient_id = $2) OR (m.sender_id = $2 AND m.recipient_id = $1)
       ORDER BY m.created_at DESC
       LIMIT $3 OFFSET $4`,
      [currentUserId, otherUserId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const markMessageAsRead = async (req: any, res: Response) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.userId;

    const result = await pool.query(
      `UPDATE messages SET is_read = true WHERE id = $1 AND recipient_id = $2 RETURNING *`,
      [messageId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Mark message error:', error);
    res.status(500).json({ error: 'Failed to mark message' });
  }
};
