import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';
import { Exam, ExamDocument } from '@models/entities/Exam.entity';

@Injectable()
export default class ExamRepository {
  constructor(
    @InjectModel(Exam.name)
    public examDocumentModel: Model<ExamDocument>,
  ) {}

  async create(data: Exam): Promise<ExamDocument> {
    return this.examDocumentModel.create(data);
  }

  async delete(id: string) {
    return this.examDocumentModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.examDocumentModel.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<ExamDocument> {
    return this.examDocumentModel.findOne({ _id: id }).exec();
  }

  async getAll(): Promise<ExamDocument[]> {
    return this.examDocumentModel.find().sort({ updated_at: -1 }).exec();
  }
}
