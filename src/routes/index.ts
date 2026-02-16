import { Router } from 'express';
import { healthController } from '../controllers/health.controller.js';
import { getUserController } from '../controllers/github.controller.js';

const router = Router();

router.get('/health', healthController);
router.get('/users/:username', getUserController);

export default router;
