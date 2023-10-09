import React, { useEffect, useState } from 'react'
import { Input, Space, Typography } from 'antd'

import { AxiosService } from '../../../../../../../utils/axios'
import styles from './style.module.scss'
import { useSelector } from 'react-redux'

const { Text } = Typography
export interface IStatisticaData {
  blogCount: string
  userCount: string
  rentalNewsCount: string
  renterCount: string
  hostCount: string
  rentalNews1: string
  rentalNews2: string
  rentalNews3: string
  rentalNews4: string
  lastDayRentalNewsCount: string
  lastDayRentalNews1: string
  lastDayRentalNews2: string
  lastDayRentalNews3: string
  lastDayRentalNews4: string
  lastDayUserCount: string
  lastDayBlogCount: string
  lastDayRenterCount: string
  lastDayHostCount: string
}

export default function StatisticalForm() {
  const [state, setState] = useState<IStatisticaData>()
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get('/manage-system')
      console.log(response.data)
      setState(response.data)
    }
    fetchData()
  }, [])

  return (
    <Space>
      <div style={{ minWidth: 700 }}>
        <Text className={styles.title1}>
          Toàn bộ dữ liệu
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số tin được đăng: ' + state?.rentalNewsCount + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số tin về Phòng Trọ: ' + state?.rentalNews1 + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số Nhà Thuê Nguyên Căn: ' + state?.rentalNews2 + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số Căn Hộ Mini: ' + state?.rentalNews3 + ' bài đăng'}
          <br />
        </Text>{' '}
        <Text className={styles.title2}>
          {'- Tổng số Homestay: ' + state?.rentalNews4 + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số người dùng: ' + state?.userCount + ' người'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số bài blog: ' + state?.blogCount + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số người thuê trọ: ' + state?.renterCount + ' người'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số người cho thuê: ' + state?.hostCount + ' người'}
          <br />
        </Text>
      </div>
      <div style={{ minWidth: 600 }}>
        <Text className={styles.title1}>
          Thống kê ngày hôm qua
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số tin được đăng: ' + state?.lastDayRentalNewsCount + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số tin về Phòng Trọ: ' + state?.lastDayRentalNews1 + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số Nhà Thuê Nguyên Căn: ' + state?.lastDayRentalNews2 + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số Căn Hộ Mini: ' + state?.lastDayRentalNews3 + ' bài đăng'}
          <br />
        </Text>{' '}
        <Text className={styles.title2}>
          {'- Tổng số Homestay: ' + state?.lastDayRentalNews4 + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số người dùng: ' + state?.lastDayUserCount + ' người'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số bài blog: ' + state?.lastDayBlogCount + ' bài đăng'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số người thuê trọ: ' + state?.lastDayRenterCount + ' người'}
          <br />
        </Text>
        <Text className={styles.title2}>
          {'- Tổng số người cho thuê: ' + state?.lastDayHostCount + ' người'}
          <br />
        </Text>
      </div>
    </Space>
  )
}
