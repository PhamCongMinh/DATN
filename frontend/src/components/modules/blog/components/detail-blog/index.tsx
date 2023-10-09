import Image from 'next/image'
import RentOutImage from '../../../../../assets/images/image_introduction_rentout.png'
import styles from './style.module.scss'
import { Breadcrumb, Button, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { NextPage } from 'next'
import { BlogType, RentNews } from '../../../../../types'

const { Text, Title } = Typography

type IProps = {
  rentNews: BlogType
  handleClickBack: () => void
}

const DetailBlogContent: NextPage<IProps> = props => {
  const { rentNews } = props
  return (
    <div style={{ marginLeft: 200, marginTop: 25 }}>
      <Breadcrumb>
        <Breadcrumb.Item onClick={props.handleClickBack}>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={props.handleClickBack}>
          <UserOutlined />
          <span>Blog</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>
        {rentNews.title}
        <br />
      </Text>
      <Image src={RentOutImage} alt="House1" style={{ width: 800, height: 400 }} />
      <div>
        <pre className={styles.text} style={{ width: 800, whiteSpace: 'initial' }}>
          {rentNews.content}
        </pre>
      </div>
    </div>
  )
}

export default React.memo(DetailBlogContent)
