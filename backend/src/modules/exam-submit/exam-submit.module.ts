import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import { QuestionController } from '@modules/question/question.controller';
import { QuestionService } from '@modules/question/question.service';
import QuestionRepository from '@models/repositories/Question.repository';
import {
  Question,
  QuestionSchema,
  Testcase,
  TestcaseSchema,
} from '@models/entities';
import TestcaseModule from '@modules/testcase/testcase.module';
import TestcaseRepository from '@models/repositories/Testcase.repository';
import QuestionChoiceRepository from '@models/repositories/QuestionChoice.repository';
import {
  QuestionChoice,
  QuestionChoiceSchema,
} from '@models/entities/QuestionChoice.entity';
import { ExamController } from '@modules/exam/exam.controller';
import { ExamService } from '@modules/exam/exam.service';
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
import { ExamSubmitController } from '@modules/exam-submit/exam-submit.controller';
import { ExamSubmitService } from '@modules/exam-submit/exam-submit.service';

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
    ]),
    LoggingModule,
  ],
  controllers: [ExamSubmitController],
  providers: [
    ExamSubmitService,
    ExamRepository,
    QuestionRepository,
    QuestionPointRepository,
    AnswerRepository,
    ExamSubmitRepository,
  ],
  exports: [ExamSubmitService],
})
export default class ExamSubmitModule {}
