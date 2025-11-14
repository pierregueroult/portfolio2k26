import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { env } from '@/env-server';
import { forbidden, notFound, unauthorized } from 'next/navigation';

type FetchResult<T> = FetchSuccess<T> | FetchError;

type BackendError = unknown;
type FetchSuccess<T> = { ok: true; data: T; response: ResponseOk; code: number };
type ResponseOk = Response & { ok: true };
type ResponseError = Response & { ok: false; statusText: string; status: number };
type FetchError = {
  ok: false;
  error: string;
  response: ResponseError;
  data: BackendError;
  code: number;
};

const baseFetch = async <T = object>(
  path: string,
  options: RequestInit = {},
  includeAuth = false,
): Promise<FetchResult<T>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (includeAuth) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('auth-token');
    if (authCookie) headers['Cookie'] = `auth-token=${authCookie.value}`;
  }

  const response: ResponseOk | ResponseError = await fetch(
    `${env.PORTFOLIO_BACKEND_API_URL}${path}`,
    {
      ...options,
      headers,
      credentials: 'include',
    },
  );

  const json = await response.json().catch(() => ({}));

  return response.ok
    ? { ok: true, data: json as T, response, code: response.status }
    : {
        ok: false,
        error: response.statusText,
        response,
        data: json as BackendError,
        code: response.status,
      };
};

const get = cache(async <T = object>(path: string, auth = false): Promise<FetchResult<T>> => {
  return baseFetch(path, { method: 'GET' }, auth);
});

const post = cache(
  async <T = object>(path: string, body?: unknown, auth = false): Promise<FetchResult<T>> => {
    return baseFetch(
      path,
      {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
      },
      auth,
    );
  },
);

const put = cache(
  async <T = object>(path: string, body?: unknown, auth = false): Promise<FetchResult<T>> => {
    return baseFetch(
      path,
      {
        method: 'PUT',
        body: body ? JSON.stringify(body) : undefined,
      },
      auth,
    );
  },
);

const del = cache(
  async <T = object>(path: string, body?: unknown, auth = false): Promise<FetchResult<T>> => {
    return baseFetch(
      path,
      {
        method: 'DELETE',
        body: body ? JSON.stringify(body) : undefined,
      },
      auth,
    );
  },
);

const getOrThrow = async <T = object>(path: string, auth = false): Promise<T> => {
  const { ok, code, data } = await get<T>(path, auth);

  if (code === 404) return notFound();
  if (code === 401) return unauthorized();
  if (code === 403) return forbidden();
  if (!ok) throw new Error('Failed to fetch article content');

  return data;
};

export { get, post, put, del, getOrThrow };
