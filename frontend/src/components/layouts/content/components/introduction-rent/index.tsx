import Image from 'next/image'
import { Typography } from 'antd'

import StudentHouse from '../../../../../assets/images/student_house.jpeg'

import styles from './style.module.scss'
import React from 'react'

const { Text } = Typography

function IntroductionRent() {
  return (
    <div>
      <div style={{ marginTop: 100 }}>
        <Text className={styles.title}>
          Find suitable courses for you
          <br />
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 50, marginLeft: 135 }}>
          <Image src={StudentHouse} alt="House1" className={styles.image} />
          <Text className={styles.text}>
            Hệ thống cung cấp vô vàn các khóa học để nâng cao các kỹ năng của bạn. Với các đánh giá giúp bạn yên tâm
            rằng thông tin khóa học là chính xác, được kiểm chứng và tin cậy.
          </Text>
        </div>
      </div>
    </div>
  )
}

export default React.memo(IntroductionRent)
