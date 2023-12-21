import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal, Space, Tabs, Typography, Upload, UploadProps } from 'antd'

import { useSelector } from 'react-redux'
import { ILesson } from '../../../../../../../../../../../types/lesson'
import Exam from './preview'
import ViewLesson from '../../index'
import ExamResult from './result'

const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  exam_id?: string
  onSubmit?: () => void
  onBack?: () => void
}

const initialState: ILesson = {}

const MenuExam: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<ILesson>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const [isLoading, setLoading] = useState(true)

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <>
      <Tabs
        style={{ marginTop: 15 }}
        onChange={onChange}
        type="card"
        items={[
          {
            label: `Xem bài thi`,
            key: '1',
            children: <Exam exam_id={props?.exam_id} onBack={props.onBack} />
          },
          {
            label: `Kết quả thi`,
            key: '2',
            children: <ExamResult exam_id={props?.exam_id} onBack={props.onBack} />
          },
          {
            label: `Thống kê`,
            key: '3',
            children: `Content of Tab Pane 3`
          }
        ]}
      />
    </>
  )
}

export default MenuExam
