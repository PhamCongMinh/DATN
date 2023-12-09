import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shared/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { CreateCommentDto } from '@modules/comment/dto/request/createCommentDto';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole } from '@models/entities/User.entity';
import { QuestionService } from '@modules/question/question.service';
import { CreateQuestionAboutProgramingDto } from '@modules/question/dto/create-question-about-programing.dto';
import { UpdateQuestionAboutProgramingDto } from '@modules/question/dto/update-question-about-programing.dto';
import { CreateQuizDto } from '@modules/question/dto/create-quiz.dto';
import { GetQuizDto } from '@modules/question/dto/get-quiz.dto';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('QuestionController');
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/programing')
  async createQuestionAboutPrograming(
    @Body() createQuestionAboutProgramingDto: CreateQuestionAboutProgramingDto,
    @Req() req,
  ) {
    return this.questionService.createQuestionAboutPrograming(
      req.user._id,
      createQuestionAboutProgramingDto,
    );
  }

  @UseAuth(Object.values(EUserRole))
  @Put('/programing/:id')
  async updateQuestionAboutPrograming(
    @Param('id') id: string,
    @Body() updateQuestionAboutProgramingDto: UpdateQuestionAboutProgramingDto,
    @Req() req,
  ) {
    return this.questionService.updateQuestionAboutPrograming(
      req.user._id,
      id,
      updateQuestionAboutProgramingDto,
    );
  }

  // @UseAuth(Object.values(EUserRole))
  @Get('/programing/:id')
  async getQuestionAboutProgramingById(@Param('id') id: string) {
    return this.questionService.getQuestionAboutProgramingById(id);
  }

  // @UseAuth(Object.values(EUserRole))
  @Get('/programing')
  async getQuestionAboutPrograming() {
    return this.questionService.getQuestionAboutPrograming();
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/quiz')
  async createQuestionQuiz(@Body() createQuizDto: CreateQuizDto, @Req() req) {
    return this.questionService.createQuestionQuiz(req.user._id, createQuizDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/quiz')
  async getQuestionQuiz(@Query() getQuizDto: GetQuizDto, @Req() req) {
    return this.questionService.getQuestionQuiz(req.user._id, getQuizDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Delete('/quiz/:id')
  async deleteQuestionQuiz(@Param('id') id: string, @Req() req) {
    return this.questionService.deleteQuestionQuiz(req.user._id, id);
  }
}
