import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { CourseService } from '@modules/course/course.service';
import { CourseController } from '@modules/course/course.controller';
import { Course, CourseSchema } from '@models/entities/Course.entity';
import CourseRepository from '@models/repositories/Course.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export default class CourseModule {}
