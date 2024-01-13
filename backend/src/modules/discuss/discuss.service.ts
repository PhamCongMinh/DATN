import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { CreateCourseDto } from '@modules/course/dto/create-course.dto';
import CourseRepository from '@models/repositories/Course.repository';
import SectionRepository from '@models/repositories/Section.repository';
import { CreateSectionDto } from '@modules/course/dto/create-section.dto';
import { CreateLessonDto } from '@modules/course/dto/create-lesson.dto';
import LessonRepository from '@models/repositories/Lesson.repository';
import { CreateDiscussDto } from '@modules/discuss/dto/create-discuss.dto';
import CommentRepository from '@models/repositories/Comment.repository';
import DiscussRepository from '@models/repositories/Discuss.repository';

@Injectable()
export class DiscussService {
  constructor(
    private loggerService: LoggerService,
    private courseRepository: CourseRepository,
    private discussRepository: DiscussRepository,
    private commentRepository: CommentRepository,
  ) {
    this.loggerService.getLogger('CourseService');
  }

  async createDiscuss(author_id: string, data: CreateDiscussDto) {
    const course = await this.courseRepository.findById(data.course_id);
    if (!course) {
      throw new Error('Course not found');
    }

    const discuss = await this.discussRepository.create({
      title: data.title,
      content: data.content,
      author_id: author_id,
    });

    await this.courseRepository.courseDocument.updateOne(
      {
        _id: data.course_id,
      },
      {
        $push: {
          discusses: discuss._id,
        },
      },
    );
    return discuss;
  }

  async getDiscuss() {
    return this.discussRepository.getAll();
  }

  async getListDiscussInCourse(author_id: string, course_id: string) {
    const course = await this.courseRepository.courseDocument
      .findOne({ _id: course_id })
      .populate('discusses')
      .exec();

    return course?.discusses ? course?.discusses : null;
  }
}
