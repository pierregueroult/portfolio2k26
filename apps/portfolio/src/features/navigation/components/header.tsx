'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { CHAT_SIDEBAR_WIDTH } from '@/features/chat/components/sidebar';
import { useChatStore } from '@/features/chat/stores/chat-store';

type NavigationHeaderProps = {
  children: ReactNode;
};

export function NavigationHeader({ children }: NavigationHeaderProps) {
  const isOpen = useChatStore((state) => state.isOpen);

  return (
    <motion.header
      className="flex w-full items-center justify-center fixed z-[1000] top-4 md:bottom-8 md:top-auto @container/header"
      animate={{
        width: isOpen ? `calc(100% - ${CHAT_SIDEBAR_WIDTH}px)` : '100%',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        delay: !isOpen ? 0.2 : 0,
        duration: 0.2,
      }}
      style={{
        maxWidth: '100%',
      }}
    >
      {children}
    </motion.header>
  );
}
