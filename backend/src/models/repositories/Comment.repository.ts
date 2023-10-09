import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from '@models/entities/Comment.entity';

@Injectable()
export default class CommentRepository {
  constructor(
    @InjectModel(Comment.name)
    public commentDocumentModel: Model<CommentDocument>,
  ) {}
}
