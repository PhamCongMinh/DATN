import { Alert, Button, Menu, MenuProps, Space, Typography } from 'antd'
import styles from './style.module.scss'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import AvatarImage from '../../../assets/images/avatar.png'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { authSliceActions } from '../../../store/auth/authSlice'
import EditProfile from './components/edit-profile'
import Contact from './components/contact'
import EditAccount from './components/edit-account'

type MenuItem = Required<MenuProps>['items'][number]
const { Text } = Typography
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('Cập nhật thông tin cá nhân', 'editProfile', <AppstoreOutlined />),
  getItem('Cập nhật tài khoản', 'editAccount', <AppstoreOutlined />),
  getItem('Liên hệ', 'contact', <MailOutlined />),
  getItem('Thoát', 'logout', <SettingOutlined />)
]

function ManageAccountContent() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('editProfile')
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const user = useSelector((state: any) => state.auth?.user)

  const handleUserNotLogin = useCallback(() => {
    router.push('/signin')
  }, [router])

  if (!jwt) {
    return (
      <div>
        <Alert
          message="Không có quyền truy cập"
          showIcon
          description="Bạn phải đăng nhập để sử dụng chức năng này"
          type="error"
          action={
            <Button size="small" danger>
              Detail
            </Button>
          }
          closable
          onClose={handleUserNotLogin}
        />
      </div>
    )
  }

  const handleClickMenuItem = async (key: string) => {
    if (key === 'logout') {
      dispatch(authSliceActions.logOut())
      router.push('/home')
    }
    setSelectedMenuItem(key)
  }

  return (
    <div>
      <div className={styles.container}>
        <Space className={styles.space}>
          <div>
            <div className={styles.header}>
              <Image src={AvatarImage} alt="avatar" className={styles.avatar} />
              <Text strong style={{ marginLeft: '10px' }} className={styles.name}>
                {user.username}
              </Text>
            </div>
            <Menu
              onClick={({ key }) => handleClickMenuItem(key)}
              style={{ width: 256, height: 1110 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
              className={styles.menu}
            />
          </div>
          {selectedMenuItem === 'editProfile' && <EditProfile />}
          {selectedMenuItem === 'editAccount' && <EditAccount />}
          {selectedMenuItem === 'contact' && (
            <div className={styles.contact}>
              <Contact />
            </div>
          )}
        </Space>
      </div>
    </div>
  )
}

export default React.memo(ManageAccountContent)
