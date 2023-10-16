import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

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
    type: String,
    required: true,
    unique: true,
  })
  user_id: string;

  @Prop({
    type: String,
    required: true,
  })
  question_id: string;

  @Prop({
    type: String,
    required: true,
  })
  score: string;

  @Prop({
    type: String,
    required: true,
  })
  language: string;

  @Prop({
    type: String,
    required: true,
  })
  accepted_submission: string;

  @Prop({
    type: String,
    required: true,
  })
  error_code: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
