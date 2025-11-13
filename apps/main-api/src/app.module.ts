import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["./.env"],
    }),
    BlogModule,
  ],
  providers: [],
})
export class AppModule {}
