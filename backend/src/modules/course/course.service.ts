import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { CreateCourseDto } from '@modules/course/dto/create-course.dto';
import CourseRepository from '@models/repositories/Course.repository';

@Injectable()
export class CourseService {
  constructor(
    private loggerService: LoggerService,
    private courseRepository: CourseRepository,
  ) {
    this.loggerService.getLogger('CourseService');
  }

  async createCourse(data: CreateCourseDto) {
    return this.courseRepository.create(data);
  }

  async getCourse() {
    return this.courseRepository.getAll();
  }
}
