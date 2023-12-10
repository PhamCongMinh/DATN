import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
} from '@constants/questions.constant';
import { QuestionChoice } from '@models/entities/QuestionChoice.entity';

export type QuestionPointDocument = QuestionPoint & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class QuestionPoint {
  @Prop({
    type: Number,
    required: false,
  })
  point?: number;

  @Prop({
    type: Number,
    required: false,
  })
  order?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: false,
  })
  question_id?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author_id?: string;
}

export const QuestionPointSchema = SchemaFactory.createForClass(QuestionPoint);
