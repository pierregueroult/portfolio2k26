'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { CopyIcon, CheckIcon } from 'lucide-react';

type CopyLinkButtonProps = {
  url: string;
};

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (isCopying) return;

    setIsCopying(true);
    try {
      await copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Unable to copy the link. Please copy it manually.');
    } finally {
      setIsCopying(false);
    }
  };

  const label = copied ? 'Copied!' : 'Copy link';

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      disabled={isCopying}
      aria-live="polite"
      aria-label={label}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {label}
    </Button>
  );
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard && 'writeText' in navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-1000px';
  document.body.appendChild(textarea);
  textarea.select();

  let success = false;
  try {
    success = document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }

  if (!success) {
    throw new Error('document.execCommand("copy") failed');
  }
}
