import { Throttle } from '@nestjs/throttler';
import {
  Controller,
  Post,
  Body,
  Res,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
  RequestTimeoutException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import type { ChatMessageDto } from '@repo/database/dtos/ai/chatbot-message.dto';
import type { Response } from 'express';
import { pipeUIMessageStreamToResponse } from 'ai';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  chatbotEndpoint(@Body() body: ChatMessageDto, @Res() response: Response) {
    try {
      const stream = this.chatService.createStream(body.messages);
      pipeUIMessageStreamToResponse({ stream, response });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      if (message.toLowerCase().includes('rate limit')) {
        throw new HttpException(
          'Too many requests. Please wait before sending another message.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else if (message.toLowerCase().includes('timeout')) {
        throw new RequestTimeoutException('Request timed out. Please try again later.');
      } else {
        throw new InternalServerErrorException('An error occurred processing your chat request');
      }
    }
  }
}
