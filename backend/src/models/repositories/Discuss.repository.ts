import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testcase, TestcaseDocument } from '@models/entities';
import { Course, CourseDocument } from '@models/entities/Course.entity';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';

@Injectable()
export default class DiscussRepository {
  constructor(
    @InjectModel(Discuss.name)
    public discussDocument: Model<DiscussDocument>,
  ) {}

  async create(data: Discuss): Promise<DiscussDocument> {
    return this.discussDocument.create(data);
  }

  async delete(id: string) {
    return this.discussDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.discussDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<DiscussDocument[]> {
    return this.discussDocument.find({ _id: id }).exec();
  }

  async getAll(): Promise<DiscussDocument[]> {
    return this.discussDocument.find().sort({ updated_at: -1 }).exec();
  }
}
