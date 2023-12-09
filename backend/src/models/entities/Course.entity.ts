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
  })
  name?: string;

  @Prop({
    type: String,
    required: false,
  })
  tags?: string;

  @Prop({
    type: String,
    required: false,
  })
  description?: string;

  @Prop({
    type: String,
    required: false,
  })
  img?: string;

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
    type: String,
    required: false,
  })
  status?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: '6537ea83727eb5e01b13ec70',
  })
  author_id: string;

  @Prop({
    type: String,
    required: false,
  })
  files?: string;

  @Prop({
    type: String,
    required: false,
  })
  assessments?: string;

  @Prop({
    type: String,
    required: false,
  })
  lectures?: string;

  @Prop({
    type: String,
    required: false,
  })
  survey_request?: string;

  @Prop({
    type: String,
    required: false,
  })
  reviews?: string;

  @Prop({
    type: String,
    required: false,
  })
  students?: string;

  @Prop({
    type: String,
    required: false,
  })
  teachers?: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
