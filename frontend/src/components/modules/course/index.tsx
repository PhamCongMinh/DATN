import { Alert, Button, Menu, MenuProps, Space, Typography } from 'antd'
import styles from './style.module.scss'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import AvatarImage from '../../../assets/images/avatar.png'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import CreateRentalnews from './components/create-rentalnews'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import ManagementRentalNews from './components/management-news'
import { authSliceActions } from '../../../store/auth/authSlice'
import Contact from './components/management-news/components/contact'
import ManagementCourse, { TSearchCourse } from './components/management-course'
import { RentNews } from '../../../types'
import { TSearch } from '../rent'
import { handleURLWhenClickSearchButton } from '../../../utils/url'
import DetailHouseContent from '../detail-house'

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
  getItem('Quản lý khóa học', 'managementCourse', <AppstoreOutlined />),
  getItem('Tạo khóa học mới', 'createNews', <AppstoreOutlined />),
  getItem('Quản lí tin đăng', 'managementNews', <AppstoreOutlined />),
  getItem('Liên hệ', 'contact', <MailOutlined />)
]

//TODO:
const data = [
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' },
  { _id: '1', author: '12324', name: 'name', tag: 'tag', status: 'status' }
]

function CourseContent() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('managementCourse')
  const [isOpenDetailCourse, setIsOpenDetailCourse] = useState<boolean>(false)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const user = useSelector((state: any) => state.auth?.user)

  //TODO:
  const initialUrl = '/course'
  const [reload, setReload] = useState<boolean>(false)
  const [appliedFilter, setAppliedFilter] = useState<TSearchCourse>({})

  const handleUserNotLogin = useCallback(() => {
    window.location.href = '/signin'
    // router.push('/signin')
  }, [])

  if (!jwt || user.role !== 'teacher') {
    return (
      <div>
        <Alert
          message="Không có quyền truy cập"
          showIcon
          description="Bạn phải đăng nhập với tài khoản giáo viên để sử dụng chức năng này"
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

  //TODO:
  const handleClickSearchButton = async (searchData: TSearchCourse) => {
    console.log('searchData', searchData)
    // const url = handleURLWhenClickSearchButton(initialUrl, searchData)
    // await router.push(url)
  }

  const handleReload = () => {
    setReload(true)
  }

  const handleClickCourseDetail = (course: any) => {
    setIsOpenDetailCourse(true)
  }

  return (
    <div>
      {isOpenDetailCourse === false && (
        <div className={styles.container}>
          <Space className={styles.space}>
            <div>
              <Menu
                onClick={({ key }) => handleClickMenuItem(key)}
                style={{ width: 230, height: 1165 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                className={styles.menu}
              />
            </div>
            {selectedMenuItem === 'managementCourse' && (
              <ManagementCourse
                data={data}
                handleSearch={handleClickSearchButton}
                appliedFilter={appliedFilter}
                setReload={handleReload}
                openDetailCourse={handleClickCourseDetail}
              />
            )}
            {selectedMenuItem === 'createNews' && <CreateRentalnews />}
            {selectedMenuItem === 'managementNews' && <ManagementRentalNews />}
            {selectedMenuItem === 'contact' && (
              <div className={styles.contact}>
                <Contact />
              </div>
            )}
          </Space>
        </div>
      )}
      {isOpenDetailCourse === true && (
        <DetailHouseContent rentNews={detailHouse} handleClickBack={handleClickBack} setReload={props.setReload} />
      )}
    </div>
  )
}

export default React.memo(CourseContent)
