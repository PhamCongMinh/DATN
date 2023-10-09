import Image from 'next/image'
import { Button, Space, Typography } from 'antd'
import RentOutImage from '../../../../../assets/images/image_introduction_rentout.png'

import styles from './style.module.scss'
import React from 'react'

const { Text, Title } = Typography

function IntroductionRentout() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100, marginBottom: 100 }}>
      <Space className={styles.space}>
        <div className={styles.container}>
          <Title className={styles.title}>Cho thuê nhà trọ</Title>
          <Text className={styles.text}>
            Kiếm thêm thu nhập khi cho các sinh viên, người lao động, khách du lịch đang tìm kiếm chỗ ở thuê phòng trống
            của bạn.
          </Text>
          <Button className={styles.button}>Tìm hiểu thêm</Button>
        </div>
        <Image src={RentOutImage} alt="Introduction Rent Out" style={{ width: 740, height: 300 }} />
      </Space>
    </div>
  )
}

export default React.memo(IntroductionRentout)
