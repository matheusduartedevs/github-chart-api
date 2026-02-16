import type { NextFunction, Request, Response } from 'express';
import { getGitHubUser } from '../services/github.service.js';
import { sendSuccess, sendError } from '../utils/response.utils.js';

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;

    if (!username) {
      return sendError(res, [{ message: 'Username is required', code: 'MISSING_USERNAME' }], 400);
    }

    const user = await getGitHubUser(username as string);
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};
