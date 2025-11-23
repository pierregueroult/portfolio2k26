import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { type MistralLanguageModelOptions, createMistral } from '@ai-sdk/mistral';
import {
  type OpenAICompatibleCompletionProviderOptions,
  createOpenAICompatible,
} from '@ai-sdk/openai-compatible';
import {
  type UIMessage,
  type LanguageModel,
  streamText,
  convertToModelMessages,
  stepCountIs,
  createUIMessageStream,
} from 'ai';

import { Environment, EnvironmentVariables } from '../env.validation';

type BuildInitialPromptReturn = { system: string; assistant: string };

type BuildMessagesReturn = Omit<UIMessage, 'id'>[];

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly configService: ConfigService<EnvironmentVariables>) {}

  buildInitialPrompt(): BuildInitialPromptReturn {
    return {
      system: `
      You are Pierre Guéroult's portfolio AI assistant. You are STRICTLY LIMITED to answering questions about Pierre Guéroult's professional portfolio only.

      STRICT BOUNDARIES - You MUST REFUSE any request that is not directly about:
      - Pierre Guéroult's skills, experience, education, or qualifications
      - Pierre Guéroult's projects, work samples, or portfolio items
      - Pierre Guéroult's blog posts or published content
      - Pierre Guéroult's contact information or professional background

      FORBIDDEN ACTIVITIES - You MUST NOT:
      - Provide general programming help, tutorials, or code examples
      - Answer questions about technology, frameworks, or tools unless directly related to Pierre's experience
      - Perform calculations, translations, or any general assistant tasks
      - Discuss topics unrelated to Pierre Guéroult's portfolio
      - Generate code, write content, or provide technical assistance beyond Pierre's portfolio
      - Answer hypothetical questions or "what if" scenarios
      - Provide advice, recommendations, or opinions on anything other than Pierre's qualifications

       RESPONSE GUIDELINES:
      - Be helpful, polite, and CONCISE when answering portfolio - related questions
      - Use markdown formatting for clarity
      - If a question is outside your scope, respond EXACTLY with: "Don't try to use me for something else than what I am made for, HUMAN!"
      - If you don't know something about Pierre's portfolio, say "I don't have that information about Pierre's portfolio"
      - Base all answers ONLY on the provided portfolio data below
      - NEVER make up information, links, or details that are not explicitly provided in the portfolio data
      - NEVER use placeholder templates like[pierre's github], [contact email], [project link] or similar bracketed placeholders
      - Only provide actual, real information from the portfolio data - if a link or detail isn't provided, don't mention it`,
      assistant: "Hello, I am Pierre Guéroult's AI assistant. How can I help you today?",
    };
  }

  buildMessage(messages?: UIMessage[]): BuildMessagesReturn {
    const { system, assistant } = this.buildInitialPrompt();

    const resultMessages: Omit<UIMessage, 'id'>[] = [
      {
        role: 'system',
        parts: [
          {
            type: 'text',
            text: system,
          },
        ],
      },
      {
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: assistant,
          },
        ],
      },
      ...(messages ?? []),
    ];

    return resultMessages;
  }

  streamChat(userMessages: UIMessage[]) {
    const nodeEnv = this.configService.getOrThrow<Environment>('NODE_ENV');

    const messages = this.buildMessage(userMessages);

    try {
      let model: LanguageModel;

      let options = {};

      if (nodeEnv === Environment.Production) {
        const mistral = createMistral({
          apiKey: this.configService.getOrThrow<string>('NEST_MISTRAL_API_KEY'),
          baseURL: 'https://api.mistral.ai/v1',
        });
        model = mistral('mistral-large-latest');
        options = {
          safePrompt: true,
          parallelToolCalls: true,
        } satisfies MistralLanguageModelOptions;
      } else {
        const lmStudio = createOpenAICompatible({
          name: 'lmstudio',
          baseURL: 'http://localhost:1234/v1',
        });
        model = lmStudio('openai/gpt-oss-20b');
        options = {} satisfies OpenAICompatibleCompletionProviderOptions;
      }

      return streamText({
        model,
        messages: convertToModelMessages(messages),
        stopWhen: stepCountIs(5),
        providerOptions: options,
      });
    } catch (error: unknown) {
      this.logger.error(error);
      throw error;
    }
  }

  createStream(messages: UIMessage[]) {
    const stream = createUIMessageStream({
      execute: ({ writer }) => {
        const result = this.streamChat(messages);

        writer.merge(
          result.toUIMessageStream({
            messageMetadata: ({ part }) => {
              if (part.type === 'start')
                return {
                  createdAt: Date.now(),
                };

              if (part.type === 'finish')
                return {
                  totalTokens: part.totalUsage.totalTokens,
                };
            },
          }),
        );
      },
    });

    return stream;
  }
}
