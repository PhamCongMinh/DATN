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

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
      {
        name: Testcase.name,
        schema: TestcaseSchema,
      },
      {
        name: QuestionChoice.name,
        schema: QuestionChoiceSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    QuestionRepository,
    TestcaseRepository,
    QuestionChoiceRepository,
  ],
  exports: [QuestionService],
})
export default class QuestionModule {}
