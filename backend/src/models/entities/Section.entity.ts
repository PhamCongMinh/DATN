import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import { Lesson } from '@models/entities/Lesson.entity';

export type SectionDocument = Section & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Section {
  @Prop({
    type: String,
    required: false,
  })
  name?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  })
  course_id: string;

  @Prop({
    type: Boolean,
    required: false,
  })
  visible?: boolean;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Lesson',
    required: false,
  })
  lessons?: string[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
