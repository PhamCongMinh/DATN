import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';
import { Answer, AnswerDocument } from '@models/entities/Answer.entity';
import {
  ExamScore,
  ExamScoreDocument,
} from '@models/entities/ExamScore.entity';

@Injectable()
export default class ExamScoreRepository {
  constructor(
    @InjectModel(ExamScore.name)
    public examScoreModel: Model<ExamScoreDocument>,
  ) {}

  async create(data: ExamScore): Promise<ExamScore> {
    return this.examScoreModel.create(data);
  }

  async delete(id: string) {
    return this.examScoreModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.examScoreModel.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<ExamScore> {
    return this.examScoreModel.findOne({ _id: id }).exec();
  }

  async getAll(): Promise<ExamScore[]> {
    return this.examScoreModel.find().sort({ updated_at: -1 }).exec();
  }
}
