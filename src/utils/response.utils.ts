import type { Response } from 'express';
import type { ApiError, ApiMeta, ApiResponse } from '../types/api.type.js';

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200, meta: ApiMeta = {}) => {
  res.status(statusCode).json({
    data,
    meta: {
      generatedAt: new Date().toISOString(),
      ...meta,
    },
    errors: null,
  } satisfies ApiResponse<T>);
};

export const sendError = (
  res: Response,
  errors: ApiError[],
  statusCode = 500,
  meta: ApiMeta = {}
) => {
  res.status(statusCode).json({
    data: null,
    meta: {
      generatedAt: new Date().toISOString(),
      ...meta,
    },
    errors,
  } satisfies ApiResponse<null>);
};
