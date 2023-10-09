import { TSearch } from '../components/modules/rent'
import { GetServerSidePropsContext } from 'next'

export const handleURLWhenClickSearchButton = (initialUrl: string, searchData: TSearch) => {
  let query = {}

  if (searchData.city) query = { ...query, city: searchData.city.replace(/\s/g, '_') }
  if (searchData.district) query = { ...query, district: searchData.district.replace(/\s/g, '_') }
  if (searchData.commune) query = { ...query, commune: searchData.commune.replace(/\s/g, '_') }
  if (searchData.minPricePerMonth) query = { ...query, minPricePerMonth: searchData.minPricePerMonth }
  if (searchData.maxPricePerMonth) query = { ...query, maxPricePerMonth: searchData.maxPricePerMonth }
  if (searchData.minArea) query = { ...query, minArea: searchData.minArea }
  if (searchData.maxArea) query = { ...query, maxArea: searchData.maxArea }
  if (searchData.rentNewsType) query = { ...query, rentNewsType: searchData.rentNewsType }

  return {
    pathname: initialUrl,
    query: query
  }
}

export const parseUrlToJson = (context: GetServerSidePropsContext) => {
  const filter = context.query
  if (filter.city) filter.city = String(filter.city).replace(/_/g, ' ')
  if (filter.district) filter.district = String(filter.district).replace(/_/g, ' ')
  if (filter.commune) filter.commune = String(filter.commune).replace(/_/g, ' ')

  return filter
}

export const parseUrlToJson2 = (filter: TSearch) => {
  if (filter.city) filter.city = String(filter.city).replace(/_/g, ' ')
  if (filter.district) filter.district = String(filter.district).replace(/_/g, ' ')
  if (filter.commune) filter.commune = String(filter.commune).replace(/_/g, ' ')

  return filter
}
