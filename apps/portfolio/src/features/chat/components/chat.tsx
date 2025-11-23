import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useRef, useEffect } from 'react';

import { env } from '@/env-client';

import { useBrowserId } from '@/features/chat/hooks/use-browser-id';
import type { ChatMessage } from '@/features/chat/stores/chat-store';
import { ChatConversation } from './conversation';

type ChatProps = {
  initialMessages: ChatMessage[];
  setStoredMessages: (messages: ChatMessage[]) => void;
  locale: string;
};

export function Chat({ initialMessages, setStoredMessages, locale }: ChatProps) {
  const { messages, sendMessage, status } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: `${env.NEXT_PUBLIC_PORTFOLIO_BACKEND_API_URL}/chat`,
    }),
  });

  useEffect(() => {
    setStoredMessages(messages);
  }, [messages, setStoredMessages]);

  const id = useBrowserId();

  const handleSubmit = (message: string) => {
    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: message }],
      metadata: {
        createdAt: Date.now(),
        userId: id,
      },
    });
  };

  return (
    <>
      <ChatConversation messages={messages} />
      <ChatInput
        onSubmit={handleSubmit}
        disabled={status === 'error' || status === 'streaming' || status === 'submitted'}
      />
    </>
  );
}
