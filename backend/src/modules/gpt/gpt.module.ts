import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import {
  Question,
  QuestionSchema,
  Testcase,
  TestcaseSchema,
} from '@models/entities';
import {
  QuestionChoice,
  QuestionChoiceSchema,
} from '@models/entities/QuestionChoice.entity';
import { GptController } from '@modules/gpt/gpt.controller';
import { GptService } from '@modules/gpt/gpt.service';
import QuestionRepository from '@models/repositories/Question.repository';
import TestcaseRepository from '@models/repositories/Testcase.repository';
import QuestionChoiceRepository from '@models/repositories/QuestionChoice.repository';
import { AssetUploadModule } from '@modules/asset-upload/asset-upload.module';

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
    AssetUploadModule,
  ],
  controllers: [GptController],
  providers: [
    GptService,
    QuestionRepository,
    TestcaseRepository,
    QuestionChoiceRepository,
  ],
  exports: [GptService],
})
export default class GptModule {}
