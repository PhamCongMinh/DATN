import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type TestcaseDocument = Testcase & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Testcase {
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
  input: string;

  @Prop({
    type: String,
    required: true,
  })
  output: string;

  @Prop({
    type: String,
    required: true,
  })
  author_id: string;

  @Prop({
    type: String,
    required: true,
  })
  order: string;
}

export const TestcaseSchema = SchemaFactory.createForClass(Testcase);
