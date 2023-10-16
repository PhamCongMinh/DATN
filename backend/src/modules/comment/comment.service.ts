import { Injectable } from '@nestjs/common';
import CommentRepository from '@models/repositories/Comment.repository';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { CreateCommentDto } from '@modules/comment/dto/request/createCommentDto';

@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('CommentService');
  }

  async createComment(ownerId: string, createCommentDto: CreateCommentDto) {
    return;
  }
}
