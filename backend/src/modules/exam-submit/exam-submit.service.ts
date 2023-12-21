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
import { BadRequestException } from '@shared/exception';
import { AuthErrorMessage } from '@modules/auth/constants';
import { EQuestionType } from '@constants/questions.constant';

@Injectable()
export class ExamSubmitService {
  constructor(
    private questionPointRepository: QuestionPointRepository,
    private loggerService: LoggerService,
    private examRepository: ExamRepository,
    private examSubmitRepository: ExamSubmitRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
  ) {
    this.loggerService.getLogger('ExamSubmitService');
  }

  async startExam(user_id: string, startExamDto: StartExamDto) {
    const exam = await this.examRepository.findById(startExamDto.exam_id);

    if (!exam) throw new BadRequestException({ message: 'Exam not found' });
    if (exam?.password !== startExamDto.password)
      throw new BadRequestException({ message: 'Wrong password' });

    if (exam.start_time > new Date())
      throw new BadRequestException({ message: 'Exam not started' });
    if (exam.end_time < new Date())
      throw new BadRequestException({ message: 'Exam ended' });

    const exam_submit = await this.examSubmitRepository.examSubmitDocumentModel
      .findOne({
        author_id: user_id,
        exam: exam._id,
      })
      .exec();

    if (exam_submit) {
      if (exam_submit.status === EExamSubmitStatus.DONE)
        throw new BadRequestException({ message: 'Exam is done' });
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

    const question_point = await this.questionPointRepository.findById(
      answerQuestionDto.question_point,
    );

    if (!question_point) throw new Error('Question not found');

    const question = await this.questionRepository.questionDocument
      .findOne({
        _id: question_point.question_id,
      })
      .populate('question_choice')
      .exec();

    const isExistAnswer = await this.answerRepository.answerDocumentModel
      .findOne({
        author_id: user_id,
        question_point: question_point._id,
      })
      .exec();

    const questionType = question?.type;
    const is_auto_check = question_point?.automatically_graded;
    let is_correct_answer = false;

    if (is_auto_check) {
      switch (questionType) {
        case EQuestionType.ONE_CHOICE:
        case EQuestionType.TRUE_FALSE: {
          const correctAnswer = question?.question_choice?.filter(
            (choice) => choice['is_correct'] === true,
          );

          if (
            correctAnswer[0]['_id'] == answerQuestionDto?.question_choice[0]
          ) {
            is_correct_answer = true;
            await this.examSubmitRepository.update(exam_submit._id, {
              score: exam_submit.score + question_point?.point,
              correct_answer: exam_submit.correct_answer + 1,
            });
          } else if (
            isExistAnswer &&
            isExistAnswer?.is_correct_answer === true
          ) {
            await this.examSubmitRepository.update(exam_submit._id, {
              score: exam_submit.score - question_point?.point,
              correct_answer: exam_submit.correct_answer - 1,
            });
          }
          break;
        }
        case EQuestionType.SHORT_ANSWER: {
          if (
            answerQuestionDto?.answer.toLowerCase() ==
            question?.answer.toLowerCase()
          ) {
            is_correct_answer = true;
            await this.examSubmitRepository.update(exam_submit._id, {
              score: exam_submit.score + question_point?.point,
              correct_answer: exam_submit.correct_answer + 1,
            });
          } else if (
            isExistAnswer &&
            isExistAnswer?.is_correct_answer === true
          ) {
            await this.examSubmitRepository.update(exam_submit._id, {
              score: exam_submit.score - question_point?.point,
              correct_answer: exam_submit.correct_answer - 1,
            });
          }
          break;
        }
        case EQuestionType.MULTIPLE_CHOICE: {
          const correctAnswer = question?.question_choice?.filter(
            (choice) => choice['is_correct'] === true,
          );

          if (
            answerQuestionDto?.question_choice.length ===
              correctAnswer.length &&
            answerQuestionDto?.question_choice.every((choice: string) =>
              correctAnswer.some((answer) => answer['_id'] == choice),
            )
          ) {
            is_correct_answer = true;
            await this.examSubmitRepository.update(exam_submit._id, {
              score: exam_submit.score + question_point?.point,
              correct_answer: exam_submit.correct_answer + 1,
            });
          } else if (
            isExistAnswer &&
            isExistAnswer?.is_correct_answer === true
          ) {
            await this.examSubmitRepository.update(exam_submit._id, {
              score: exam_submit.score - question_point?.point,
              correct_answer: exam_submit.correct_answer - 1,
            });
          }
          break;
        }
      }
    }

    if (isExistAnswer) {
      const updatedAnswer = await this.answerRepository.update(
        isExistAnswer._id,
        {
          is_correct_answer: is_correct_answer,
          question_choice: answerQuestionDto?.question_choice,
          answer: answerQuestionDto?.answer,
        },
      );

      return updatedAnswer;
    } else {
      const answer = await this.answerRepository.create({
        author_id: user_id,
        question_point: question_point._id,
        question_choice: answerQuestionDto?.question_choice,
        answer: answerQuestionDto?.answer,
        is_correct_answer: is_correct_answer,
      });

      const newListSubmitAnswer = [];
      if (exam_submit?.answers) {
        for (const answer_id of exam_submit?.answers) {
          newListSubmitAnswer.push(answer_id);
        }
      }
      newListSubmitAnswer.push(answer._id);

      await this.examSubmitRepository.update(exam_submit._id, {
        answers: newListSubmitAnswer,
      });

      return answer;
    }
  }

  async confirmEndOfSubmitExam(user_id: string, exam_submit_id: string) {
    const exam_submit = await this.examSubmitRepository.examSubmitDocumentModel
      .findOne({
        _id: exam_submit_id,
        author_id: user_id,
      })
      .exec();

    if (!exam_submit) throw new Error('ExamSubmit not found');

    if (exam_submit.status === EExamSubmitStatus.DONE)
      throw new Error('Exam is done');

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
    if (exam.end_time < new Date()) throw new Error('Submit time is over');

    return await this.examSubmitRepository.update(exam_submit._id, {
      status: EExamSubmitStatus.DONE,
      end_time: new Date(),
    });
  }
}
