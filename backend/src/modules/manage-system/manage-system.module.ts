import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { ManageSystemService } from '@modules/manage-system/manage-system.service';
import { ManageSystemController } from '@modules/manage-system/manage-system.controller';
import { User, UserSchema } from '@models/entities/User.entity';
import { Blog, BlogSchema } from '@models/entities/Blog.entity';
import UserRepository from '@models/repositories/User.repository';
import BlogRepository from '@models/repositories/Blog.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),

    LoggingModule,
  ],
  controllers: [ManageSystemController],
  providers: [ManageSystemService, UserRepository, BlogRepository],
  exports: [ManageSystemService],
})
export default class ManageSystemModule {}
