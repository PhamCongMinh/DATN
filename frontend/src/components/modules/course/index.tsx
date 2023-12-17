import { Alert, Button, Layout, Menu, MenuProps, Space, Typography } from 'antd'
import styles from './style.module.scss'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { authSliceActions } from '../../../store/auth/authSlice'
import JoinedCourse, { TSearchCourse } from './components/joined-course'
import AxiosService from '../../../utils/axios'
import { NextPage } from 'next'
import DetailCourseContent from './components/detail-course'
import Contact from '../manage-account/components/contact'
import AllCourse from './components/all-course'
import { ICourse } from '../../../types/course'

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
  getItem('Tất cả khóa học', 'course', <AppstoreOutlined />),
  getItem('Khóa học tham gia', 'joinedCourse', <AppstoreOutlined />),
  getItem('Liên hệ', 'contact', <MailOutlined />)
]

const CourseContent: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('course')
  const [isOpenDetailCourse, setIsOpenDetailCourse] = useState<boolean>(false)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const user = useSelector((state: any) => state.auth?.user)

  //TODO:
  const initialUrl = '/course'
  const [reload, setReload] = useState<boolean>(false)
  const [appliedFilter, setAppliedFilter] = useState<TSearchCourse>({})
  const [courses, setCourses] = useState<ICourse[]>()
  const [joinedCourses, setJoinedCourses] = useState<ICourse[]>()
  const [currentCourse, setCurrentCourse] = useState<ICourse>()

  useEffect(() => {
    const axiosService = new AxiosService('application/json', jwt)
    const fetchData = async () => {
      const response1 = await axiosService.get('/course')
      const data1: ICourse[] = response1.data
      const response2 = await axiosService.get('/course/joined')
      const data2: ICourse[] = response2.data

      setCourses(data1)
      setJoinedCourses(data2)
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
            {selectedMenuItem === 'course' && courses && (
              <AllCourse
                data={courses}
                handleSearch={handleClickSearchButton}
                appliedFilter={appliedFilter}
                setReload={handleReload}
                openDetailCourse={handleClickCourseDetail}
              />
            )}
            {selectedMenuItem === 'joinedCourse' && joinedCourses && (
              <JoinedCourse
                data={joinedCourses}
                handleSearch={handleClickSearchButton}
                appliedFilter={appliedFilter}
                setReload={handleReload}
                openDetailCourse={handleClickCourseDetail}
              />
            )}
            {selectedMenuItem === 'contact' && (
              <div className={styles.contact}>
                <Contact />
              </div>
            )}
          </Space>
        </div>
      )}
      {isOpenDetailCourse === true && currentCourse && (
        <DetailCourseContent
          isJoinedCourse={selectedMenuItem === 'joinedCourse' ? true : false}
          course={currentCourse}
          handleClickBack={handleClickBack}
          setReload={handleReload}
        />
      )}
    </div>
  )
}

export default React.memo(CourseContent)
