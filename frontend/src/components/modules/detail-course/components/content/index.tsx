import React, { useState } from 'react'
import { Button, Collapse, Modal, Typography, Breadcrumb, Space } from 'antd'
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

const { Text, Title } = Typography

const url = 'http://localhost:3000/course'

const dataExample = [
  {
    section_title: 'Giới thiệu',
    lessons: [
      { id: 1, title: 'Bài học số 1' },
      { id: 2, title: 'Bài học số 2' },
      { id: 3, title: 'Bài học số 3' }
    ]
  },
  {
    section_title: 'Nội dung số 1',
    lessons: [
      { id: 4, title: 'Bài học số 1' },
      { id: 5, title: 'Bài học số 2' },
      { id: 6, title: 'Bài học số 3' }
    ]
  },
  {
    section_title: 'Nội dung số 2',
    lessons: [
      { id: 7, title: 'Bài học số 4' },
      { id: 8, title: 'Bài học số 5' },
      { id: 9, title: 'Bài học số 6' }
    ]
  }
]
export interface ILesson {
  lesson_title: string
  lesson_url: string
}
export interface ISection {
  section_title: string
  lessons: ILesson[]
}

export default function CourseContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLessonOpen, setIsLessonOpen] = useState(false)
  const [isAddSection, setIsAddSection] = useState(false)
  const [isAddLesson, setIsAddLesson] = useState(false)
  const [isEditSection, setIsEditSection] = useState(false)
  const [isEditLesson, setIsEditLesson] = useState(false)
  const [isRemove, setIsRemove] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setIsAddSection(false)
  }

  const handleClickLesson = () => {
    setIsLessonOpen(true)
  }

  const genExtra = () => (
    <span style={{ position: 'absolute', right: 15 }}>
      <Button
        type="link"
        onClick={() => {
          setIsAddSection(true)
          // setCurrentQuestion(record)
          // setIsRemove(true)
        }}
        icon={<Image src={AddIcon} alt="House1" style={{ height: 19, width: 17 }} />}
      />
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
          setIsEditSection(true)
          setIsAddSection(false)
        }}
        type="link"
        icon={<Image src={EditIcon} alt="House1" style={{ height: 18, width: 18 }} />}
      />
    </span>
  )

  const items = dataExample.map((section, index) => {
    const { section_title, lessons } = section
    return {
      key: index.toString(),
      label: section_title,
      style: {
        fontSize: 18,
        lineHeight: 1.4,
        color: '#171717',
        fontWeight: 500,
        position: 'relative',
        alignItems: 'center'
      },
      extra: genExtra(),
      children: (
        <div className={styles.section}>
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className={styles.lesson}>
              <div onClick={handleClickLesson}>
                {lesson.title}
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
          <AddSection open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
          <AddLesson open={isAddSection} onOk={handleOk} onCancel={handleCancel} />
        </>
      ) : (
        <Lesson />
      )}
    </div>
  )
}
