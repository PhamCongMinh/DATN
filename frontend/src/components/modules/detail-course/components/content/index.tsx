import React, { useEffect, useState } from 'react'
import { Button, Collapse, Modal, Typography, Breadcrumb, Space, message } from 'antd'
import type { CollapseProps } from 'antd'

import styles from './style.module.scss'
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import Lesson from './components/lesson'
import Image from 'next/image'
import TrashIcon from '../../../../../assets/icons/trash.png'
import EditIcon from '../../../../../assets/icons/edit.png'
import AddIcon from '../../../../../assets/icons/plus.png'
import { IQuestion } from '../../../../../types/types'
import AddLesson from './components/add-lesson'
import AddSection from './components/add-section'
import { LessonType } from '../../../../../types/lesson'
import UploadLesson from './components/add-lesson/components/upload-lesson'
import { ICourse } from '../../../course'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../utils/axios'
import { ISection } from '../../../../../types/section'

const { Text, Title } = Typography

const url = 'http://localhost:3000/course'

export interface ILesson {
  lesson_title: string
  lesson_url: string
}

type IProps = {
  course: ICourse
}

const CourseContent: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [content, setContent] = useState<ISection[]>()

  const [isAddSection, setIsAddSection] = useState(false)
  const [isEditSection, setIsEditSection] = useState(false)
  const [currentSection, setCurrentSection] = useState<ISection>()

  const [isLessonOpen, setIsLessonOpen] = useState(false)
  const [isAddLesson, setIsAddLesson] = useState(false)
  const [isEditLesson, setIsEditLesson] = useState(false)
  const [isRemove, setIsRemove] = useState(false)

  const [lessonType, setLessonType] = useState<LessonType>()
  const [isOpenLessonType, setIsOpenLessonType] = useState<boolean>(false)
  const [isOpenUploadLesson, setIsOpenUploadLesson] = useState<boolean>(false)

  console.log('course_id', props.course._id)
  console.log('currentSection', currentSection)

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

  const showModal = () => {
    setIsAddSection(true)
  }

  const handleOk = () => {
    setIsAddSection(false)
    setIsEditSection(false)
    setIsLessonOpen(false)
    setLoading(true)
    setCurrentSection(undefined)
  }

  const handleCancel = () => {
    setIsAddSection(false)
    setIsEditSection(false)
    setCurrentSection(undefined)

    setIsOpenLessonType(false)
    setIsLessonOpen(false)
    setIsOpenUploadLesson(false)

    setLoading(true)
  }

  const handleClickLesson = () => {
    setIsLessonOpen(true)
  }

  const handleChoseLessonType = (type: LessonType) => {
    setIsOpenLessonType(false)
    setIsOpenUploadLesson(true)
    setLessonType(type)
  }

  const handleUploadLesson = () => {
    setIsOpenUploadLesson(false)
    setLessonType(undefined)
    setLoading(true)
  }

  const handleDeleteSection = async (section_id: string) => {
    try {
      const response = await axiosService.delete(`/course/section/${section_id}`)
      console.log(response)
      message.success(`Xóa chương thành công`)
      setLoading(true)
    } catch (error) {
      alert('Xóa chương thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  const handleEditSection = async (section: ISection) => {
    setCurrentSection(section)
    setIsEditSection(true)
    setIsAddSection(false)
  }

  const genExtra = (section: ISection) => (
    <span style={{ position: 'absolute', right: 15 }}>
      <Button
        type="link"
        onClick={() => {
          setCurrentSection(section)
          setIsOpenLessonType(true)
        }}
        icon={<Image src={AddIcon} alt="House1" style={{ height: 19, width: 17 }} />}
      />
      <Button
        type="link"
        onClick={() => section && section?._id && handleDeleteSection(section?._id)}
        icon={<Image src={TrashIcon} alt="House1" style={{ height: 19, width: 17 }} />}
      />
      <Button
        onClick={() => section && handleEditSection(section)}
        type="link"
        icon={<Image src={EditIcon} alt="House1" style={{ height: 18, width: 18 }} />}
      />
    </span>
  )

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
      extra: genExtra(section),
      children: (
        <div className={styles.section}>
          {lessons?.map((lesson, index) => (
            <div key={lesson._id} className={styles.lesson}>
              <div onClick={handleClickLesson}>
                {lesson.name}
                <br />
              </div>
              <span className={styles.icon}>
                <Button
                  type="link"
                  onClick={() => {
                    // setCurrentQuestion(record)
                    setIsRemove(true)
                  }}
                  icon={<Image src={TrashIcon} alt="House1" style={{ height: 19, width: 17 }} />}
                />
                <Button
                  onClick={() => {
                    // setCurrentQuestion(record)
                    setIsEditLesson(true)
                    // setIsAddEvent(false)
                  }}
                  type="link"
                  icon={<Image src={EditIcon} alt="House1" style={{ height: 18, width: 18 }} />}
                />
              </span>
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
          <span>Khóa học</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>
        Thông tin chi tiết khóa học
        <br />
      </Text>
      {!isLessonOpen ? (
        <>
          <Collapse items={items} defaultActiveKey={['0']} style={{ minWidth: 1150 }} />
          <Button className={styles.button} type="primary" onClick={showModal}>
            Thêm nội dung
          </Button>
          <AddSection
            section={currentSection}
            course={props.course}
            open={isAddSection || isEditSection}
            onOk={handleOk}
            onCancel={handleCancel}
          />
          <AddLesson open={isOpenLessonType} onOk={handleChoseLessonType} onCancel={handleCancel} />
          <UploadLesson
            course={props.course}
            section={currentSection}
            open={isOpenUploadLesson}
            onOk={handleUploadLesson}
            onCancel={handleCancel}
          />
        </>
      ) : (
        <Lesson />
      )}
    </div>
  )
}

export default CourseContent
