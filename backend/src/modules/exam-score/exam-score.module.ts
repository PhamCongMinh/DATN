import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import QuestionRepository from '@models/repositories/Question.repository';
import { Question, QuestionSchema } from '@models/entities';
import { Exam, ExamSchema } from '@models/entities/Exam.entity';
import {
  QuestionPoint,
  QuestionPointSchema,
} from '@models/entities/QuestionPoint.entity';
import ExamRepository from '@models/repositories/Exam.repository';
import QuestionPointRepository from '@models/repositories/QuestionPoint.repository';
import AnswerRepository from '@models/repositories/Answer.repository';
import ExamSubmitRepository from '@models/repositories/ExamSubmit.repository';
import {
  ExamSubmit,
  ExamSubmitSchema,
} from '@models/entities/ExamSubmit.entity';
import { Answer, AnswerSchema } from '@models/entities/Answer.entity';
import { ExamScoreService } from '@modules/exam-score/exam-score.service';
import { ExamScoreController } from '@modules/exam-score/exam-score.controller';
import { ExamScore, ExamScoreSchema } from '@models/entities/ExamScore.entity';
import ExamScoreRepository from '@models/repositories/ExamScore.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exam.name,
        schema: ExamSchema,
      },
      {
        name: QuestionPoint.name,
        schema: QuestionPointSchema,
      },
      {
        name: Answer.name,
        schema: AnswerSchema,
      },
      {
        name: ExamSubmit.name,
        schema: ExamSubmitSchema,
      },
      {
        name: Question.name,
        schema: QuestionSchema,
      },
      {
        name: ExamScore.name,
        schema: ExamScoreSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [ExamScoreController],
  providers: [
    ExamScoreService,
    ExamScoreRepository,
    ExamRepository,
    QuestionRepository,
    QuestionPointRepository,
    AnswerRepository,
    ExamSubmitRepository,
  ],
  exports: [ExamScoreService],
})
export default class ExamScoreModule {}
