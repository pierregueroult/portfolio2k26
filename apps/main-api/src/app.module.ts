import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { BlogModule } from './blog/blog.module';
import { validateEnvironment } from './env.validation';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnvironment }),
    LoggerModule.forRoot(),
    BlogModule,
    ChatModule,
  ],
  providers: [],
})
export class AppModule { }
