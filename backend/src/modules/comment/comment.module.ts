import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import { Comment, CommentSchema } from '@models/entities/Comment.entity';
import { CommentService } from '@modules/comment/comment.service';
import CommentRepository from '@models/repositories/Comment.repository';
import { CommentController } from '@modules/comment/comment.controller';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { RentalNews, RentalNewsSchema } from '@models/entities/RentalNews';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
      {
        name: RentalNews.name,
        schema: RentalNewsSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, RentalNewsRepository],
  exports: [CommentService],
})
export default class CommentModule {}
