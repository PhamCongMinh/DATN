import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { ContestController } from '@modules/contest/contest.controller';
import { ContestService } from '@modules/contest/contest.service';

@Module({
  imports: [MongooseModule.forFeature([]), LoggingModule],
  controllers: [ContestController],
  providers: [ContestService],
  exports: [ContestService],
})
export default class ContestModule {}
