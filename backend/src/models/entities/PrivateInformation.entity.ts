import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type PrivateInformationDocument = PrivateInformation & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class PrivateInformation {
  @Prop({
    type: 'string',
    required: true,
  })
  ownerId: string;

  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
  })
  dateOfBirth: string;

  @Prop({
    type: String,
    required: true,
  })
  permanentAddress: string;

  @Prop({
    type: String,
    required: true,
  })
  temporaryAddress: string;

  @Prop({
    type: String,
    required: true,
  })
  numberPhone: string;

  @Prop({
    type: String,
    required: true,
  })
  citizenIdNumber: string;

  @Prop({
    type: String,
    required: true,
  })
  citizenIdImage: string;

  @Prop({
    type: String,
    required: true,
  })
  portraitImage: string;

  @Prop({
    type: String,
    required: false,
  })
  proofImage: string;
}

export const PrivateInformationSchema =
  SchemaFactory.createForClass(PrivateInformation);
