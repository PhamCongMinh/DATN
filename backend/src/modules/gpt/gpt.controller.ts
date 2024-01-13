import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { GptService } from '@modules/gpt/gpt.service';
import { ImportQuestionDto } from '@modules/gpt/dto/import-question.dto';

@ApiTags('AI')
@Controller('ai')
export class GptController {
  constructor(
    private gptService: GptService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('GptController');
  }

  @Post('/import-question')
  async getQuestionInFileWithAI(@Body() dto: ImportQuestionDto) {
    return this.gptService.getQuestionInFileWithAI(dto);
  }
}
