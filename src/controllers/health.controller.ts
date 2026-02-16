import type { Request, Response } from 'express';
import { sendSuccess } from '../utils/response.utils.js';

export const healthController = (req: Request, res: Response) => {
  sendSuccess(res, {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
};
