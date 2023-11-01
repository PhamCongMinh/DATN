import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type ParticipationDocument = Participation & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Participation {
  @Prop({
    type: String,
    required: false,
    unique: true,
  })
  user: string;

  @Prop({
    type: String,
    required: false,
    unique: true,
  })
  role: string;

  @Prop({
    type: String,
    required: false,
    unique: true,
  })
  status: string;
}

export const ParticipationSchema = SchemaFactory.createForClass(Participation);
