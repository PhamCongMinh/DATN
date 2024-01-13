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
          <Title className={styles.title}>Become an instructor</Title>
          <Text className={styles.text}>
            Hãy tham gia cùng chúng tôi trong sứ mệnh chia sẻ tri thức. Chúng tôi cung cấp các công cụ và kỹ năng để dạy
            những gì bạn yêu thích. Các giảng viên từ khắp nơi trên thế giới đang tham gia nền tảng.
          </Text>
          <Button className={styles.button}>Tìm hiểu thêm</Button>
        </div>
        <Image src={RentOutImage} alt="Introduction Rent Out" style={{ width: 740, height: 300 }} />
      </Space>
    </div>
  )
}

export default React.memo(IntroductionRentout)
