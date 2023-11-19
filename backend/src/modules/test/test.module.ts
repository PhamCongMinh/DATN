import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import { Blog, BlogSchema } from '@models/entities/Blog.entity';
import { BlogService } from '@modules/blog/blog.service';
import { BlogController } from '@modules/blog/blog.controller';
import BlogRepository from '@models/repositories/Blog.repository';
import { TestController } from '@modules/test/test.controller';
import { TestService } from '@modules/test/test.service';
import ConferenceRepository from '@models/repositories/Conference.repository';
import {
  Conference,
  ConferenceSchema,
} from '@models/entities/Conference.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Conference.name,
        schema: ConferenceSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [TestController],
  providers: [TestService, ConferenceRepository],
  exports: [TestService],
})
export default class TestModule {}
