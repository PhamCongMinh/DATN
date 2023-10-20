import { Module } from '@nestjs/common';
import { JuggingEngineService } from '@modules/judging-engine/jugging-engine.service';
import { JuggingEngineConsole } from '@modules/judging-engine/jugging-engine.console';
import SubmissionRepository from '@models/repositories/Submission.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Question,
  QuestionSchema,
  Submission,
  SubmissionSchema,
  Testcase,
  TestcaseSchema,
} from '@models/entities';
import QuestionRepository from '@models/repositories/Question.repository';
import TestcaseRepository from '@models/repositories/Testcase.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Submission.name,
        schema: SubmissionSchema,
      },
      {
        name: Question.name,
        schema: QuestionSchema,
      },
      {
        name: Testcase.name,
        schema: TestcaseSchema,
      },
    ]),
  ],
  providers: [
    JuggingEngineService,
    JuggingEngineConsole,
    SubmissionRepository,
    QuestionRepository,
    TestcaseRepository,
  ],
  exports: [],
})
export class JuggingEngineModule {}
