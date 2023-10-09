import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@shared/swagger';
import { now } from 'moment';
import mongoose from 'mongoose';

export enum RentalStatus {
  AVAILABLE = 'available',
  RENTED = 'rented',
}

export enum RentNewsType {
  TYPE1 = 'PhòngTrọ',
  TYPE2 = 'NhàThuêNguyênCăn',
  TYPE3 = 'CănHộMini',
  TYPE4 = 'Homestay',
}

export type RentalNewsDocument = RentalNews & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class RentalNews {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  ownerId: string;

  @Prop({
    type: 'string',
    default: RentalStatus.AVAILABLE,
  })
  status: RentalStatus;

  @Prop({
    type: 'number',
    required: true,
  })
  pricePerMonth: number;

  @Prop({
    type: 'number',
    required: true,
  })
  area: number;

  @Prop({
    type: 'string',
    required: true,
  })
  city: string;

  @Prop({
    type: 'string',
    required: true,
  })
  district: string;

  @Prop({
    type: 'string',
    required: true,
  })
  commune: string;

  @Prop({
    type: 'string',
    required: true,
  })
  street: string;

  @Prop({
    type: 'number',
    required: false,
  })
  houseNumber: number;

  @Prop({
    type: 'string',
    required: false,
  })
  specificAddress: string;

  @Prop({
    type: 'string',
    required: true,
  })
  title: string;

  @Prop({
    type: 'string',
    required: true,
  })
  description: string;

  @Prop({
    type: Array,
    required: false,
  })
  imageUrl: string[];

  @Prop({
    type: Date,
    default: now(),
  })
  startDay?: Date;

  @Prop({
    type: Date,
    default: now(),
  })
  endDay?: Date;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    required: false,
  })
  comments?: string[];

  @Prop({
    type: 'string',
    default: RentNewsType.TYPE1,
  })
  rentNewsType: RentNewsType;
}

export const RentalNewsSchema = SchemaFactory.createForClass(RentalNews);
