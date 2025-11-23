import { Message, MessageContent, MessageResponse } from '@repo/ui/components/ai/message';

import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/tooltip';
import { cn } from '@repo/ui/lib/utils';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@repo/ui/components/ai/reasoning';

import { useFormatter } from 'next-intl';

import { ChatMessage } from '@/features/chat/stores/chat-store';
import { ChatStatus } from 'ai';

type ChatMessageProps = {
  message: ChatMessage;
  messages: ChatMessage[];
  status: ChatStatus;
};

export function ChatMessageComponent({ message, messages, status }: ChatMessageProps) {
  const format = useFormatter();

  const isThisMessageToday = ((d) => {
    const n = new Date();
    return (
      d.getFullYear() === n.getFullYear() &&
      d.getMonth() === n.getMonth() &&
      d.getDate() === n.getDate()
    );
  })(new Date(message.metadata?.createdAt || ''));

  return (
    <Message from={message.role} key={message.id} className="flex-col">
      <MessageContent className="max-w-full">
        <span>
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return (
                  <MessageResponse key={`${message.id}-${i}-text`}>{part.text}</MessageResponse>
                );
              case 'reasoning':
                return (
                  <Reasoning
                    key={`${message.id}-${i}-reasoning`}
                    className="w-full"
                    isStreaming={
                      status === 'streaming' &&
                      i === message.parts.length - 1 &&
                      message.id === messages.at(-1)?.id
                    }
                  >
                    <ReasoningTrigger />
                    <ReasoningContent>{part.text}</ReasoningContent>
                  </Reasoning>
                );
              default:
                return null;
            }
          })}
        </span>
      </MessageContent>
      <div
        className={cn(
          'flex w-full items-center text-xs opacity-50',
          message.role === 'user' ? 'justify-end' : 'justify-start',
        )}
      >
        {message.parts.length > 0 && message.metadata?.createdAt && (
          <Tooltip>
            <TooltipTrigger>
              {isThisMessageToday
                ? format.dateTime(message.metadata.createdAt, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : format.dateTime(message.metadata.createdAt, {
                    year: 'numeric',
                    day: '2-digit',
                    month: '2-digit',
                  })}
            </TooltipTrigger>
            <TooltipContent align={message.role === 'user' ? 'end' : 'start'} side="bottom">
              {format.dateTime(message.metadata.createdAt, {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              })}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </Message>
  );
}
