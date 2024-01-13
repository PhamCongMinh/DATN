import React, { useState } from 'react'
import produce from 'immer'
import { UploadOutlined } from '@ant-design/icons'
import { serialize } from 'object-to-formdata'
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps
} from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { IDiscuss } from '../../index'
import { ICourse } from '../../../../../../index'
import AxiosService from '../../../../../../../../../utils/axios'

const { Dragger } = Upload

const { TextArea } = Input
const { Text } = Typography

interface IProps {
  open: boolean
  onOk: () => void
  onCancel: () => void
  course: ICourse
}

const initialState: IDiscuss = {}

const AddDiscussModal: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<IDiscuss>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const handleChange = (name: string, value: string) => {
    setState((prev: IDiscuss) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[`${name}`] = value
      })
    )
  }

  const handleSubmit = async () => {
    try {
      const response = await axiosService.post('/discuss', {
        title: state?.title,
        content: state?.content,
        course_id: props.course._id
      })
      console.log(response)
      props.onOk()
      message.success(`Đăng bài thành công`)
    } catch (error) {
      alert('Đăng bài thảo luận thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        title="Tạo cuộc thảo luân / chủ đề mới"
        open={props.open}
        onOk={handleSubmit}
        onCancel={props.onCancel}
        centered
        width={500}
      >
        <Text>Tiêu đề câu hỏi:</Text>
        <Input value={state?.title} onChange={e => handleChange('title', e.target.value)} />
        <Text>Nội dung câu hỏi:</Text>
        <TextArea value={state?.content} onChange={e => handleChange('content', e.target.value)} />
      </Modal>
    </>
  )
}

export default AddDiscussModal
