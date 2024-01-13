import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole } from '@models/entities/User.entity';
import { SubmissionService } from '@modules/submission/submission.service';
import { CreateSubmissionDto } from '@modules/submission/dto/create-submission.dto';

@ApiTags('Submission')
@Controller('submission')
export class SubmissionController {
  constructor(
    private submissionService: SubmissionService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('SubmissionController');
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/')
  async create(@Body() createSubmissionDto: CreateSubmissionDto, @Req() req) {
    return this.submissionService.create(req.user._id, createSubmissionDto);
  }

  @Get('/question/:id')
  async getSubmissionByQuestionId(@Param('id') id: string) {
    return this.submissionService.getSubmissionByQuestionId(id);
  }
}
