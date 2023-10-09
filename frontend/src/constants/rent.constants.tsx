import { MenuProps } from 'antd'

export enum FilterText {

  MINPRICE = 'Giá thấp nhất',
  MAXPRICE = 'Giá lớn nhất',
  MINAREA = 'Diện tích nhỏ nhất',
  MAXAREA = 'Diện tích lớn nhất',
  CITY = 'Thành phố',
  DISTRICT = 'Quận',
  COMMUNE = 'Phường'
}

export const SortedByItems: MenuProps['items'] = [
  {
    label: 'Địa điểm',
    key: 'ADDRESS'
  },
  {
    label: 'Giá',
    key: 'PRICE'
  },
  {
    label: 'Diện tích',
    key: 'AREA'
  }
]

export const subContentTitle = 'Phòng trọ cho thuê tại Hà Nội'

export const listArea = [
  {
    title: 'Quận Ba Đình'
  },
  {
    title: 'Quận Bắc Từ Liêm '
  },
  {
    title: 'Quận Cầu Giấy '
  },
  {
    title: 'Quận Đống Đa '
  },
  {
    title: 'Quận Hà Đông '
  },
  {
    title: 'Quận Hai Bà Trưng '
  },
  {
    title: 'Quận Hoàn Kiếm '
  },
  {
    title: 'Quận Hoàng Mai '
  },
  {
    title: 'Quận Long Biên '
  },
  {
    title: 'Quận Nam Từ Liêm '
  },
  {
    title: 'Quận Tây Hồ '
  },
  {
    title: 'Quận Thanh Xuân '
  },
  {
    title: 'Huyện Chương Mỹ '
  },
  {
    title: 'Huyện Thanh Trì '
  }
]
