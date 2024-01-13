import { Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Prop } from '@shared/swagger';

export type UploadedAssetDocument = UploadedAsset & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
  virtuals: true,
})
export class UploadedAsset {
  @Prop({
    type: String,
    required: false,
  })
  asset_url: string;

  @Prop({
    type: String,
    required: false,
  })
  file_type?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: string;
}

export const UploadedAssetSchema = SchemaFactory.createForClass(UploadedAsset);
