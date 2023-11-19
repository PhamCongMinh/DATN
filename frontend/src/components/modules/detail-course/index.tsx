import styles from './style.module.scss'
import { Breadcrumb, Button, Card, Col, Divider, Input, Menu, MenuProps, Rate, Row, Typography } from 'antd'
import { AppstoreOutlined, HomeOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import React, { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import AxiosService from '../../../utils/axios'
import { useRouter } from 'next/router'
import { authSliceActions } from '../../../store/auth/authSlice'
import CreateRentalnews from '../course/components/create-course'
import ManagementRentalNews from '../course/components/management-news'
import Contact from '../course/components/management-news/components/contact'
import CourseSetting from './components/setting'
import Participant from './components/participant'
import QuestionBank from './components/question-bank'
import ExamBank from './components/exam-bank'
import Grade from './components/grade'
import Discuss from './components/discuss'

const { Text, Title } = Typography

const characteristic = 'Đối tượng thuê:\tTất cả\n' + 'Gói tin:\tTin VIP nổi bật\n'

type IProps = {
  rentNews: any
  handleClickBack: () => void
  setReload: () => void
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

const items: MenuProps['items'] = [
  getItem('Khóa học', 'setting', <AppstoreOutlined />),
  getItem('Người tham gia', 'participant', <AppstoreOutlined />),
  getItem('Ngân hàng câu hỏi', 'question_bank', <AppstoreOutlined />),
  getItem('Đề thi', 'exam_bank', <MailOutlined />),
  getItem('Điểm', 'grade', <MailOutlined />),
  getItem('Thảo luận', 'discuss', <MailOutlined />)
]

const DetailCourseContent: NextPage<IProps> = props => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('managementCourse')
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClickMenuItem = async (key: string) => {
    if (key === 'logout') {
      dispatch(authSliceActions.logOut())
      router.push('/home')
    }
    setSelectedMenuItem(key)
  }

  return (
    <div className={styles.content}>
      <Breadcrumb>
        <Breadcrumb.Item onClick={props.handleClickBack}>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={props.handleClickBack}>
          <UserOutlined />
          <span>Khóa học</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>
        Thông tin chi tiết khóa học
        <br />
      </Text>

      <div>
        <Menu
          onClick={({ key }) => handleClickMenuItem(key)}
          // style={{ width: 230, height: 1165 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="horizontal"
          items={items}
          className={styles.menu}
        />
        {selectedMenuItem === 'setting' && <CourseSetting />}
        {selectedMenuItem === 'participant' && <Participant />}
        {selectedMenuItem === 'question_bank' && <QuestionBank />}
        {selectedMenuItem === 'exam_bank' && <ExamBank />}
        {selectedMenuItem === 'grade' && <Grade />}
        {selectedMenuItem === 'discuss' && <Discuss />}
      </div>
    </div>
  )
}

export default DetailCourseContent
