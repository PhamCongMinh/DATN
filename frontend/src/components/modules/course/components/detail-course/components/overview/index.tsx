import React, { useEffect, useState } from 'react'
import { Button, Collapse, Modal, Typography, Breadcrumb, Space, message } from 'antd'

import styles from './style.module.scss'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../../../utils/axios'
import { ICourse } from '../../../../index'
import { ISection } from '../../../../../../../types/section'
import Image from 'next/image'
import BackgroundImage from '../../../../../../../assets/images/background-course.png'

const { Text, Title } = Typography

type IProps = {
  course: ICourse
}

const OverviewCourse: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [content, setContent] = useState<ISection[]>()

  const handleCancel = () => {
    setLoading(true)
  }

  return (
    <div className={styles.content}>
      <div className={styles.space}>
        <Image src={BackgroundImage} alt="House1" style={{ height: 400, width: 1480 }} />
        <div className={styles.header}>
          <Title className={styles.title}>{props.course?.name}</Title>
          <Text className={styles.title1}>{props.course?.tags}</Text>
          <Text className={styles.title2}>
            {props.course?.author}
            <br />
          </Text>
          <Space>
            <Text className={styles.text}>{props.course?.start_time?.toString()}</Text>
            <Text className={styles.text}>{props.course?.end_time?.toString()}</Text>
          </Space>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text className={styles.description}>{props.course?.description}</Text>
      </div>
    </div>
  )
}

export default OverviewCourse
