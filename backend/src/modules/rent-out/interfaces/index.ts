import { RentalStatus, RentNewsType } from '@models/entities/RentalNews';

export interface IRentalNews {
  status: RentalStatus;
  pricePerMonth: number;
  area: number;
  city: string;
  district: string;
  commune: string;
  street: string;
  houseNumber: number;
  specificAddress: string;
  title: string;
  description: string;
  imageUrl: string[];
  startDay?: Date;
  endDay?: Date;
  rentNewsType: RentNewsType;
}
