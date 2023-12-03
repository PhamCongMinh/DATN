import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type ConferenceDocument = Conference & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class Conference {
  @Prop({
    type: String,
    required: true,
  })
  conference_name: string;

  @Prop({
    type: String,
    required: true,
  })
  area: string;

  @Prop({
    type: String,
    required: true,
  })
  start_time: string;

  @Prop({
    type: String,
    required: true,
  })
  end_time: string;
}

export const ConferenceSchema = SchemaFactory.createForClass(Conference);
