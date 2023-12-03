import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testcase, TestcaseDocument } from '@models/entities';
import { Course, CourseDocument } from '@models/entities/Course.entity';
import { Section, SectionDocument } from '@models/entities/Section.entity';

@Injectable()
export default class SectionRepository {
  constructor(
    @InjectModel(Section.name)
    public sectionDocument: Model<SectionDocument>,
  ) {}

  async create(data: Section): Promise<SectionDocument> {
    return this.sectionDocument.create(data);
  }

  async delete(id: string) {
    return this.sectionDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.sectionDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<SectionDocument[]> {
    return this.sectionDocument.find({ _id: id }).exec();
  }

  async getAll(): Promise<SectionDocument[]> {
    return this.sectionDocument.find().sort({ updated_at: -1 }).exec();
  }
}
