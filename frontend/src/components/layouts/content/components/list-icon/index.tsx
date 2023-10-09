import Image from 'next/image'
import { Space, Typography } from 'antd'

import TrueValueIcon from '../../../../../assets/images/icon_true_value.png'
import RealHomeIcon from '../../../../../assets/images/icon_house.png'
import RealConnectionValueIcon from '../../../../../assets/images/icon_connections.png'
import styles from './style.module.scss'
import React from 'react'

const { Text, Title } = Typography

function ListIcon() {
  return (
    <Space className={styles.space}>
      <div style={{ marginRight: 200 }}>
        <Image src={TrueValueIcon} alt="House1" className={styles.image} />
        <Title className={styles.title}>True value</Title>
        <Text className={styles.text}>Cung cấp chất lượng và giá cả phải chăng</Text>
      </div>
      <div style={{ marginRight: 200 }}>
        <Image src={RealHomeIcon} alt="House1" className={styles.image} />
        <Title className={styles.title}>Real Homes</Title>
        <Text className={styles.text}>Tìm kiếm những nhà trọ phù hợp</Text>
      </div>
      <div>
        <Image src={RealConnectionValueIcon} alt="House1" className={styles.image} />
        <Title className={styles.title}>Real Connections</Title>
        <Text className={styles.text}>Sử dụng các tính năng hữu ích để kết nối với người cho thuê</Text>
      </div>
    </Space>
  )
}

export default React.memo(ListIcon)
