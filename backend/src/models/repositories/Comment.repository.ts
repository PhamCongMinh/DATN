import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities';
import { Discuss, DiscussDocument } from '@models/entities/Discuss.entity';

@Injectable()
export default class CommentRepository {
  constructor(
    @InjectModel(Comment.name)
    public commentDocumentModel: Model<CommentDocument>,
  ) {}

  async create(data: Comment): Promise<CommentDocument> {
    return this.commentDocumentModel.create(data);
  }

  async delete(id: string) {
    return this.commentDocumentModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: any) {
    return this.commentDocumentModel.updateOne({ _id: id }, data).exec();
  }

  async findById(id: string): Promise<CommentDocument[]> {
    return this.commentDocumentModel.find({ _id: id }).exec();
  }

  async getAll(): Promise<CommentDocument[]> {
    return this.commentDocumentModel.find().sort({ updated_at: -1 }).exec();
  }
}
