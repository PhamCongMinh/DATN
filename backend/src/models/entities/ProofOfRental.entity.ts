import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type ProofOfRentalDocument = ProofOfRental & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class ProofOfRental {
  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: 'string',
    required: true,
  })
  rentalNewsId: string;

  @Prop({
    type: String,
    required: true,
  })
  rentalStartDate: string;

  @Prop({
    type: String,
    required: true,
  })
  rentedTime: string;

  @Prop({
    type: String,
    required: true,
  })
  proofImage: string;
}

export const ProofOfRentalSchema = SchemaFactory.createForClass(ProofOfRental);
