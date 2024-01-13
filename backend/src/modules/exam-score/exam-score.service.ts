import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import QuestionRepository from '@models/repositories/Question.repository';
import QuestionPointRepository from '@models/repositories/QuestionPoint.repository';
import ExamRepository from '@models/repositories/Exam.repository';
import ExamSubmitRepository from '@models/repositories/ExamSubmit.repository';
import AnswerRepository from '@models/repositories/Answer.repository';
import ExamScoreRepository from '@models/repositories/ExamScore.repository';

@Injectable()
export class ExamScoreService {
  constructor(
    private questionPointRepository: QuestionPointRepository,
    private loggerService: LoggerService,
    private examRepository: ExamRepository,
    private examSubmitRepository: ExamSubmitRepository,
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository,
    private examScoreRepository: ExamScoreRepository,
  ) {
    this.loggerService.getLogger('ExamScoreService');
  }

  async getListExamScoreInAExam(userId: string, examId: string) {
    return this.examScoreRepository.examScoreModel
      .find({
        exam: examId,
      })
      .populate('exam_submit')
      .populate('author_id')
      .populate('exam')
      .exec();
  }

  async getChartData(userId: string, examId: string) {
    const examScores = await this.examScoreRepository.examScoreModel
      .find({
        exam: examId,
      })
      .populate('exam_submit')
      .populate('author_id')
      .populate('exam')
      .exec();

    const chartData1 = {};

    examScores.forEach((examScore) => {
      const score = examScore.score;
      chartData1[score] = (chartData1[score] || 0) + 1;
    });

    const scoreChartData = Object.entries(chartData1).map(([score, count]) => ({
      points: parseInt(score, 10),
      students: count,
    }));

    const chartData2 = {};

    examScores.forEach((examScore) => {
      const correct_answer = examScore.correct_answer;
      chartData2[correct_answer] = (chartData2[correct_answer] || 0) + 1;
    });

    const correctAnswerChartData = Object.entries(chartData2).map(
      ([correct_answer, count]) => ({
        points: parseInt(correct_answer, 10),
        students: count,
      }),
    );

    const chartData3 = {};

    examScores.forEach((examScore) => {
      const total_point = examScore.total_point;
      chartData3[total_point] = (chartData3[total_point] || 0) + 1;
    });

    const totalPointChartData = Object.entries(chartData3).map(
      ([total_point, count]) => ({
        points: parseInt(total_point, 10),
        students: count,
      }),
    );

    return {
      scoreChartData: scoreChartData.sort((a, b) => a.points - b.points),
      correctAnswerChartData: correctAnswerChartData.sort(
        (a, b) => a.points - b.points,
      ),
      totalPointChartData: totalPointChartData.sort(
        (a, b) => a.points - b.points,
      ),
    };
  }
}
