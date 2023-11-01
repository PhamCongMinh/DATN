import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type CourseDocument = Course & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Course {
  @Prop({
    type: String,
    required: false,
    unique: true,
  })
  name: string;

  @Prop({
    type: String,
    required: false,
  })
  students: string;

  @Prop({
    type: String,
    required: false,
  })
  teachers: string;

  @Prop({
    type: String,
    required: false,
  })
  description: string;

  @Prop({
    type: String,
    required: false,
  })
  tags: string;

  @Prop({
    type: String,
    required: false,
  })
  img: string;

  @Prop({
    type: String,
    required: false,
  })
  files: string;

  @Prop({
    type: String,
    required: false,
  })
  assessments: string;

  @Prop({
    type: String,
    required: false,
  })
  lectures: string;

  @Prop({
    type: String,
    required: false,
  })
  survey_request: string;

  @Prop({
    type: String,
    required: false,
  })
  reviews: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
