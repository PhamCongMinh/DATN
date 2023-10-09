import React, { useState } from 'react'
import produce from 'immer'
import { UploadOutlined } from '@ant-design/icons'
import { serialize } from 'object-to-formdata'
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  message,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps
} from 'antd'

import { AxiosService } from '../../../../../../../utils/axios'
import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { RentNewsType } from '../../../../../../../types'

const { TextArea } = Input
const { Text } = Typography

interface ICreateBlog {
  title: string
  content: string
}

const initialState: ICreateBlog = {
  title: '',
  content: ''
}

export default function BlogForm() {
  const [state, setState] = useState<ICreateBlog>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState((prev: ICreateBlog) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }

  const handleSubmit = async () => {
    try {
      console.log(state)
      const response = await axiosService.post('/blog', state)
      console.log(response)
    } catch (error) {
      alert('Tạo blog thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  return (
    <div>
      <Text className={styles.title2}>Thông tin mô tả</Text>
      <Text className={styles.title3}>
        <br />
        Tiêu đề
      </Text>
      <Input style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('title', e)} />
      <Text className={styles.title3}>Nội dung mô tả</Text>
      <TextArea rows={4} style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('content', e)} />
      <Button type="primary" style={{ width: 200, marginTop: 40 }} onClick={handleSubmit}>
        Tạo blog
      </Button>
    </div>
  )
}
