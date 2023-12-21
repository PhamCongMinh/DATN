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
import { ExamService } from '@modules/exam/exam.service';
import { GetExamDto } from '@modules/exam/dto/get-exam.dto';
import { CreateExamDto } from '@modules/exam/dto/create-exam.dto';
import { ExamSubmitService } from '@modules/exam-submit/exam-submit.service';
import { StartExamDto } from '@modules/exam-submit/dto/start-exam.dto';
import { AnswerQuestionDto } from '@modules/exam-submit/dto/answer-question.dto';

@ApiTags('ExamSubmit')
@Controller('exam-submit')
export class ExamSubmitController {
  constructor(
    private examSubmitService: ExamSubmitService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ExamSubmitController');
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/')
  async startExam(@Body() startExamDto: StartExamDto, @Req() req) {
    return this.examSubmitService.startExam(req.user._id, startExamDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/answer')
  async answerQuestion(
    @Body() answerQuestionDto: AnswerQuestionDto,
    @Req() req,
  ) {
    return this.examSubmitService.answerQuestion(
      req.user._id,
      answerQuestionDto,
    );
  }

  @UseAuth(Object.values(EUserRole))
  @Put('/end/:exam_submit_id')
  async confirmEndOfSubmitExam(
    @Req() req,
    @Param('exam_submit_id') exam_submit_id: string,
  ) {
    return this.examSubmitService.confirmEndOfSubmitExam(
      req.user._id,
      exam_submit_id,
    );
  }
}
