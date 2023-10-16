import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

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
    required: true,
    unique: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  test_cases: string;

  @Prop({
    type: String,
    required: true,
  })
  author_id: string;

  @Prop({
    type: String,
    required: true,
  })
  points: string;

  @Prop({
    type: String,
    required: true,
  })
  difficulty_level: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
