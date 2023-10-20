import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '@models/entities';

@Injectable()
export default class QuestionRepository {
  constructor(
    @InjectModel(Question.name)
    public questionDocument: Model<QuestionDocument>,
  ) {}

  async create(data: Question): Promise<QuestionDocument> {
    return this.questionDocument.create(data);
  }

  async delete(id: string) {
    return this.questionDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.questionDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<QuestionDocument> {
    return this.questionDocument
      .findOne({ _id: id })
      .populate('test_cases')
      .populate('author_id')
      .exec();
  }

  async getAll(): Promise<QuestionDocument[]> {
    return this.questionDocument
      .find()
      .populate('test_cases')
      .populate('author_id')
      .exec();
  }
}
