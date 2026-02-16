export type ApiMeta = {
  requestId?: string;
  generatedAt?: string;
  cached?: boolean;
  version?: string;
  [key: string]: unknown;
};

export type ApiError = {
  message: string;
  code?: string;
};

export type ApiResponse<T> = {
  data: T | null;
  meta: ApiMeta;
  errors: ApiError[] | null;
};
