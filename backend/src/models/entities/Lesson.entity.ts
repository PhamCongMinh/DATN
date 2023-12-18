import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import { Exam } from '@models/entities/Exam.entity';

export type LessonDocument = Lesson & Document;

export enum ELessonType {
  video = 'video',
  pdf = 'pdf',
  text = 'text',
  audio = 'audio',
  quiz = 'quiz',
  survey = 'survey',
  assignment = 'assignment',
  exam = 'exam',
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Lesson {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  })
  course_id?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  })
  section_id: string;

  @Prop({
    type: Number,
    required: false,
  })
  order?: number;

  @Prop({
    type: String,
    required: false,
  })
  name?: string;

  @Prop({
    type: String,
    required: false,
  })
  description?: string;

  @Prop({
    type: String,
    required: false,
  })
  embed_file?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UploadedAsset',
    required: false,
  })
  documents?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: false,
  })
  exam?: string;

  @Prop({
    type: String,
    required: false,
  })
  type?: ELessonType;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
