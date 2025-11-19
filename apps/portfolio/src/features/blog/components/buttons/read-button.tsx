'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Volume2Icon, SquareIcon } from 'lucide-react';

type ReadButtonProps = {
  markdown: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  labelStart?: string;
  labelStop?: string;
};

export function ReadButton({
  markdown,
  lang = 'fr-FR',
  rate = 1,
  pitch = 1,
  volume = 1,
  labelStart = 'Read',
  labelStop = 'Stop',
}: ReadButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (speechSynthesis && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      utteranceRef.current = null;
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      try {
        speechSynthesis.cancel();
      } catch {
      } finally {
        setIsSpeaking(false);
      }
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      const text = markdownToPlainText(markdown);

      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = clamp(rate, 0.1, 10);
      u.pitch = clamp(pitch, 0, 2);
      u.volume = clamp(volume, 0, 1);

      // Événements pour mettre à jour l’UI
      u.onstart = () => setIsSpeaking(true);
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);

      utteranceRef.current = u;

      const voices = speechSynthesis.getVoices();
      const preferred = voices.find((v) => v.lang === lang);
      if (preferred) {
        u.voice = preferred;
      }

      if (!preferred) {
        speechSynthesis.onvoiceschanged = () => {
          const v2 = speechSynthesis.getVoices().find((v) => v.lang === lang);
          if (v2 && utteranceRef.current) {
            utteranceRef.current.voice = v2;
          }
        };
      }

      speechSynthesis.speak(u);
    } catch {
      setIsSpeaking(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSpeak}
      aria-label={isSpeaking ? labelStop : labelStart}
    >
      {isSpeaking ? <SquareIcon /> : <Volume2Icon />}
      {isSpeaking ? labelStop : labelStart}
    </Button>
  );
}

function markdownToPlainText(md: string): string {
  let text = md;

  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1');

  text = text.replace(/^\s{0,3}#{1,6}\s+(.*)$/gm, '$1\n');

  text = text.replace(/^\s*[-*+]\s+(.*)$/gm, '• $1');
  text = text.replace(/^\s*\d+\.\s+(.*)$/gm, '• $1');

  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');

  text = text.replace(/`([^`]+)`/g, 'code: $1');

  text = text.replace(/```(?:\w+)?\n([\s\S]*?)```/g, (_m, code) => {
    const inline = code.replace(/\s+/g, ' ').trim();
    return `bloc de code: ${inline}\n`;
  });

  text = text.replace(/^\s*>\s+(.*)$/gm, '$1');

  text = text.replace(/\|/g, ' ');
  text = text.replace(/^\s*:-+:?\s*$/gm, '');

  text = text.replace(/[ \t]+\n/g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');

  text = text.trim();

  return text;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
