import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import {
  ESubmissionLanguage,
  ESubmissionStatus,
} from '@constants/submission.constant';
import { Exam } from '@models/entities/Exam.entity';

export type ExamScoreDocument = ExamScore & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class ExamScore {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  })
  exam: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamSubmit',
    required: true,
  })
  exam_submit: string;

  @Prop({
    type: String,
    required: false,
  })
  total_point?: number;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  correct_answer?: number;

  @Prop({
    type: String,
    required: false,
  })
  score?: number;
}

export const ExamScoreSchema = SchemaFactory.createForClass(ExamScore);
