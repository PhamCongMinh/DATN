import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '@models/entities/Blog.entity';

@Injectable()
export default class BlogRepository {
  constructor(
    @InjectModel(Blog.name) public blogDocumentModel: Model<BlogDocument>,
  ) {}
}
