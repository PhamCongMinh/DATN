import React from 'react'
import { Breadcrumb, Card, Col, Divider, Input, Row, Space, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

import styles from './style.module.scss'
import RentOutForm from './components/form'
import CreateCourseForm from './components/form'

const { Text, Title } = Typography
export default function CreateCourse() {
  return (
    <div className={styles.content}>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <UserOutlined />
          <span>Quản lý</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tạo khóa học mới</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>Tạo khóa học mới</Text>
      <Divider style={{ width: 1210, margin: 0 }}></Divider>
      <Row>
        <Col span={14}>
          <CreateCourseForm />
        </Col>
        <Col span={6} offset={2}>
          <Card title="" className={styles.card}>
            <p className={styles.text}>- Bạn cần điền đầy đủ thông tin vào các tất cả các mục bên </p>
            <p className={styles.text}>- Và phần mô tả khóa học nên có ít nhất 200 kí tự</p>
            <p className={styles.text}>
              - Sau khi ấn nút tạo khóa học, khóa học của bạn sẽ xuất hiện ở màn quản lý khóa học, tuy nhiên khóa học
              của bạn sẽ chưa hiển thị công khai. Bạn cần vào màn quản lý khóa học, truy cập vào khóa học của bạn, tải
              các tài liệu liên quan và chỉnh sửa các cài đặt để hoàn tất việc tạo khóa học
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
