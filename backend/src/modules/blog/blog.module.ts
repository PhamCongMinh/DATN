import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import { Blog, BlogSchema } from '@models/entities/Blog.entity';
import { BlogService } from '@modules/blog/blog.service';
import { BlogController } from '@modules/blog/blog.controller';
import BlogRepository from '@models/repositories/Blog.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'src/upload',
      }),
    }),
    LoggingModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogService],
})
export default class BlogModule {}
