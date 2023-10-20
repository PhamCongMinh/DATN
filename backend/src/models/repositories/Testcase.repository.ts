import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testcase, TestcaseDocument } from '@models/entities';

@Injectable()
export default class TestcaseRepository {
  constructor(
    @InjectModel(Testcase.name)
    public testcaseDocument: Model<TestcaseDocument>,
  ) {}

  async create(data: Testcase): Promise<TestcaseDocument> {
    return this.testcaseDocument.create(data);
  }

  async delete(id: string) {
    return this.testcaseDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.testcaseDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<TestcaseDocument[]> {
    return this.testcaseDocument.find({ _id: id }).exec();
  }

  async getAll(): Promise<TestcaseDocument[]> {
    return this.testcaseDocument.find().exec();
  }
}
