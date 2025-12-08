'use client';

import type { UIMessage } from 'ai';
import z from 'zod';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

const messageMetadataSchema = z.object({
  createdAt: z.number().optional(),
  userId: z.string().optional(),
});

export type ChatMessage = UIMessage<z.infer<typeof messageMetadataSchema>>;

export type ChatStates = {
  isOpen: boolean;
  messages: ChatMessage[];
};

export type ChatActions = {
  openChat: () => void;
  closeChat: () => void;
  triggerChat: () => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  cleanMessages: () => void;
};

export type ChatStore = ChatStates & ChatActions;

export const defaultChatStates: ChatStates = {
  isOpen: false,
  messages: [],
};

export const createChatStore = (initState: ChatStates = defaultChatStates) => {
  return createStore<ChatStore>()(
    persist(
      (set) => ({
        ...initState,
        openChat: () => set(() => ({ isOpen: true })),
        closeChat: () => set(() => ({ isOpen: false })),
        triggerChat: () => set((state) => ({ isOpen: !state.isOpen })),
        addMessage: (message: ChatMessage) =>
          set((state) => ({ messages: [...state.messages, message] })),
        setMessages: (messages: ChatMessage[]) => set(() => ({ messages })),
        cleanMessages: () => set(() => ({ messages: [] })),
      }),
      {
        name: 'chat-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ messages: state.messages, isOpen: state.isOpen }),
      },
    ),
  );
};

export type ChatStoreApi = ReturnType<typeof createChatStore>;

export const ChatStoreContext = createContext<ChatStoreApi | undefined>(undefined);

export type ChatStoreProviderProps = {
  children: ReactNode;
};

export const ChatStoreProvider = ({ children }: ChatStoreProviderProps) => {
  const store = useRef<ChatStoreApi | null>(null);
  if (store.current === null) store.current = createChatStore();

  return <ChatStoreContext.Provider value={store.current}>{children}</ChatStoreContext.Provider>;
};

export const useChatStore = <T,>(selector: (store: ChatStore) => T): T => {
  const context = useContext(ChatStoreContext);

  if (!context) throw new Error('useChatStore must be used within a ChatStoreProvider');

  return useStore(context, selector);
};
