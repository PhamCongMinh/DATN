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

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(
    private examService: ExamService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ExamController');
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/')
  async createExam(@Body() createExamDto: CreateExamDto, @Req() req) {
    return this.examService.createExam(req.user._id, createExamDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/')
  async getExamInACourse(@Query() getExamDto: GetExamDto, @Req() req) {
    return this.examService.getExamInACourse(req.user._id, getExamDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Delete('/:id')
  async deleteExam(@Param('id') id: string, @Req() req) {
    return this.examService.deleteExam(req.user._id, id);
  }

  @UseAuth(Object.values(EUserRole))
  @Put('/:id')
  async updateExam(
    @Param('id') id: string,
    @Body() createExamDto: CreateExamDto,
    @Req() req,
  ) {
    return this.examService.updateExam(req.user._id, id, createExamDto);
  }
}
