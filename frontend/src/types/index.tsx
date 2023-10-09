export type Filter = {
  minPricePerMonth: number
  maxPricePerMonth: number
  minArea: number
  maxArea: number
  city: string
  district: string
  commune: string
}

export enum RentalStatus {
  AVAILABLE = 'available',
  RENTED = 'rented'
}

export type User = {
  _id: string
  email: string
  password: string
  role: string
  username: string
  numberPhone: string
  zaloPhone?: string
  facebookUrl?: string
  avatarUrl?: string
  created_at: string
  updated_at: string
}

export type CommentType = {
  _id: string
  content: string
  ownerId: User
  rate: number
  created_at: string
  updated_at: string
}

export enum RentNewsType {
  TYPE1 = 'PhòngTrọ',
  TYPE2 = 'NhàThuêNguyênCăn',
  TYPE3 = 'CănHộMini',
  TYPE4 = 'Homestay'
}

export type RentNews = {
  _id: string
  ownerId: User
  status: RentalStatus
  pricePerMonth: number
  area: number
  city: string
  district: string
  commune: string
  street: string
  houseNumber: number
  specificAddress: string
  title: string
  description: string
  imageUrl: string[]
  created_at: string
  updated_at: string
  startDay: Date
  endDay: Date
  comments: CommentType[]
  rentNewsType: RentNewsType
}

export type BlogType = {
  _id: string
  title: string
  content: string
  ownerId: string
  created_at: string
  updated_at: string
}
