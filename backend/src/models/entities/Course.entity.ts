import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import { User } from '@models/entities/User.entity';
import { Section } from '@models/entities/Section.entity';

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UploadedAsset',
    required: false,
  })
  course_image?: string;

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
  survey_request?: string;

  @Prop({
    type: String,
    required: false,
  })
  reviews?: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false,
  })
  students?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false,
  })
  teachers?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Discuss',
    required: false,
  })
  discusses?: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Section',
    required: false,
  })
  sections?: string[];

  @Prop({
    type: String,
    required: false,
  })
  summary?: string;

  @Prop({
    type: Date,
    required: false,
  })
  start_registration?: Date;

  @Prop({
    type: Date,
    required: false,
  })
  end_registration?: Date;

  @Prop({
    type: String,
    required: false,
  })
  introduction?: string;

  @Prop({
    type: String,
    required: false,
  })
  content_introduction?: string;

  @Prop({
    type: String,
    required: false,
  })
  teacher_introduction?: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false,
  })
  is_contest?: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
