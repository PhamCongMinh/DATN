import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import QuestionRepository from '@models/repositories/Question.repository';
import { CreateQuestionAboutProgramingDto } from '@modules/question/dto/create-question-about-programing.dto';
import { UpdateQuestionAboutProgramingDto } from '@modules/question/dto/update-question-about-programing.dto';
import TestcaseRepository from '@models/repositories/Testcase.repository';

@Injectable()
export class QuestionService {
  constructor(
    private questionRepository: QuestionRepository,
    private loggerService: LoggerService,
    private testcaseRepository: TestcaseRepository,
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
}
