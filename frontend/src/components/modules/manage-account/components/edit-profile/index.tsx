import { Breadcrumb, Card, Col, Divider, Row, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import styles from './style.module.scss'
import EditProfileForm from './components/form'

const { Text } = Typography
function EditProfile() {
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
        <Breadcrumb.Item>Cập nhật thông tin cá nhân</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>Cập nhật thông tin cá nhân</Text>
      <Divider style={{ width: 1350 }}></Divider>
      <Row>
        <Col span={14}>
          <EditProfileForm />
        </Col>
        <Col span={6} offset={2}>
          <Card title="" className={styles.card}>
            <p className={styles.text}>- Nội dung phải viết bằng tiếng Việt có dấu</p>
            <p className={styles.text}>- Tiêu đề tin không dài quá 100 kí tự</p>
            <p className={styles.text}>- Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn</p>
            <p className={styles.text}>
              - Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ
              bằng cách kéo icon tới đúng vị trí của tin rao.
            </p>
            <p className={styles.text}>
              - Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh
              để được giao dịch nhanh chóng
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(EditProfile)
