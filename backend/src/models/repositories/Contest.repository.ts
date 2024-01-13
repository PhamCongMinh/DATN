import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';
import { Answer, AnswerDocument } from '@models/entities/Answer.entity';
import { Contest, ContestDocument } from '@models/entities/Contest.entity';

@Injectable()
export default class ContestRepository {
  constructor(
    @InjectModel(Contest.name)
    public contestDocumentModel: Model<ContestDocument>,
  ) {}

  async create(data: Contest): Promise<ContestDocument> {
    return this.contestDocumentModel.create(data);
  }

  async delete(id: string) {
    return this.contestDocumentModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.contestDocumentModel.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<ContestDocument> {
    return this.contestDocumentModel.findOne({ _id: id }).exec();
  }

  async getAll(): Promise<ContestDocument[]> {
    return this.contestDocumentModel.find().sort({ updated_at: -1 }).exec();
  }
}
