import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import {
  ESubmissionLanguage,
  ESubmissionStatus,
} from '@constants/submission.constant';

export type AnswerDocument = Answer & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Answer {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionPoint',
    required: true,
  })
  question_point: string;

  @Prop({
    type: Boolean,
    required: false,
  })
  is_correct_answer?: boolean;

  @Prop({
    type: Date,
    required: false,
  })
  submitted_time?: Date;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'QuestionChoice',
    required: false,
  })
  question_choice?: string[];

  @Prop({
    type: String,
    required: false,
  })
  answer?: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
