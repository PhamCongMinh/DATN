import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission, SubmissionDocument } from '@models/entities';

@Injectable()
export default class SubmissionRepository {
  constructor(
    @InjectModel(Submission.name)
    public submissionDocument: Model<SubmissionDocument>,
  ) {}

  async create(data: Submission): Promise<SubmissionDocument> {
    return this.submissionDocument.create(data);
  }

  async delete(id: string) {
    return this.submissionDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.submissionDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<SubmissionDocument> {
    return this.submissionDocument.findOne({ _id: id }).exec();
  }

  async getAll(): Promise<SubmissionDocument[]> {
    return this.submissionDocument.find().exec();
  }

  async getSubmissionByQuestionId(
    question_id: string,
  ): Promise<SubmissionDocument> {
    return this.submissionDocument.findOne({ question_id: question_id }).exec();
  }
}
