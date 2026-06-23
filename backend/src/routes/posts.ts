import { Router } from 'express';
import { createPost, getFeed, getPost, deletePost, likePost } from '../controllers/postController';
import { createComment, getPostComments, deleteComment } from '../controllers/commentController';
import { verifyToken, optionalAuth } from '../middleware/auth';

const router = Router();

// Posts
router.post('/', verifyToken, createPost);
router.get('/feed', optionalAuth, getFeed);
router.get('/:id', optionalAuth, getPost);
router.delete('/:id', verifyToken, deletePost);
router.post('/:id/like', verifyToken, likePost);

// Comments
router.post('/:id/comments', verifyToken, createComment);
router.get('/:id/comments', getPostComments);
router.delete('/comments/:id', verifyToken, deleteComment);

export default router;
