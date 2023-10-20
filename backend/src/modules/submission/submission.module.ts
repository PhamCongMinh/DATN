import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { Module } from '@nestjs/common';
import { Submission, SubmissionSchema } from '@models/entities';
import { SubmissionService } from '@modules/submission/submission.service';
import { SubmissionController } from '@modules/submission/submission.controller';
import SubmissionRepository from '@models/repositories/Submission.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Submission.name,
        schema: SubmissionSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionRepository],
  exports: [SubmissionService],
})
export default class SubmissionModule {}
