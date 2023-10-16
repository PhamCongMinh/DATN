import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import { Comment, CommentSchema } from '@models/entities/Comment.entity';
import { CommentService } from '@modules/comment/comment.service';
import CommentRepository from '@models/repositories/Comment.repository';
import { CommentController } from '@modules/comment/comment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export default class CommentModule {}
