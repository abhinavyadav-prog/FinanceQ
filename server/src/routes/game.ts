import { Router } from 'express';
import { auth } from '../middleware/auth';
import { statsController } from '../controllers/stats.controller';

const router = Router();

router.get('/stats', auth, statsController.getUserStats);
router.post('/stats', auth, statsController.updateGameStats);

export default router; 