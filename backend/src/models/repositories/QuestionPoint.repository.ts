import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';
import { Exam, ExamDocument } from '@models/entities/Exam.entity';
import {
  QuestionPoint,
  QuestionPointDocument,
} from '@models/entities/QuestionPoint.entity';

@Injectable()
export default class QuestionPointRepository {
  constructor(
    @InjectModel(QuestionPoint.name)
    public questionPointDocumentModel: Model<QuestionPointDocument>,
  ) {}

  async create(data: QuestionPoint): Promise<QuestionPointDocument> {
    return this.questionPointDocumentModel.create(data);
  }

  async delete(id: string) {
    return this.questionPointDocumentModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.questionPointDocumentModel.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<QuestionPointDocument[]> {
    return this.questionPointDocumentModel.find({ _id: id }).exec();
  }

  async getAll(): Promise<QuestionPointDocument[]> {
    return this.questionPointDocumentModel
      .find()
      .sort({ updated_at: -1 })
      .exec();
  }
}
