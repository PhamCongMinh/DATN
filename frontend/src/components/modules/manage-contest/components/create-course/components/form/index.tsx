import React, { useState } from 'react'
import produce from 'immer'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Input, message, Row, Select, Typography, Upload } from 'antd'
import type { UploadProps } from 'antd'

import { AxiosService } from '../../../../../../../utils/axios'
import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import Dragger from 'antd/es/upload/Dragger'
import { ICourse } from '../../../../../../../types/course'

const { TextArea } = Input
const { Text } = Typography

const initialState: ICourse = {}

export default function CreateCourseForm() {
  const [state, setState] = useState<ICourse>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState((prev: ICourse) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }

  const handleChangeDate = (date: Dayjs | null, dateString: string, key: string) => {
    setState((prev: ICourse) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = dateString
      })
    )
  }

  const handleSubmit = async () => {
    // const isUpdatedInfo = await checkUpdatedInfo()
    // if (!isUpdatedInfo) {
    //   alert(
    //     'Bạn chưa cập nhật thêm thông tin cá nhân cần thiết, vui lòng truy cập mục Quản lý tài khoản -> Cập nhật thông tin cá nhân để cập nhật thêm thông tin'
    //   )
    //   return
    // }

    try {
      console.log(state)
      const response = await axiosService.post('/course', {
        ...state,
        is_contest: true
      })
      console.log(response)
      message.success(`Khởi tạo cuộc thi thành công`)
    } catch (error) {
      alert('Khởi tạo cuộc thi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  return (
    <div>
      <Text className={styles.title2}>
        Tổng quan cuộc thi
        <br />
      </Text>
      <Text className={styles.title3} style={{ marginTop: 20 }}>
        Tên cuộc thi
      </Text>
      <Input style={{ maxWidth: 800 }} onChange={e => handleChange('name', e)} />

      <Text className={styles.title3}>
        <br />
        Danh mục cuộc thi
      </Text>
      <Input style={{ maxWidth: 800, marginBottom: 0 }} onChange={e => handleChange('tags', e)} />

      <Text className={styles.title3}>
        <br />
        Tóm tắt cuộc thi
      </Text>
      <TextArea rows={4} style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('summary', e)} />

      <Text className={styles.title3}>
        <br />
        Giới thiệu giáo viên
      </Text>
      <TextArea
        rows={4}
        style={{ maxWidth: 1000, marginBottom: 0 }}
        onChange={e => handleChange('teacher_introduction', e)}
      />

      <Text className={styles.title2}>
        <br />
        Thời gian cuộc thi
        <br />
      </Text>

      <Text className={styles.title3}>
        Ngày bắt đầu đăng kí
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'start_registration')}
      />

      <Text className={styles.title3}>
        <br />
        Ngày kết thúc đăng kí
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'end_registration')}
      />
      <br />

      <Button type="primary" style={{ width: 200, marginTop: 40 }} onClick={handleSubmit}>
        Tạo khóa học
      </Button>
    </div>
  )
}
