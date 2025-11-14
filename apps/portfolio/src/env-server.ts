import 'server-only';

import { createEnv } from '@t3-oss/env-nextjs';

import z from 'zod';

export const env = createEnv({
  server: {
    PORTFOLIO_BACKEND_API_URL: z.string().url().min(1).max(1024),
  },
  runtimeEnv: {
    PORTFOLIO_BACKEND_API_URL: process.env.PORTFOLIO_BACKEND_API_URL,
  },
});
