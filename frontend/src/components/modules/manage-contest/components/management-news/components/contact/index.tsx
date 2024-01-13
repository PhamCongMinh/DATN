import * as SupportImage from '../../../../../../../assets/images/support-bg.jpg'
import Image from 'next/image'
import styles from './style.module.scss'
import { Typography } from 'antd'
import React from 'react'

const { Text } = Typography

export default function Contact() {
  return (
    <div className={styles.content}>
      <div style={{ textAlign: 'center' }}>
        <Image src={SupportImage} alt="SupportImage" className={styles.image1} />
        <Text className={styles.text1}>
          Liên hệ với chúng tôi nếu bạn cần hỗ trợ: <br />
        </Text>
        <Text className={styles.text2}>
          Hotline 24/7 <br />
        </Text>
        <Text className={styles.text3}>
          Điện thoại: 0987654321 <br />
        </Text>
        <Text className={styles.text3}>
          Zalo: 0987654321
          <br />
        </Text>
      </div>
    </div>
  )
}
