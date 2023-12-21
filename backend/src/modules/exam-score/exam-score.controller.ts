import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Req } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ExamScoreService } from '@modules/exam-score/exam-score.service';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole } from '@models/entities';

@ApiTags('ExamScore')
@Controller('exam-score')
export class ExamScoreController {
  constructor(
    private examScoreService: ExamScoreService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ExamScoreController');
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/exam/chart/:examId')
  async getChartData(@Param('examId') examId: string, @Req() req) {
    return this.examScoreService.getChartData(req.user._id, examId);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/exam/:examId')
  async getListExamScoreInAExam(@Param('examId') examId: string, @Req() req) {
    return this.examScoreService.getListExamScoreInAExam(req.user._id, examId);
  }
}
