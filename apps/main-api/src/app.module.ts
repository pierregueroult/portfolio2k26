import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BlogModule } from './blog/blog.module';
import { validateEnvironment } from "./env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnvironment }),
    BlogModule
  ],
  providers: [],
})
export class AppModule {}
