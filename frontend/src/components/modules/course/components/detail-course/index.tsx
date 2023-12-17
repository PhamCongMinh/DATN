import styles from './style.module.scss'
import { Breadcrumb, Button, Card, Col, Divider, Input, Menu, MenuProps, Rate, Row, Space, Typography } from 'antd'
import {
  AppstoreOutlined,
  ContainerOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Discuss from './components/discuss'
import CourseContent from './components/content'
import AxiosService from '../../../../../utils/axios'
import { ICourse } from '../../index'
import { authSliceActions } from '../../../../../store/auth/authSlice'
import OverviewCourse from './components/overview'

const { Text, Title } = Typography

const characteristic = 'Đối tượng thuê:\tTất cả\n' + 'Gói tin:\tTin VIP nổi bật\n'

type IProps = {
  course: ICourse
  handleClickBack: () => void
  setReload: () => void
  isJoinedCourse?: boolean
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

export interface IComment {
  comment: string
  rate: number
}

const initialComment: IComment = {
  comment: '',
  rate: 3
}

type MenuItem = Required<MenuProps>['items'][number]
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

const itemsForNotJoined: MenuProps['items'] = [
  getItem('Giới thiệu', 'overview', <ContainerOutlined />),
  getItem('Quay lại', 'back', <AppstoreOutlined />)
]

const itemsForJoined: MenuProps['items'] = [
  getItem('Khóa học', 'content', <AppstoreOutlined />),
  getItem('Thảo luận', 'discuss', <MailOutlined />),
  getItem('Quay lại', 'back', <AppstoreOutlined />)
]

const DetailCourseContent: NextPage<IProps> = props => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('content')
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const user = useSelector((state: any) => state.auth?.user)
  const router = useRouter()
  const dispatch = useDispatch()

  const [isJoinedCourse, setIsJoinedCourse] = useState<boolean>(false)

  useEffect(() => {
    const axiosService = new AxiosService('application/json', jwt)
    const fetchData = async () => {
      const response = await axiosService.get(`/course/${props?.course?._id}/check-joined`)
      const data: boolean = response.data.is_joined
      setIsJoinedCourse(data)
      if (!data) setSelectedMenuItem('overview')
    }

    fetchData()
  }, [props?.course?._id])

  const handleClickMenuItem = async (key: string) => {
    if (key === 'logout') {
      dispatch(authSliceActions.logOut())
      router.push('/home')
    }
    setSelectedMenuItem(key)
  }

  return (
    <div className={styles.content}>
      <div style={{ background: '#ffffff', minHeight: 1110 }}>
        {
          // @ts-ignore
          <Space className={styles.space}>
            {props?.isJoinedCourse && (
              <div>
                <Menu
                  onClick={({ key }) => handleClickMenuItem(key)}
                  style={{ width: 215, height: 1165 }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  items={isJoinedCourse ? itemsForJoined : itemsForNotJoined}
                  className={styles.menu}
                  mode="inline"
                />
              </div>
            )}
            {selectedMenuItem === 'overview' && <OverviewCourse course={props.course} />}
            {selectedMenuItem === 'content' && <CourseContent course={props.course} />}
            {selectedMenuItem === 'discuss' && <Discuss course={props.course} />}
            {selectedMenuItem === 'back' && props.handleClickBack()}
          </Space>
        }
      </div>
    </div>
  )
}

export default DetailCourseContent
