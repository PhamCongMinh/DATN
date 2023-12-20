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
import { StartExamDto } from '@modules/exam-submit/dto/start-exam.dto';
import ExamSubmitRepository from '@models/repositories/ExamSubmit.repository';
import { EExamSubmitStatus } from '@models/entities/ExamSubmit.entity';
import { AnswerQuestionDto } from '@modules/exam-submit/dto/answer-question.dto';
import AnswerRepository from '@models/repositories/Answer.repository';

@Injectable()
export class ExamSubmitService {
  constructor(
    private questionPointRepository: QuestionPointRepository,
    private loggerService: LoggerService,
    private examRepository: ExamRepository,
    private examSubmitRepository: ExamSubmitRepository,
    private answerRepository: AnswerRepository,
  ) {
    this.loggerService.getLogger('ExamSubmitService');
  }

  async startExam(user_id: string, startExamDto: StartExamDto) {
    const exam = await this.examRepository.findById(startExamDto.exam_id);

    if (!exam) throw new Error('Exam not found');
    if (exam?.password !== startExamDto.password)
      throw new Error('Wrong password');

    if (exam.start_time > new Date()) throw new Error('Exam not started');
    if (exam.end_time < new Date()) throw new Error('Exam ended');

    const exam_submit = await this.examSubmitRepository.examSubmitDocumentModel
      .findOne({
        author_id: user_id,
        exam: exam._id,
      })
      .exec();

    if (exam_submit) {
      if (exam_submit.status === EExamSubmitStatus.DONE)
        throw new Error('Exam is done');
      else return exam_submit;
    }

    return this.examSubmitRepository.create({
      author_id: user_id,
      exam: exam._id,
      status: EExamSubmitStatus.DOING,
      start_time: new Date(),
      end_time: new Date(new Date().getTime() + exam.exam_time * 60 * 1000),
      score: 0,
      correct_answer: 0,
    });
  }

  async answerQuestion(user_id: string, answerQuestionDto: AnswerQuestionDto) {
    const exam_submit = await this.examSubmitRepository.examSubmitDocumentModel
      .findOne({
        _id: answerQuestionDto.exam_submit,
      })
      .exec();

    if (!exam_submit) throw new Error('Exam not found');

    if (exam_submit.status === EExamSubmitStatus.DONE)
      throw new Error('Exam is done');

    const question_point = await this.questionPointRepository.findById(
      answerQuestionDto.question_point,
    );

    if (!question_point) throw new Error('Question not found');

    const exam = await this.examRepository.examDocumentModel
      .findOne({
        _id: exam_submit.exam,
      })
      .populate({
        path: 'question_point',
        populate: {
          path: 'question_id',
          populate: {
            path: 'question_choice',
          },
        },
      })
      .exec();

    if (!exam) throw new Error('Exam not found');

    // if (
    //   exam?.question_point?.filter(
    //     (item) => item['_id'].toString() === question_point._id.toString(),
    //   ).length === 0
    // )
    //   throw new Error('Question not in exam');
    //
    // if (question_point.question_id.question_type === 'MULTIPLE_CHOICE') {
    //   if (
    //     question_point.question_id.question_choice.length !==
    //     answerQuestionDto.question_choice.length
    //   )
    //     throw new Error('Wrong answer');
    //
    //   for (const question_choice_id of answerQuestionDto.question_choice) {
    //     const question_choice = await this.questionChoiceRepository.findById(
    //       question_choice_id,
    //     );
    //
    //     if (!question_choice) throw new Error('Question choice not found');
    //
    //     if (
    //       question_choice.question_id.toString() !==
    //       question_point.question_id._id.toString()
    //     )
    //       throw new Error('Question choice not in question');
    //
    //     if (!question_choice.is_correct) throw new Error('Wrong answer');
    //   }
    // } else {
    //   if (!answerQuestionDto.answer) throw new Error('Wrong answer');
    //
    //   if (
    //     question_point.question_id.question_answer !== answerQuestionDto.answer
    //   )
    //     throw new Error('Wrong answer');
    // }

    const answer = await this.answerRepository.create({
      author_id: user_id,
      question_point: question_point._id,
      question_choice: answerQuestionDto.question_choice,
      answer: answerQuestionDto.answer,
    });

    exam_submit.answers.push(answer._id);

    await this.examSubmitRepository.update(exam_submit._id, exam_submit);

    return answer;
  }

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
