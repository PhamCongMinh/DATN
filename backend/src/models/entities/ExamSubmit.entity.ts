import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import {
  ESubmissionLanguage,
  ESubmissionStatus,
} from '@constants/submission.constant';
import { Exam } from '@models/entities/Exam.entity';

export enum EExamSubmitStatus {
  DOING = 'DOING',
  DONE = 'DONE',
}

export type ExamSubmitDocument = ExamSubmit & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class ExamSubmit {
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Answer',
    required: false,
  })
  answers?: string[];

  @Prop({
    type: String,
    required: false,
  })
  status?: EExamSubmitStatus;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  score?: number;

  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  correct_answer?: number;

  @Prop({
    type: Date,
    required: false,
  })
  start_time?: Date;

  @Prop({
    type: Date,
    required: false,
  })
  end_time?: Date;
}

export const ExamSubmitSchema = SchemaFactory.createForClass(ExamSubmit);
