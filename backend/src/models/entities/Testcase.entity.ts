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
    required: false,
  })
  description?: string;

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  author_id: string;

  @Prop({
    type: Number,
    required: true,
  })
  order: number;
}

export const TestcaseSchema = SchemaFactory.createForClass(Testcase);
