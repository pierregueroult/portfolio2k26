'use client';

import { Button } from '@repo/ui/components/button';
import { Share2Icon } from 'lucide-react';

type ShareButtonProps = {
  url: string;
  title: string;
  text?: string;
};

export function ShareButton({ url, title, text }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        await navigator.share({ title, text, url });
      }
    } catch (err: unknown) {
      if (err instanceof Error && (err as any).name === 'AbortError') {
        return;
      }
    }
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2Icon />
      Share
    </Button>
  );
}
