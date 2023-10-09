import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProofOfRental,
  ProofOfRentalDocument,
} from '@models/entities/ProofOfRental.entity';

@Injectable()
export default class ProofOfRentalRepository {
  constructor(
    @InjectModel(ProofOfRental.name)
    public proofOfRentalDocumentModel: Model<ProofOfRentalDocument>,
  ) {}
}
