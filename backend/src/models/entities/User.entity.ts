import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export enum Role {
  HOST = 'host',
  RENTER = 'renter',
  ADMIN = 'admin',
}

export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
    default: Role.RENTER,
  })
  role: string;

  @Prop({
    type: 'string',
    required: true,
  })
  numberPhone: string;

  @Prop({
    type: 'string',
    required: false,
  })
  zaloPhone: string;

  @Prop({
    type: 'string',
    required: false,
  })
  facebookUrl: string;

  @Prop({
    type: 'string',
    required: false,
  })
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
