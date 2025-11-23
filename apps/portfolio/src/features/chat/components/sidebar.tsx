'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useLocale } from 'next-intl';

import { Chat } from '@/features/chat/components/chat';
import { useHotkeys } from '@/features/chat/hooks/use-keys';
import { ChatStore, useChatStore } from '@/features/chat/stores/chat-store';
import { Separator } from '@repo/ui/components/separator';

export const CHAT_SIDEBAR_WIDTH = 400;

export function ChatSidebar() {
  const { isOpen, messages, setMessages, triggerChat } = useChatStore(
    (state: ChatStore): ChatStore => state,
  );
  const locale = useLocale();

  useHotkeys('meta+b', () => triggerChat());

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          key="chat-sidebar"
          className="chat-sidebar sticky top-0 h-screen overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: CHAT_SIDEBAR_WIDTH }}
          exit={{ width: 0, transition: { delay: 0.2, duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0, duration: 0.2 }}
        >
          <motion.div
            key="chat-sidebar-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
            transition={{ duration: 0.2, delay: 0.2 }}
            style={{ height: '100%' }}
            className="flex h-full w-full flex-row"
          >
            <Separator orientation="vertical" />
            <div className="flex h-full w-full max-w-[calc(100%-8px)] flex-1 flex-col">
              <Chat initialMessages={messages} setStoredMessages={setMessages} locale={locale} />
            </div>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
