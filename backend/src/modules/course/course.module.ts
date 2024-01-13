import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { CourseService } from '@modules/course/course.service';
import { CourseController } from '@modules/course/course.controller';
import { Course, CourseSchema } from '@models/entities/Course.entity';
import CourseRepository from '@models/repositories/Course.repository';
import { Lesson, LessonSchema } from '@models/entities/Lesson.entity';
import { Section, SectionSchema } from '@models/entities/Section.entity';
import SectionRepository from '@models/repositories/Section.repository';
import LessonRepository from '@models/repositories/Lesson.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
      {
        name: Lesson.name,
        schema: LessonSchema,
      },
      {
        name: Section.name,
        schema: SectionSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseRepository,
    LessonRepository,
    SectionRepository,
  ],
  exports: [CourseService],
})
export default class CourseModule {}
