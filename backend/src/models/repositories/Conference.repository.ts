import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '@models/entities';
import {
  Conference,
  ConferenceDocument,
} from '@models/entities/Conference.entity';

@Injectable()
export default class ConferenceRepository {
  constructor(
    @InjectModel(Conference.name)
    public conferenceDocumentModel: Model<ConferenceDocument>,
  ) {}
}
