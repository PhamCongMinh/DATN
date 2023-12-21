import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import QuestionRepository from '@models/repositories/Question.repository';
import QuestionPointRepository from '@models/repositories/QuestionPoint.repository';
import ExamRepository from '@models/repositories/Exam.repository';
import ExamSubmitRepository from '@models/repositories/ExamSubmit.repository';
import AnswerRepository from '@models/repositories/Answer.repository';

@Injectable()
export class ExamScoreService {
  constructor(
    private questionPointRepository: QuestionPointRepository,
    private loggerService: LoggerService,
    private examRepository: ExamRepository,
    private examSubmitRepository: ExamSubmitRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {
    this.loggerService.getLogger('ExamScoreService');
  }
}
