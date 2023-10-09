import { Injectable } from '@nestjs/common';
import BlogRepository from '@models/repositories/Blog.repository';
import CommentRepository from '@models/repositories/Comment.repository';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { CreateCommentDto } from '@modules/comment/dto/request/createCommentDto';
import { Comment } from '@models/entities/Comment.entity';
import { RentOutService } from '@modules/rent-out/rent-out.service';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private rentalNewsRepository: RentalNewsRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('CommentService');
  }

  async createComment(ownerId: string, createCommentDto: CreateCommentDto) {
    const commentData: Comment = {
      content: createCommentDto.content,
      rate: createCommentDto.rate,
      ownerId,
    };

    const newComment = await this.commentRepository.commentDocumentModel.create(
      commentData,
    );

    const rentalNews = await this.rentalNewsRepository.rentalNewsDocument.find({
      _id: createCommentDto.rentNewsId,
    });
    const listCommentsInRentalNews = rentalNews[0].comments;
    listCommentsInRentalNews.push(newComment._id);

    await this.rentalNewsRepository.rentalNewsDocument.updateOne(
      {
        _id: createCommentDto.rentNewsId,
      },
      { comments: listCommentsInRentalNews },
    );

    return newComment;
  }
}
