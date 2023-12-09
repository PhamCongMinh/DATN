import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { CreateCourseDto } from '@modules/course/dto/create-course.dto';
import CourseRepository from '@models/repositories/Course.repository';
import SectionRepository from '@models/repositories/Section.repository';
import { CreateSectionDto } from '@modules/course/dto/create-section.dto';
import { CreateLessonDto } from '@modules/course/dto/create-lesson.dto';
import LessonRepository from '@models/repositories/Lesson.repository';

@Injectable()
export class CourseService {
  constructor(
    private loggerService: LoggerService,
    private courseRepository: CourseRepository,
    private sectionRepository: SectionRepository,
    private lessonRepository: LessonRepository,
  ) {
    this.loggerService.getLogger('CourseService');
  }

  async createCourse(author_id: string, data: CreateCourseDto) {
    return this.courseRepository.create({
      ...data,
      author_id: author_id,
    });
  }

  async getCourse() {
    return this.courseRepository.getAll();
  }

  async getCourseByAuthor(author_id: string) {
    return this.courseRepository.courseDocument.find({
      author_id: author_id,
    });
  }

  async createSection(data: CreateSectionDto) {
    return this.sectionRepository.create(data);
  }

  async createLesson(data: CreateLessonDto) {
    return this.lessonRepository.create(data);
  }

  async getListStudentInCourse(author_id: string, course_id: string) {
    const course = await this.courseRepository.courseDocument
      .findOne({ _id: course_id })
      .populate('students')
      .exec();

    return course?.students ? course?.students : null;
  }

  async joinCourse(student_id: string, course_id: string) {
    const course = await this.courseRepository.courseDocument
      .findOne({ _id: course_id })
      .exec();

    if (!course?.students) {
      course.students = [student_id];
    } else {
      course.students.push(student_id);
    }

    return course.save();
  }
}
