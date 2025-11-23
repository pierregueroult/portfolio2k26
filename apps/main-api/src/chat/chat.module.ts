import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConfigModule } from '@nestjs/config';
import { LanguageModule } from '../language/language.module';

@Module({
  imports: [ConfigModule, LanguageModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule { }
