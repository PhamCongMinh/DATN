import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import { EQuestionDifficultyLevel } from '@constants/questions.constant';

export type QuestionChoiceDocument = QuestionChoice & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class QuestionChoice {
  @Prop({
    type: String,
    required: false,
  })
  content?: string;

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
    type: String,
    required: false,
  })
  description?: string;

  @Prop({
    type: Boolean,
    required: false,
  })
  is_correct?: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  author_id?: string;
}

export const QuestionChoiceSchema =
  SchemaFactory.createForClass(QuestionChoice);
