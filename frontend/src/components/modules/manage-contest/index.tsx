import { Alert, Button, Layout, Menu, MenuProps, Space, Typography } from 'antd'
import styles from './style.module.scss'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import React, { useCallback, useEffect, useState } from 'react'
import CreateRentalnews from './components/create-course'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import ManagementRentalNews from './components/management-news'
import { authSliceActions } from '../../../store/auth/authSlice'
import Contact from './components/management-news/components/contact'
import ManagementCourse, { TSearchCourse } from './components/management-course'
import AxiosService from '../../../utils/axios'
import { NextPage } from 'next'
import CreateCourse from './components/create-course'
import DetailCourseContent from './components/detail-course'

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
  getItem('Quản lý cuộc thi', 'managementCourse', <AppstoreOutlined />),
  getItem('Tạo cuộc thi mới', 'createCourse', <AppstoreOutlined />),
  getItem('Liên hệ', 'contact', <MailOutlined />)
]

export interface ICourse {
  _id: string
  name?: string
  tags?: string
  description?: string
  img?: string
  start_time?: Date
  end_time?: Date
  status?: string
  author?: string
  created_at?: Date
  updated_at?: Date
}

const ContestContent: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('managementCourse')
  const [isOpenDetailCourse, setIsOpenDetailCourse] = useState<boolean>(false)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const user = useSelector((state: any) => state.auth?.user)

  //TODO:
  const initialUrl = '/manage-course'
  const [reload, setReload] = useState<boolean>(false)
  const [appliedFilter, setAppliedFilter] = useState<TSearchCourse>({})
  const [courses, setCourses] = useState<ICourse[]>()
  const [currentCourse, setCurrentCourse] = useState<ICourse>()

  const handleUserNotLogin = useCallback(() => {
    window.location.href = '/signin'
    // router.push('/signin')
  }, [])

  useEffect(() => {
    const axiosService = new AxiosService('application/json', jwt)
    const fetchData = async () => {
      const response = await axiosService.get('/course/my-course', { params: { is_contest: true } })
      const data: ICourse[] = response.data
      setCourses(data)
      setReload(false)
    }
    fetchData()
  }, [reload])

  // if (!courses) {
  //   return (
  //     <Layout>
  //       <CustomHeader />
  //       <Content className="site-layout" style={{ padding: '0px', margin: '0px' }}></Content>
  //     </Layout>
  //   )
  // }

  const handleClickMenuItem = async (key: string) => {
    if (key === 'logout') {
      dispatch(authSliceActions.logOut())
      router.push('/home')
    }
    setSelectedMenuItem(key)
    handleReload()
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

  const handleClickCourseDetail = (course: ICourse) => {
    setCurrentCourse(course)
    setIsOpenDetailCourse(true)
  }

  const handleClickBack = () => {
    setIsOpenDetailCourse(false)
  }

  return (
    <div>
      {isOpenDetailCourse === false && (
        <div className={styles.container}>
          <Space className={styles.space}>
            <div>
              <Menu
                onClick={({ key }) => handleClickMenuItem(key)}
                style={{ width: 215, height: 1165 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                className={styles.menu}
              />
            </div>
            {selectedMenuItem === 'managementCourse' && courses && (
              <ManagementCourse
                data={courses}
                handleSearch={handleClickSearchButton}
                appliedFilter={appliedFilter}
                setReload={handleReload}
                openDetailCourse={handleClickCourseDetail}
              />
            )}
            {selectedMenuItem === 'createCourse' && <CreateCourse />}
            {selectedMenuItem === 'contact' && (
              <div className={styles.contact}>
                <Contact />
              </div>
            )}
          </Space>
        </div>
      )}
      {isOpenDetailCourse === true && currentCourse && (
        <DetailCourseContent course={currentCourse} handleClickBack={handleClickBack} setReload={handleReload} />
      )}
    </div>
  )
}

export default React.memo(ContestContent)
