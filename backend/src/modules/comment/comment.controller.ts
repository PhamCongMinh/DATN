import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { Comment } from '@models/entities/Comment.entity';
import { CreateCommentDto } from '@modules/comment/dto/request/createCommentDto';
import { CommentService } from '@modules/comment/comment.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('CommentController');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @Post('/')
  async createComment(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    console.log(createCommentDto);
    return this.commentService.createComment(req.user.id, createCommentDto);
  }
}
