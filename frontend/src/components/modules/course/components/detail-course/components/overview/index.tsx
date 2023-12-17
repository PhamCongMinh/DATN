import React, { useEffect, useState } from 'react'
import { Button, Collapse, Modal, Typography, Breadcrumb, Space, message, Divider } from 'antd'

import styles from './style.module.scss'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../../../utils/axios'
import { ISection } from '../../../../../../../types/section'
import Image from 'next/image'
import BackgroundImage3 from '../../../../../../../assets/images/background-course3.png'
import { ICourse } from '../../../../../../../types/course'
import DateIcon from '../../../../../../../assets/icons/date.png'

const { Text, Title } = Typography

type IProps = {
  course: ICourse
  back: () => void
  reload: () => void
}

const OverviewCourse: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [content, setContent] = useState<ISection[]>()

  const handleClickButton = () => {
    Modal.confirm({
      title: 'Bạn có chắc muốn đăng ký khóa học này?',
      onOk: async () => {
        try {
          const res = await axiosService.post(`course/${props.course._id}/join`, {})
          props.reload()
          message.success('Đăng ký khóa học thành công')
        } catch (e) {
          message.error('Đăng ký khóa học thất bại')
        }
      },
      onCancel: () => {}
    })
  }

  return (
    <div className={styles.content}>
      <div className={styles.space}>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <span onClick={props.back} style={{ color: '#fff' }}>
                Khóa học
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span style={{ color: '#fff' }}>Thông tin chi tiết</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Image src={BackgroundImage3} alt="House1" style={{ height: 450, width: 1480 }} />
        <div className={styles.header}>
          <Title className={styles.name}>{props.course?.name}</Title>
          <div className={styles.subheader}>
            <Text className={styles.summary}>
              {props.course?.summary}
              <br />
            </Text>
            <Space className={styles.space_date}>
              <div>
                <Space>
                  <Image src={DateIcon} alt="icon" className={styles.icon} />
                  <div>
                    <Text className={styles.date}>
                      Lịch đăng ký
                      <br />
                    </Text>
                    <Space>
                      <Text className={styles.date}>{props.course?.start_registration?.toString().split('T')[0]}</Text>
                      <Text className={styles.date}>{props.course?.end_registration?.toString().split('T')[0]}</Text>
                    </Space>
                  </div>
                </Space>
              </div>
              <div>
                <Space>
                  <Image src={DateIcon} alt="icon" className={styles.icon} />
                  <div>
                    <Text className={styles.date}>
                      Lịch học
                      <br />
                    </Text>
                    <Space>
                      <Text className={styles.date}>{props.course?.start_time?.toString().split('T')[0]}</Text>
                      <Text className={styles.date}>{props.course?.end_time?.toString().split('T')[0]}</Text>
                    </Space>
                  </div>
                </Space>
              </div>
            </Space>
            <Button onClick={handleClickButton} className={styles.button}>
              Đăng ký học
            </Button>
          </div>
        </div>
      </div>
      <Space className={styles.space_tab}>
        <Text className={styles.tab}>Giới thiệu khóa học</Text>
        <Text className={styles.tab}>Nội dung khóa học</Text>
        <Text className={styles.tab}>Giáo viên</Text>
      </Space>
      <Divider style={{ marginTop: 0 }} />
      <div className={styles.description}>
        <Title className={styles.title}>Giới thiệu về khóa học</Title>
        <Text className={styles.text}>{props.course?.introduction}</Text>
        <Title className={styles.title}>Nội dung khóa học</Title>
        <Text className={styles.text}>{props.course?.content_introduction}</Text>
      </div>
      {/*<div style={{ display: 'flex', justifyContent: 'center' }}>*/}
      {/*  <Text className={styles.description}>{props.course?.description}</Text>*/}
      {/*</div>*/}
    </div>
  )
}

export default OverviewCourse
