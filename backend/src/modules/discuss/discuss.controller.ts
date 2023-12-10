import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '@modules/course/course.service';
import { CreateCourseDto } from '@modules/course/dto/create-course.dto';
import { CreateSectionDto } from '@modules/course/dto/create-section.dto';
import { CreateLessonDto } from '@modules/course/dto/create-lesson.dto';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole } from '@models/entities';
import { DiscussService } from '@modules/discuss/discuss.service';
import { CreateDiscussDto } from '@modules/discuss/dto/create-discuss.dto';

@ApiTags('Discuss')
@Controller('discuss')
export class DiscussController {
  constructor(
    private discussService: DiscussService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('DiscussController');
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/')
  async createCourse(@Req() req, @Body() data: CreateDiscussDto) {
    return this.discussService.createDiscuss(req.user._id, data);
  }

  @Get('/')
  async getCourse() {
    return this.discussService.getDiscuss();
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/course/:id')
  async getListDiscussInCourse(@Req() req, @Param('id') id: string) {
    return this.discussService.getListDiscussInCourse(req.user._id, id);
  }
}
