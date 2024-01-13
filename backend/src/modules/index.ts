import { AuthModule } from '@modules/auth/auth.module';
import BlogModule from '@modules/blog/blog.module';
import CommentModule from '@modules/comment/comment.module';
import ManageSystemModule from '@modules/manage-system/manage-system.module';
import TestcaseModule from '@modules/testcase/testcase.module';
import { JuggingEngineModule } from '@modules/judging-engine/jugging-engine.module';
import { ConsoleModule } from 'nestjs-console';
import QuestionModule from '@modules/question/question.module';
import SubmissionModule from '@modules/submission/submission.module';
import CourseModule from '@modules/course/course.module';
import DiscussModule from '@modules/discuss/discuss.module';
import ExamModule from '@modules/exam/exam.module';
import ExamSubmitModule from '@modules/exam-submit/exam-submit.module';
import ExamScoreModule from '@modules/exam-score/exam-score.module';
import GptModule from '@modules/gpt/gpt.module';

export const MODULES = [
  AuthModule,
  BlogModule,
  CommentModule,
  TestcaseModule,
  ManageSystemModule,
  JuggingEngineModule,
  QuestionModule,
  SubmissionModule,
  CourseModule,
  DiscussModule,
  ExamModule,
  ExamSubmitModule,
  ExamScoreModule,
  GptModule,
];
