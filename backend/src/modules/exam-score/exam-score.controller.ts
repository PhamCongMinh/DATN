import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ExamScoreService } from '@modules/exam-score/exam-score.service';

@ApiTags('ExamScore')
@Controller('exam-score')
export class ExamScoreController {
  constructor(
    private examScoreService: ExamScoreService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ExamScoreController');
  }
}
