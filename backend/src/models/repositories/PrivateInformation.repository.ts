import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PrivateInformation,
  PrivateInformationDocument,
} from '@models/entities/PrivateInformation.entity';

@Injectable()
export default class PrivateInformationRepository {
  constructor(
    @InjectModel(PrivateInformation.name)
    public privateInformationDocumentModel: Model<PrivateInformationDocument>,
  ) {}
}
