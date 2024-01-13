import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Course, CourseSchema } from '@models/entities/Course.entity';
import CourseRepository from '@models/repositories/Course.repository';
import { Discuss, DiscussSchema } from '@models/entities/Discuss.entity';
import DiscussRepository from '@models/repositories/Discuss.repository';
import { Comment, CommentSchema } from '@models/entities';
import CommentRepository from '@models/repositories/Comment.repository';
import { DiscussController } from '@modules/discuss/discuss.controller';
import { DiscussService } from '@modules/discuss/discuss.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
      {
        name: Discuss.name,
        schema: DiscussSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [DiscussController],
  providers: [
    DiscussService,
    CourseRepository,
    DiscussRepository,
    CommentRepository,
  ],
  exports: [DiscussService],
})
export default class DiscussModule {}
