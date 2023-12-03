import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '@modules/course/course.service';
import { CreateCourseDto } from '@modules/course/dto/create-course.dto';
import { CreateSectionDto } from '@modules/course/dto/create-section.dto';
import { CreateLessonDto } from '@modules/course/dto/create-lesson.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private courseService: CourseService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('CourseController');
  }

  @Post('/')
  async createCourse(@Body() data: CreateCourseDto) {
    return this.courseService.createCourse(data);
  }

  @Get('/')
  async getCourse() {
    return this.courseService.getCourse();
  }

  @Post('/section')
  async createSection(@Body() data: CreateSectionDto) {
    return this.courseService.createSection(data);
  }

  @Post('/lesson')
  async createLesson(@Body() data: CreateLessonDto) {
    return this.courseService.createLesson(data);
  }
}
