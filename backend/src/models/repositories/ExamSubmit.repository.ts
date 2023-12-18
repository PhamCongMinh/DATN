import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';
import {
  ExamSubmit,
  ExamSubmitDocument,
} from '@models/entities/ExamSubmit.entity';

@Injectable()
export default class ExamSubmitRepository {
  constructor(
    @InjectModel(ExamSubmit.name)
    public examSubmitDocumentModel: Model<ExamSubmitDocument>,
  ) {}

  async create(data: Comment): Promise<ExamSubmitDocument> {
    return this.examSubmitDocumentModel.create(data);
  }

  async delete(id: string) {
    return this.examSubmitDocumentModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.examSubmitDocumentModel.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<ExamSubmitDocument> {
    return this.examSubmitDocumentModel.findOne({ _id: id }).exec();
  }

  async getAll(): Promise<ExamSubmitDocument[]> {
    return this.examSubmitDocumentModel.find().sort({ updated_at: -1 }).exec();
  }
}
