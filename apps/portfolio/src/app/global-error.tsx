'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '32rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  backgroundColor: '#fee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            </div>

            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              Something went wrong
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              A critical error occurred. Please try refreshing the page.
            </p>

            {process.env.NODE_ENV === 'development' && error.message && (
              <div
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  marginBottom: '2rem',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    wordBreak: 'break-all',
                  }}
                >
                  {error.message}
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: '0.625rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                style={{
                  padding: '0.625rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
