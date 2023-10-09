import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RentalNews, RentalNewsDocument } from '@models/entities/RentalNews';
import { Model } from 'mongoose';
import { UpdateRentalNewsDto } from '@modules/rent-out/dto/request/updateRentalNewsDto';

@Injectable()
export default class RentalNewsRepository {
  constructor(
    @InjectModel(RentalNews.name)
    public rentalNewsDocument: Model<RentalNewsDocument>,
  ) {}

  async create(data: RentalNews): Promise<RentalNewsDocument> {
    return this.rentalNewsDocument.create(data);
  }

  async delete(id: string) {
    return this.rentalNewsDocument.deleteOne({ _id: id }).exec();
  }

  async update(id: string, data: UpdateRentalNewsDto) {
    return this.rentalNewsDocument.updateOne({ _id: id }, data).exec();
  }

  async findByOwnerId(ownerId: string): Promise<RentalNewsDocument[]> {
    return this.rentalNewsDocument.find({ ownerId: ownerId }).exec();
  }

  async findById(id: string): Promise<RentalNewsDocument[]> {
    return this.rentalNewsDocument.find({ _id: id }).exec();
  }

  async getAll(): Promise<RentalNewsDocument[]> {
    return this.rentalNewsDocument.find().exec();
  }
}
