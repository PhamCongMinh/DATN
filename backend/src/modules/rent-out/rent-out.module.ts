import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@models/entities/User.entity';
import { RentalNews, RentalNewsSchema } from '@models/entities/RentalNews';
import { RentOutService } from '@modules/rent-out/rent-out.service';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import RentalNewsRepository from '@models/repositories/RentalNews.repository';
import { RentOutController } from '@modules/rent-out/rent-out.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RentalNews.name,
        schema: RentalNewsSchema,
      },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'src/upload',
      }),
    }),
    LoggingModule,
  ],
  controllers: [RentOutController],
  providers: [RentOutService, RentalNewsRepository],
  exports: [RentOutService],
})
export default class RentOutModule {}
