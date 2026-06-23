import { Router } from 'express';
import { sendMessage, getMessages, markMessageAsRead } from '../controllers/messageController';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.post('/', verifyToken, sendMessage);
router.get('/:userId', verifyToken, getMessages);
router.put('/:id/read', verifyToken, markMessageAsRead);

export default router;
