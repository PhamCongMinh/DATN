import { Command, Console } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { JuggingEngineService } from '@modules/judging-engine/jugging-engine.service';
import { JUGGING_ENGINE_QUEUE_NAME } from '@constants/queue.constant';
import { keyConfigRedis } from '@config/redis.config';
import { BullLib } from '@shared/utils/bull.lib';
import { DoneCallback, Job } from 'bull';
import { ISubmissionJob } from '@modules/judging-engine/interface';
import SubmissionRepository from '@models/repositories/Submission.repository';
import QuestionRepository from '@models/repositories/Question.repository';
import { ESubmissionStatus } from '@constants/submission.constant';

@Console()
export class JuggingEngineConsole {
  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
    private juggingEngineService: JuggingEngineService,
    private submissionRepository: SubmissionRepository,
    private questionRepository: QuestionRepository,
  ) {
    // this.allocation_job_sleep_time = this.configService.get<number>(
    //   EEnvKey.MAX_ALLOCATION_JOB_SLEEP_TIME,
    // );
  }
  private logger = this.loggerService.getLogger('JuggingEngineConsole');

  @Command({
    command: 'judging-engine',
    description: 'run judging engine to check submission with list testcases',
  })
  async judge() {
    this.logger.info(`Start judging engine`);
    const queue = await BullLib.createNewQueue(
      JUGGING_ENGINE_QUEUE_NAME,
      this.configService.get(keyConfigRedis),
    );

    await queue.process(
      async (job: Job<ISubmissionJob>, done: DoneCallback) => {
        try {
          this.logger.info(`Handle job\n`, job.data);

          const submission = await this.submissionRepository.findById(
            job.data.submission_id,
          );

          this.logger.info(`Submission\n`, submission);

          const question = await this.questionRepository.findById(
            submission.question_id,
          );
          this.logger.info(`Question\n`, question);

          const passedTestcaseNumber =
            await this.juggingEngineService.evaluateSubmissionWithTestCase(
              submission.language,
              submission.source,
              question.test_cases,
            );

          const totalTestCases = question.test_cases.length;
          const score = (passedTestcaseNumber / totalTestCases) * 100;
          this.logger.info(
            `totalScore/totalTestCases`,
            `${passedTestcaseNumber}/${totalTestCases}`,
          );

          await this.submissionRepository.update(submission._id, {
            score: score,
            status:
              passedTestcaseNumber === 0
                ? ESubmissionStatus.WRONG_ANSWER
                : passedTestcaseNumber === totalTestCases
                ? ESubmissionStatus.ACCEPTED
                : ESubmissionStatus.NOT_CORRECT_WITH_ALL_TEST_CASES,
            passed_testcase_number: passedTestcaseNumber,
          });

          this.logger.info(
            'Update submission with score and status successfully',
          );

          done();
        } catch (err) {
          this.logger.error(err);
          done(err);
        }
      },
    );
  }
}
