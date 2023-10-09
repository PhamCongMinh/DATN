import Image from 'next/image'
import { Button, Space, Typography } from 'antd'
import House1 from '../../../assets/images/house1.jpeg'
import RentOutImage from '../../../assets/images/image_introduction_rentout.png'

import styles from './style.module.scss'
import Paragraph from 'antd/lib/typography/Paragraph'
import React from 'react'

const { Text, Title } = Typography

interface IProps {
  title: string
  description: string
  onClick: () => void
}

const Blog: React.FC<IProps> = (props): JSX.Element => {
  const { title, description } = props

  return (
    <div style={{ marginLeft: 150, marginBottom: 50 }} onClick={props.onClick}>
      <Space className={styles.space}>
        <Image src={RentOutImage} alt="House1" style={{ width: 350, height: 250 }} />
        <div className={styles.container}>
          <Title ellipsis={{ rows: 1 }} className={styles.title}>
            {title}
          </Title>
          <Paragraph ellipsis={{ rows: 2, expandable: false }} className={styles.text}>
            {description}
          </Paragraph>
        </div>
      </Space>
    </div>
  )
}

export default React.memo(Blog)
