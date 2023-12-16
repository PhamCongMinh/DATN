import styles from './style.module.scss'
import { Breadcrumb, Button, Card, Col, Divider, Input, Menu, MenuProps, Rate, Row, Space, Typography } from 'antd'
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
import Participant from './components/participant'
import ExamBank from './components/exam-bank'
import Grade from './components/grade'
import Discuss from './components/discuss'
import CourseContent from './components/content'
import QuestionBank from './components/question-bank'
import { ICourse } from '../course'

const { Text, Title } = Typography

const characteristic = 'Đối tượng thuê:\tTất cả\n' + 'Gói tin:\tTin VIP nổi bật\n'

type IProps = {
  course: ICourse
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
  getItem('Khóa học', 'content', <AppstoreOutlined />),
  getItem('Người tham gia', 'participant', <AppstoreOutlined />),
  getItem('Ngân hàng câu hỏi', 'question_bank', <AppstoreOutlined />),
  getItem('Đề thi', 'exam_bank', <MailOutlined />),
  getItem('Điểm', 'grade', <MailOutlined />),
  getItem('Thảo luận', 'discuss', <MailOutlined />),
  getItem('Quay lại', 'back', <AppstoreOutlined />)
]

const DetailCourseContent: NextPage<IProps> = props => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState('content')
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
      <div style={{ background: '#ffffff', minHeight: 1110 }}>
        {
          // @ts-ignore
          <Space className={styles.space}>
            <Menu
              onClick={({ key }) => handleClickMenuItem(key)}
              style={{ width: 215, height: 1165 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              // mode="horizontal"
              items={items}
              className={styles.menu}
            />
            {selectedMenuItem === 'content' && <CourseContent course={props.course} />}
            {selectedMenuItem === 'participant' && <Participant course={props.course} />}
            {selectedMenuItem === 'question_bank' && <QuestionBank course={props.course} />}
            {selectedMenuItem === 'exam_bank' && <ExamBank course={props.course} />}
            {selectedMenuItem === 'grade' && <Grade />}
            {selectedMenuItem === 'discuss' && <Discuss course={props.course} />}
            {selectedMenuItem === 'back' && props.handleClickBack()}
          </Space>
        }
      </div>
    </div>
  )
}

export default DetailCourseContent
