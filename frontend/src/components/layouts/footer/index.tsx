import { Footer } from 'antd/lib/layout/layout'
import { Space, Typography } from 'antd'

import styles from './style.module.scss'
import React from 'react'

const { Text, Title } = Typography

function CustomFooter() {
  return (
    <Footer style={{ padding: 0, textAlign: 'center' }}>
      <Space className={styles.container}>
        <Title className={styles.main_title}>RentHouse</Title>
        <div style={{ marginLeft: 300, marginRight: 50, textAlign: 'left' }}>
          <Title className={styles.title}>About RentHouse</Title>
          <Text className={styles.text}>Support rent and rent out</Text>
        </div>
        <div style={{ marginRight: 50, textAlign: 'left' }}>
          <Title className={styles.title}>Contact</Title>
          <Text className={styles.text}>Email: minh.pc0806@gmail.com</Text>
        </div>
        <div style={{ textAlign: 'left' }}>
          <Title className={styles.title}>Customer Service</Title>
          <Text className={styles.text}>Need Help?</Text>
        </div>
      </Space>
      <Text style={{ display: 'block' }}>Terms and Conditions | Privacy Statement | Cookie Settings</Text>
    </Footer>
  )
}

export default React.memo(CustomFooter)
