import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import {
  ESubmissionLanguage,
  ESubmissionStatus,
} from '@constants/submission.constant';

export type SubmissionDocument = Submission & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Submission {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  })
  question_id: string;

  @Prop({
    type: String,
    required: true,
  })
  source: string;

  @Prop({
    type: Number,
    required: false,
  })
  score?: number;

  @Prop({
    type: String,
    required: false,
  })
  language: ESubmissionLanguage;

  @Prop({
    type: String,
    required: false,
  })
  status?: ESubmissionStatus;

  @Prop({
    type: Number,
    required: false,
  })
  passed_testcase_number?: number;

  @Prop({
    type: String,
    required: false,
  })
  error_code?: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
