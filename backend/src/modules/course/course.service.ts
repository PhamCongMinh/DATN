import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { CreateCourseDto } from '@modules/course/dto/create-course.dto';
import CourseRepository from '@models/repositories/Course.repository';
import SectionRepository from '@models/repositories/Section.repository';
import { CreateSectionDto } from '@modules/course/dto/create-section.dto';
import { CreateLessonDto } from '@modules/course/dto/create-lesson.dto';
import LessonRepository from '@models/repositories/Lesson.repository';
import { string } from 'joi';
import { GetMyCourseDto } from '@modules/course/dto/get-my-course.dto';

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
    const { course_image, ...rest } = data;
    return this.courseRepository.create({
      ...rest,
      author_id: author_id,
      course_image: course_image ? course_image._id : null,
    });
  }

  async getCourse(getMyCourseDto: GetMyCourseDto) {
    if (getMyCourseDto?.is_contest) {
      return this.courseRepository.courseDocument.find({
        is_contest: getMyCourseDto.is_contest,
      });
    } else {
      return this.courseRepository.courseDocument.find({
        is_contest: false,
      });
    }
  }

  async getCourseByAuthor(author_id: string, getMyCourseDto: GetMyCourseDto) {
    if (getMyCourseDto?.is_contest) {
      return this.courseRepository.courseDocument.find({
        author_id: author_id,
        is_contest: getMyCourseDto.is_contest,
      });
    } else {
      return this.courseRepository.courseDocument.find({
        author_id: author_id,
        is_contest: false,
      });
    }
  }

  async createSection(data: CreateSectionDto) {
    return this.sectionRepository.create(data);
  }

  async createLesson(data: CreateLessonDto) {
    const { _id, documents, exam, ...rest } = data;
    const lesson = await this.lessonRepository.create({
      ...rest,
      exam: exam ? exam : null,
      documents: documents ? documents._id : null,
    });

    await this.sectionRepository.update(data.section_id, {
      $push: { lessons: lesson.id },
    });
    return lesson;
  }

  async editLesson(lesson_id: string, data: CreateLessonDto) {
    const { documents, exam, ...rest } = data;
    const lesson = await this.lessonRepository.update(lesson_id, {
      ...rest,
      exam: exam ? exam : null,
      documents: documents ? documents._id : null,
    });

    return lesson;
  }

  async deleteLesson(lesson_id: string) {
    const lesson = await this.lessonRepository.findById(lesson_id);
    await this.sectionRepository.update(lesson.section_id, {
      $pull: { lessons: lesson_id },
    });

    return await this.lessonRepository.delete(lesson_id);
  }

  async getLessonById(lesson_id: string) {
    return this.lessonRepository.lessonDocument
      .find({
        _id: lesson_id,
      })
      .populate('documents')
      .exec();
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

  async getContentInACourse(course_id: string) {
    const sections = await this.sectionRepository.sectionDocument
      .find({
        course_id: course_id,
      })
      .populate({
        path: 'lessons',
        populate: {
          path: 'documents',
        },
      })
      .sort({ order: 1 })
      .exec();

    return sections;
  }

  async deleteSection(section_id: string) {
    return this.sectionRepository.delete(section_id);
  }

  async updateSection(section_id: string, data: CreateSectionDto) {
    return this.sectionRepository.update(section_id, data);
  }

  async getJoinedCourse(student_id: string, getMyCourseDto: GetMyCourseDto) {
    if (getMyCourseDto?.is_contest) {
      return this.courseRepository.courseDocument.find({
        students: { $in: [student_id] },
        is_contest: getMyCourseDto.is_contest,
      });
    } else {
      return this.courseRepository.courseDocument
        .find({
          students: { $in: [student_id] },
          is_contest: false,
        })
        .exec();
    }
  }

  async checkJoinedCourse(student_id: string, course_id: string) {
    const course = await this.courseRepository.courseDocument
      .findOne({ _id: course_id })
      .exec();

    if (course?.students.includes(student_id))
      return {
        is_joined: true,
      };
    return {
      is_joined: false,
    };
  }
}
