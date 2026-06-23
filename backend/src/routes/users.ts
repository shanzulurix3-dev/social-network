import { Router } from 'express';
import { getUserProfile, updateProfile, followUser, getUserPosts } from '../controllers/userController';
import { verifyToken, optionalAuth } from '../middleware/auth';

const router = Router();

router.get('/:username', optionalAuth, getUserProfile);
router.put('/profile', verifyToken, updateProfile);
router.post('/:id/follow', verifyToken, followUser);
router.get('/:username/posts', getUserPosts);

export default router;
