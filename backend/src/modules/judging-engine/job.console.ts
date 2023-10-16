import { Command, Console } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { JobService } from '@modules/judging-engine/job.service';
import { sleep } from '@shared/utils/promise';

@Console()
export class JobConsole {
  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
    private jobService: JobService,
  ) {
    // this.allocation_job_sleep_time = this.configService.get<number>(
    //   EEnvKey.MAX_ALLOCATION_JOB_SLEEP_TIME,
    // );
  }
  private logger = this.loggerService.getLogger('JobConsole');

  @Command({
    command: 'judging-engine',
    description: 'run judging engine to check submission with list testcases',
  })
  async judge() {
    this.logger.info(`Start judging engine`);
    while (1) {
      console.log('Running judging engine');
      await sleep(1000);
    }
  }

  // @Command({
  //   command: 'calculate-max-allocation',
  //   description: 'calculate max allocation of each user in each project',
  // })
  // async jobCalculateMaxAllocation() {
  //   getHealthApi(
  //     EEnvKey.MAX_ALLOCATION_CALCULATION_PORT,
  //     'maxAllocationHealth',
  //   );
  //   while (1) {
  //     this.logger.info(`Start check and calculate max allocation`);
  //     await this.jobService.jobCalculateMaxAllocation();
  //   }
  // }
}
