import type { Request, Response } from 'express';
import { sendError } from '../utils/response.utils.js';

export const errorMiddleware = (err: Error, req: Request, res: Response) => {
  console.error(err);

  if (err.message === 'User not found') {
    return sendError(res, [{ message: err.message, code: 'USER_NOT_FOUND' }], 404);
  }

  sendError(res, [{ message: 'Internal server error', code: 'INTERNAL_ERROR' }], 500);
};
