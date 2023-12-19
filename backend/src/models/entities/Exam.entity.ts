import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import {
  EQuestionDifficultyLevel,
  EQuestionStatus,
  EQuestionType,
} from '@constants/questions.constant';
import { QuestionChoice } from '@models/entities/QuestionChoice.entity';
import { QuestionPoint } from '@models/entities/QuestionPoint.entity';

export type ExamDocument = Exam & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Exam {
  @Prop({
    type: String,
    required: false,
  })
  name?: string;

  @Prop({
    type: String,
    required: false,
  })
  exam_id?: string;

  @Prop({
    type: String,
    required: false,
  })
  password?: string;

  @Prop({
    type: Number,
    required: false,
  })
  exam_time?: number;

  // Thang diem
  @Prop({
    type: Number,
    required: false,
  })
  point_ladder?: number;

  // Diem de qua bai thi
  @Prop({
    type: Number,
    required: false,
  })
  pass_point?: number;

  @Prop({
    type: String,
    required: false,
  })
  description?: string;

  // Tieu chi danh gia
  @Prop({
    type: String,
    required: false,
  })
  evaluation_criteria?: string;

  // So lam duoc thu lam lai bai thi
  @Prop({
    type: Number,
    required: false,
    default: 0,
  })
  retry_times_number?: number;

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

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'QuestionPoint',
    required: false,
  })
  question_point?: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author_id?: string;

  @Prop({
    type: String,
    required: false,
  })
  comment?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  })
  course_id?: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
