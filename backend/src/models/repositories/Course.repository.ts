import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testcase, TestcaseDocument } from '@models/entities';
import { Course, CourseDocument } from '@models/entities/Course.entity';

@Injectable()
export default class CourseRepository {
  constructor(
    @InjectModel(Course.name)
    public courseDocument: Model<CourseDocument>,
  ) {}

  async create(data: Course): Promise<CourseDocument> {
    return this.courseDocument.create(data);
  }

  async delete(id: string) {
    return this.courseDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.courseDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<CourseDocument[]> {
    return this.courseDocument.find({ _id: id }).exec();
  }

  async getAll(): Promise<CourseDocument[]> {
    return this.courseDocument.find().sort({ updated_at: -1 }).exec();
  }
}
