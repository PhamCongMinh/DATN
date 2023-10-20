import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import SubmissionRepository from '@models/repositories/Submission.repository';
import { CreateSubmissionDto } from '@modules/submission/dto/create-submission.dto';
import { keyConfigRedis } from '@config/redis.config';
import { BullLib } from '@shared/utils/bull.lib';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { JUGGING_ENGINE_QUEUE_NAME } from '@constants/queue.constant';
import { ISubmissionJob } from '@modules/judging-engine/interface';

@Injectable()
export class SubmissionService {
  private queue: Queue;

  constructor(
    private configService: ConfigService,
    private submissionRepository: SubmissionRepository,
    private loggerService: LoggerService,
  ) {
    this.queue = BullLib.createNewQueue(
      JUGGING_ENGINE_QUEUE_NAME,
      this.configService.get(keyConfigRedis),
    );
  }
  private logger = this.loggerService.getLogger('SubmissionService');
  async create(author_id: string, createSubmissionDto: CreateSubmissionDto) {
    const newSubmission = await this.submissionRepository.create({
      ...createSubmissionDto,
      author_id: author_id,
    });

    this.logger.info('Create job: ');
    const job: ISubmissionJob = {
      submission_id: newSubmission._id,
    };
    await this.queue.add(job);

    return newSubmission;
  }

  async getSubmissionByQuestionId(question_id: string) {
    return this.submissionRepository.getSubmissionByQuestionId(question_id);
  }
}
