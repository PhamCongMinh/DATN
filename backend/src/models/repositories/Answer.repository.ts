import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';
import { Answer, AnswerDocument } from '@models/entities/Answer.entity';

@Injectable()
export default class AnswerRepository {
  constructor(
    @InjectModel(Answer.name)
    public answerDocumentModel: Model<AnswerDocument>,
  ) {}

  async create(data: Answer): Promise<AnswerDocument> {
    return this.answerDocumentModel.create(data);
  }

  async delete(id: string) {
    return this.answerDocumentModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.answerDocumentModel.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<AnswerDocument> {
    return this.answerDocumentModel.findOne({ _id: id }).exec();
  }

  async getAll(): Promise<AnswerDocument[]> {
    return this.answerDocumentModel.find().sort({ updated_at: -1 }).exec();
  }
}
