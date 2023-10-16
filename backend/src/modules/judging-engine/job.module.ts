import { Module } from '@nestjs/common';
import { JobService } from '@modules/judging-engine/job.service';
import { JobConsole } from '@modules/judging-engine/job.console';

@Module({
  imports: [],
  providers: [JobService, JobConsole],
  exports: [],
})
export class JobModule {}
