import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
} from '@constants/questions.constant';
import { QuestionChoice } from '@models/entities/QuestionChoice.entity';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Question {
  @Prop({
    type: String,
    required: false,
  })
  title?: string;

  @Prop({
    type: String,
    required: false,
  })
  description?: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Testcase',
    required: false,
  })
  test_cases?: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author_id?: string;

  @Prop({
    type: Number,
    required: false,
  })
  points?: number;

  @Prop({
    type: String,
    default: EQuestionDifficultyLevel.EASY,
  })
  difficulty_level?: EQuestionDifficultyLevel;

  @Prop({
    type: String,
    required: false,
  })
  example_input?: string;

  @Prop({
    type: String,
    required: false,
  })
  example_output?: string;

  @Prop({
    type: Number,
    required: false,
  })
  time_limit?: number;

  @Prop({
    type: Number,
    required: false,
  })
  memory_limit?: number;

  @Prop({
    type: String,
    required: false,
    default: EQuestionStatus.DRAFT,
  })
  status?: EQuestionStatus;

  @Prop({
    type: String,
    required: false,
  })
  type?: EQuestionType;

  @Prop({
    type: String,
    required: false,
  })
  comment?: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'QuestionChoice',
    required: false,
  })
  question_choice?: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  })
  course_id?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
