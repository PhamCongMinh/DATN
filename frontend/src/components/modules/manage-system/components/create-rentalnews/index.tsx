import React from 'react'
import { Breadcrumb, Card, Col, Divider, Input, Row, Space, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

import styles from './style.module.scss'
import RentOutForm from './components/form'
import BlogForm from './components/form'

const { Text, Title } = Typography
export default function CreateBlog() {
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
        <Breadcrumb.Item>Đăng blog mới</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>Đăng blog mới</Text>
      <Divider style={{ width: 1350, margin: 0 }}></Divider>
      <Row>
        <Col span={16}>
          <BlogForm />
        </Col>
      </Row>
    </div>
  )
}
