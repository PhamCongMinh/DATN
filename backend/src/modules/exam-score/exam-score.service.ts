import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import QuestionRepository from '@models/repositories/Question.repository';
import QuestionPointRepository from '@models/repositories/QuestionPoint.repository';
import ExamRepository from '@models/repositories/Exam.repository';
import ExamSubmitRepository from '@models/repositories/ExamSubmit.repository';
import AnswerRepository from '@models/repositories/Answer.repository';
import ExamScoreRepository from '@models/repositories/ExamScore.repository';

@Injectable()
export class ExamScoreService {
  constructor(
    private questionPointRepository: QuestionPointRepository,
    private loggerService: LoggerService,
    private examRepository: ExamRepository,
    private examSubmitRepository: ExamSubmitRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private examScoreRepository: ExamScoreRepository,
  ) {
    this.loggerService.getLogger('ExamScoreService');
  }

  async getListExamScoreInAExam(userId: string, examId: string) {
    return this.examScoreRepository.examScoreModel
      .find({
        exam: examId,
      })
      .populate('exam_submit')
      .populate('author_id')
      .populate('exam')
      .exec();
  }
}
