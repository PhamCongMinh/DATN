import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from '@models/entities';
import {
  QuestionChoice,
  QuestionChoiceDocument,
} from '@models/entities/QuestionChoice.entity';

@Injectable()
export default class QuestionChoiceRepository {
  constructor(
    @InjectModel(QuestionChoice.name)
    public questionChoiceDocument: Model<QuestionChoiceDocument>,
  ) {}

  async create(data: QuestionChoice): Promise<QuestionChoiceDocument> {
    return this.questionChoiceDocument.create(data);
  }

  async delete(id: string) {
    return this.questionChoiceDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.questionChoiceDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<QuestionChoiceDocument> {
    return this.questionChoiceDocument
      .findOne({ _id: id })
      .populate('test_cases')
      .populate('author_id')
      .exec();
  }

  async getAll(): Promise<QuestionChoiceDocument[]> {
    return this.questionChoiceDocument.find().exec();
  }
}
