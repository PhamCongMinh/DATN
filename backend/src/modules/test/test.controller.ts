import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { TestService } from '@modules/test/test.service';
import { CreateConferenceDto } from '@modules/test/dto/request/test.dto';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(
    private testService: TestService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('TestController');
  }

  @Post('/')
  async createBlog(@Body() CreateConferenceDto: CreateConferenceDto) {
    return this.testService.createConference(CreateConferenceDto);
  }

  @Get('/')
  async getBlog() {
    return this.testService.getAllConference();
  }
}
