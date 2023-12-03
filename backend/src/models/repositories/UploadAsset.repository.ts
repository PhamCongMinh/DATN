import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testcase, TestcaseDocument } from '@models/entities';
import { Course, CourseDocument } from '@models/entities/Course.entity';
import { Section, SectionDocument } from '@models/entities/Section.entity';
import {
  UploadedAsset,
  UploadedAssetDocument,
} from '@models/entities/UploadedAsset.entity';

@Injectable()
export default class UploadedAssetRepository {
  constructor(
    @InjectModel(UploadedAsset.name)
    public uploadedAssetDocument: Model<UploadedAssetDocument>,
  ) {}

  async create(data: UploadedAsset): Promise<UploadedAssetDocument> {
    return this.uploadedAssetDocument.create(data);
  }

  async delete(id: string) {
    return this.uploadedAssetDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.uploadedAssetDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<UploadedAssetDocument[]> {
    return this.uploadedAssetDocument.find({ _id: id }).exec();
  }

  async getAll(): Promise<UploadedAssetDocument[]> {
    return this.uploadedAssetDocument.find().sort({ updated_at: -1 }).exec();
  }
}
