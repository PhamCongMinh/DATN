import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Prop } from '@shared/swagger';
import mongoose from 'mongoose';

export type DiscussDocument = Discuss & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Discuss {
  @Prop({
    type: String,
    required: false,
  })
  title?: string;

  @Prop({
    type: String,
    required: false,
  })
  content?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  author_id?: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    required: false,
  })
  comments?: string[];
}

export const DiscussSchema = SchemaFactory.createForClass(Discuss);
