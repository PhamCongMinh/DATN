import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/User.entity';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectModel(User.name) public userDocumentModel: Model<UserDocument>,
  ) {}

  async findUserByEmail(email: string): Promise<UserDocument> {
    return await this.userDocumentModel.findOne({ email: email }).exec();
  }

  async findUserById(id: number): Promise<UserDocument> {
    return await this.userDocumentModel.findOne({ _id: id }).exec();
  }
}
