import { AuthModule } from '@modules/auth/auth.module';
import BlogModule from '@modules/blog/blog.module';
import CommentModule from '@modules/comment/comment.module';
import ManageSystemModule from '@modules/manage-system/manage-system.module';
import TestcaseModule from '@modules/testcase/testcase.module';
import { JuggingEngineModule } from '@modules/judging-engine/jugging-engine.module';
import { ConsoleModule } from 'nestjs-console';
import QuestionModule from '@modules/question/question.module';
import SubmissionModule from '@modules/submission/submission.module';
import TestModule from '@modules/test/test.module';
import CourseModule from '@modules/course/course.module';

export const MODULES = [
  AuthModule,
  BlogModule,
  CommentModule,
  TestcaseModule,
  ManageSystemModule,
  JuggingEngineModule,
  QuestionModule,
  SubmissionModule,
  TestModule,
  CourseModule,
];
