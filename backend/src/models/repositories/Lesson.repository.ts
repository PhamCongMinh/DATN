import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testcase, TestcaseDocument } from '@models/entities';
import { Course, CourseDocument } from '@models/entities/Course.entity';
import { Section, SectionDocument } from '@models/entities/Section.entity';
import { Lesson, LessonDocument } from '@models/entities/Lesson.entity';

@Injectable()
export default class LessonRepository {
  constructor(
    @InjectModel(Lesson.name)
    public lessonDocument: Model<LessonDocument>,
  ) {}

  async create(data: Lesson): Promise<LessonDocument> {
    return this.lessonDocument.create(data);
  }

  async delete(id: string) {
    return this.lessonDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.lessonDocument.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<LessonDocument[]> {
    return this.lessonDocument.find({ _id: id }).exec();
  }

  async getAll(): Promise<LessonDocument[]> {
    return this.lessonDocument.find().sort({ updated_at: -1 }).exec();
  }
}
