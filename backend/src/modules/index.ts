import { AuthModule } from '@modules/auth/auth.module';
import BlogModule from '@modules/blog/blog.module';
import CommentModule from '@modules/comment/comment.module';
import ManageSystemModule from '@modules/manage-system/manage-system.module';
import TestcaseModule from '@modules/testcase/testcase.module';
import { JobModule } from '@modules/judging-engine/job.module';
import { ConsoleModule } from 'nestjs-console';

export const MODULES = [
  AuthModule,
  BlogModule,
  CommentModule,
  TestcaseModule,
  ManageSystemModule,
  JobModule,
];
