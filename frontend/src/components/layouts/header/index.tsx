import { Col, Menu, Row, Typography } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { menuItemsBeforeLogin, menuItemsForAdmin, menuItemsForTeacher, menuItemsForStudent } from '../../../constants'

import styles from './style.module.scss'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import React from 'react'
import Image from 'next/image'
import AvatarImage from '../../../assets/images/avatar.png'

const { Text } = Typography

function CustomHeader() {
  const router = useRouter()
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const user = useSelector((state: any) => state.auth?.user)

  const handleClickMenuItem = (route: string) => {
    router.push(route)
  }

  return (
    <Header className={styles.header}>
      <Row>
        <Col span={5} style={{ display: 'flex', alignItems: 'center', paddingLeft: 135 }}>
          <Typography>
            <a href="http://localhost:3000/home">
              <Text className={styles.logo_text}>Learning</Text>
            </a>
          </Typography>
        </Col>
        <Col span={!jwt ? 12 : 10} offset={!jwt ? 7 : 6}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={
              jwt && user.role === 'admin'
                ? menuItemsForAdmin
                : jwt && user.role === 'teacher'
                ? menuItemsForTeacher
                : jwt && user.role === 'student'
                ? menuItemsForStudent
                : menuItemsBeforeLogin
            }
            className={styles.menu}
            onClick={({ key }) => handleClickMenuItem(key)}
          />
        </Col>
        <Col span={3}>
          {jwt && (
            <div className={styles.container}>
              <Image src={AvatarImage} alt="avatar" className={styles.avatar} />
              <Text strong style={{ marginLeft: '10px' }} className={styles.name}>
                {user.username}
              </Text>
            </div>
          )}
        </Col>
      </Row>
    </Header>
  )
}

export default React.memo(CustomHeader)
