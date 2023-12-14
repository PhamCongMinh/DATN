import React, { useState } from 'react'
import { Button, Collapse, Modal, Typography, Breadcrumb } from 'antd'
import type { CollapseProps } from 'antd'

import styles from './style.module.scss'
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import AddResource from './components/modal'
import Lesson from './components/lesson'

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

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleClickLesson = () => {
    setIsLessonOpen(true)
  }

  const genExtra = () => (
    <SettingOutlined
      onClick={event => {
        console.log('event', event)
      }}
    />
  )

  const items = dataExample.map((section, index) => {
    const { section_title, lessons } = section
    return {
      key: index.toString(),
      label: section_title,
      style: { fontSize: 18, lineHeight: 1.4, color: '#171717', fontWeight: 500 },
      extra: genExtra(),
      children: (
        <div className={styles.section}>
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className={styles.lesson}>
              <div onClick={handleClickLesson}>
                {lesson.title}
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
          <AddResource open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
        </>
      ) : (
        <Lesson />
      )}
    </div>
  )
}
