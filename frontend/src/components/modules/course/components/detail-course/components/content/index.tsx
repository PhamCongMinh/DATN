import React, { useEffect, useState } from 'react'
import { Button, Collapse, Modal, Typography, Breadcrumb, Space, message } from 'antd'

import styles from './style.module.scss'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import Image from 'next/image'
import TrashIcon from '../../../../../../../assets/icons/trash.png'
import EditIcon from '../../../../../../../assets/icons/edit.png'
import AddIcon from '../../../../../../../assets/icons/plus.png'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import ViewLesson from './components/view-lesson'
import AxiosService from '../../../../../../../utils/axios'
import { ICourse } from '../../../../index'
import { ISection } from '../../../../../../../types/section'
import { ILesson, LessonType } from '../../../../../../../types/lesson'

const { Text, Title } = Typography

const url = 'http://localhost:3000/course'

type IProps = {
  course: ICourse
}

const CourseContent: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [content, setContent] = useState<ISection[]>()

  const [isLessonOpen, setIsLessonOpen] = useState(false)
  const [currentLesson, setCurrentLesson] = useState<ILesson>()

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        course_id: props.course._id
      }
      const response = await axiosService.get('/course/section', { params: query })
      setContent(response.data)
    }
    fetchData().catch(console.error)
    setLoading(false)
  }, [isLoading])

  const handleCancel = () => {
    setIsLessonOpen(false)
    setCurrentLesson(undefined)
    setLoading(true)
  }

  const handleClickLesson = (lesson: ILesson) => {
    setCurrentLesson(lesson)
    setIsLessonOpen(true)
  }

  const items = content?.map((section: ISection, index) => {
    const { name, lessons } = section
    return {
      key: index.toString(),
      label: name,
      style: {
        fontSize: 18,
        lineHeight: 1.4,
        color: '#171717',
        fontWeight: 500,
        position: 'relative',
        alignItems: 'center'
      },
      children: (
        <div className={styles.section}>
          {lessons?.map((lesson, index) => (
            <div key={lesson._id} className={styles.lesson}>
              <div onClick={() => handleClickLesson(lesson)}>
                {lesson.name}
                <br />
              </div>
            </div>
          ))}
        </div>
      )
    }
  })
  return (
    <div className={styles.content}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined />
          <span onClick={handleCancel}>Khóa học</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      {!isLessonOpen ? (
        <>
          <Text className={styles.title1}>
            Thông tin chi tiết khóa học
            <br />
          </Text>

          <Collapse items={items} defaultActiveKey={['0']} style={{ minWidth: 1150 }} />
        </>
      ) : (
        <ViewLesson lesson={currentLesson} onBack={handleCancel} />
      )}
    </div>
  )
}

export default CourseContent
