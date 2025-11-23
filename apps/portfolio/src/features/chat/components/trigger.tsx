'use client';

import { Button } from '@repo/ui/components/button';
import { ComponentProps } from 'react';
import { useChatStore } from '../stores/chat-store';

type ChatTriggerProps = Omit<ComponentProps<typeof Button>, 'onClick'>;

export const ChatTrigger = ({ children, ...props }: ChatTriggerProps) => {
  const { triggerChat } = useChatStore((state) => state);
  return (
    <Button {...props} onClick={triggerChat}>
      {children}
    </Button>
  );
};
