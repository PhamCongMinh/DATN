import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Comment {
  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  ownerId: string;

  @Prop({
    type: Number,
    required: true,
  })
  rate: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
