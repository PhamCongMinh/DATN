import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import QuestionRepository from '@models/repositories/Question.repository';
import { CreateQuestionAboutProgramingDto } from '@modules/question/dto/create-question-about-programing.dto';
import { UpdateQuestionAboutProgramingDto } from '@modules/question/dto/update-question-about-programing.dto';
import TestcaseRepository from '@models/repositories/Testcase.repository';
import { CreateQuizDto } from '@modules/question/dto/create-quiz.dto';
import QuestionChoiceRepository from '@models/repositories/QuestionChoice.repository';
import { GetQuizDto } from '@modules/question/dto/get-quiz.dto';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private loggerService: LoggerService,
    private testcaseRepository: TestcaseRepository,
    private questionChoiceRepository: QuestionChoiceRepository,
  ) {
    this.loggerService.getLogger('QuestionService');
  }

  async createQuestionAboutPrograming(
    author_id: string,
    createQuestionAboutProgramingDto: CreateQuestionAboutProgramingDto,
  ) {
    const listTestcaseId = await Promise.all(
      createQuestionAboutProgramingDto.test_cases.map(async (testCase) => {
        const newTestcase = await this.testcaseRepository.create({
          ...testCase,
          author_id: author_id,
        });
        return newTestcase._id;
      }),
    );

    delete createQuestionAboutProgramingDto.test_cases;

    const newQuestion = await this.questionRepository.create({
      ...createQuestionAboutProgramingDto,
      test_cases: listTestcaseId,
      author_id: author_id,
    });

    return newQuestion;
  }

  async updateQuestionAboutPrograming(
    author_id: string,
    question_id: string,
    updateQuestionAboutProgramingDto: UpdateQuestionAboutProgramingDto,
  ) {
    const updatedQuestion = await this.questionRepository.update(question_id, {
      ...updateQuestionAboutProgramingDto,
    });

    return updatedQuestion;
  }

  async getQuestionAboutProgramingById(question_id: string) {
    return this.questionRepository.findById(question_id);
  }

  async getQuestionAboutPrograming() {
    return this.questionRepository.getAll();
  }

  async createQuestionQuiz(author_id: string, createQuizDto: CreateQuizDto) {
    let listQuestionChoiceId = [];
    if (
      createQuizDto?.question_choice &&
      createQuizDto?.question_choice.length > 0
    ) {
      listQuestionChoiceId = await Promise.all(
        createQuizDto.question_choice.map(async (question_choice) => {
          const { _id, ...rest } = question_choice;
          const newQuestionChoice = await this.questionChoiceRepository.create({
            ...rest,
            author_id: author_id,
          });
          return newQuestionChoice._id;
        }),
      );
    }

    delete createQuizDto.question_choice;

    const newQuestion = await this.questionRepository.create({
      ...createQuizDto,
      author_id: author_id,
      question_choice: listQuestionChoiceId,
    });

    return newQuestion;
  }

  async getQuestionQuiz(author_id: string, getQuizDto: GetQuizDto) {
    const query = {
      author_id: author_id,
      course_id: getQuizDto.course_id,
    };

    if (getQuizDto?.difficulty_level)
      query['difficulty_level'] = getQuizDto.difficulty_level;

    if (getQuizDto?.status) query['status'] = getQuizDto.status;

    if (getQuizDto?.type) query['type'] = getQuizDto.type;

    if (getQuizDto?.search) {
      query['$text'] = { $search: getQuizDto.search };
    }

    return this.questionRepository.questionDocument
      .find(query)
      .populate('question_choice')
      .exec();
  }

  async deleteQuestionQuiz(author_id: string, question_id: string) {
    const question = await this.questionRepository.findById(question_id);

    if (question.question_choice.length > 0)
      for (const question_choice_id of question.question_choice) {
        await this.questionChoiceRepository.delete(question_choice_id);
      }

    return this.questionRepository.delete(question_id);
  }

  async updateQuestionQuiz(
    author_id: string,
    question_id: string,
    createQuizDto: CreateQuizDto,
  ) {
    const question = await this.questionRepository.findById(question_id);

    if (question.question_choice.length > 0)
      for (const question_choice_id of question.question_choice) {
        await this.questionChoiceRepository.delete(question_choice_id);
      }

    await this.questionRepository.delete(question_id);

    return this.createQuestionQuiz(author_id, createQuizDto);
  }
}
