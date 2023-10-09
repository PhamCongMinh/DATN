import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RentalNews, RentalNewsSchema } from '@models/entities/RentalNews';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { RentService } from '@modules/rent/rent.service';
import { RentController } from '@modules/rent/rent.controller';
import {
  ProofOfRental,
  ProofOfRentalSchema,
} from '@models/entities/ProofOfRental.entity';
import ProofOfRentalRepository from '@models/repositories/ProofOfRental.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RentalNews.name,
        schema: RentalNewsSchema,
      },
      {
        name: ProofOfRental.name,
        schema: ProofOfRentalSchema,
      },
    ]),
    LoggingModule,
  ],
  controllers: [RentController],
  providers: [RentalNewsRepository, RentService, ProofOfRentalRepository],
  exports: [RentService],
})
export default class RentModule {}
