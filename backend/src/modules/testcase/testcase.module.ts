import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { MulterModule } from '@nestjs/platform-express';
import { TestcaseService } from '@modules/testcase/testcase.service';
import { TestcaseController } from '@modules/testcase/testcase.controller';
import {
  Question,
  QuestionSchema,
  Submission,
  SubmissionSchema,
  Testcase,
  TestcaseSchema,
} from '@models/entities';
import TestcaseRepository from '@models/repositories/Testcase.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Question.name,
        schema: QuestionSchema,
      },
      {
        name: Submission.name,
        schema: SubmissionSchema,
      },
      {
        name: Testcase.name,
        schema: TestcaseSchema,
      },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'src/upload',
      }),
    }),
    LoggingModule,
  ],
  controllers: [TestcaseController],
  providers: [TestcaseService, TestcaseRepository],
  exports: [TestcaseService],
})
export default class TestcaseModule {}
