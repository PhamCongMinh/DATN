import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import QuestionRepository from '@models/repositories/Question.repository';
import { CreateQuestionAboutProgramingDto } from '@modules/question/dto/create-question-about-programing.dto';
import { UpdateQuestionAboutProgramingDto } from '@modules/question/dto/update-question-about-programing.dto';
import TestcaseRepository from '@models/repositories/Testcase.repository';
import { CreateQuizDto } from '@modules/question/dto/create-quiz.dto';
import QuestionChoiceRepository from '@models/repositories/QuestionChoice.repository';
import { GetQuizDto } from '@modules/question/dto/get-quiz.dto';
import QuestionPointRepository from '@models/repositories/QuestionPoint.repository';
import ExamRepository from '@models/repositories/Exam.repository';
import { GetExamDto } from '@modules/exam/dto/get-exam.dto';
import { CreateExamDto } from '@modules/exam/dto/create-exam.dto';

@Injectable()
export class ExamSubmitService {
  constructor(
    private questionPointRepository: QuestionPointRepository,
    private loggerService: LoggerService,
    private examRepository: ExamRepository,
  ) {
    this.loggerService.getLogger('ExamSubmitService');
  }

  // async createExam(author_id: string, createExamDto: CreateExamDto) {
  //   let listQuestionPointId = [];
  //   if (
  //     createExamDto?.question_point &&
  //     createExamDto?.question_point.length > 0
  //   ) {
  //     listQuestionPointId = await Promise.all(
  //       createExamDto.question_point.map(async (question_point) => {
  //         const newQuestionPoint = await this.questionPointRepository.create({
  //           ...question_point,
  //           author_id: author_id,
  //         });
  //         return newQuestionPoint._id;
  //       }),
  //     );
  //   }
  //
  //   delete createExamDto.question_point;
  //
  //   const newExam = await this.examRepository.create({
  //     ...createExamDto,
  //     author_id: author_id,
  //     question_point: listQuestionPointId,
  //   });
  //
  //   return newExam;
  // }
  //
  // async getExamInACourse(author_id: string, getExamDto: GetExamDto) {
  //   const query = {
  //     author_id: author_id,
  //     course_id: getExamDto.course_id,
  //   };
  //
  //   if (getExamDto?.search) {
  //     query['$text'] = { $search: getExamDto.search };
  //   }
  //
  //   return this.examRepository.examDocumentModel
  //     .find(query)
  //     .populate('question_point')
  //     .exec();
  // }
  //
  // async deleteExam(author_id: string, exam_id: string) {
  //   const exam = await this.examRepository.findById(exam_id);
  //
  //   if (exam.question_point.length > 0)
  //     for (const question_point_id of exam.question_point) {
  //       await this.questionPointRepository.delete(question_point_id);
  //     }
  //
  //   return this.examRepository.delete(exam_id);
  // }
  //
  // async getExamById(user_id: string, exam_id: string) {
  //   return this.examRepository.examDocumentModel
  //     .findOne({
  //       _id: exam_id,
  //     })
  //     .populate({
  //       path: 'question_point',
  //       populate: {
  //         path: 'question_id',
  //         populate: {
  //           path: 'question_choice',
  //         },
  //       },
  //     })
  //     .exec();
  // }
  //
  // async updateExam(
  //   author_id: string,
  //   exam_id: string,
  //   createExamDto: CreateExamDto,
  // ) {
  //   const exam = await this.examRepository.findById(exam_id);
  //
  //   if (exam.question_point.length > 0)
  //     for (const question_point_id of exam.question_point) {
  //       await this.questionPointRepository.delete(question_point_id);
  //     }
  //
  //   return this.createExam(author_id, createExamDto);
  // }
}
