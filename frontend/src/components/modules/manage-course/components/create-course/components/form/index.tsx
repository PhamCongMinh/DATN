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

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    customRequest: async options => {
      try {
        const formData = new FormData()
        formData.append('file', options.file)

        const response = await axiosService.post('/asset-upload', formData)
        console.log(response)
        setState((prev: ICourse) =>
          produce(prev, draft => {
            draft['course_image'] = response.data
          })
        )
        message.success(`Tải file thành công`)

        // @ts-ignore
        options.onSuccess('oke')
      } catch (error) {
        message.error(` file upload failed.`)
        // @ts-ignore
        options.onError(new Error('Tải file thất bại, vui lòng kiểm tra lại file trước khi thử lại'))
      }
    }
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
      const response = await axiosService.post('/course', state)
      console.log(response)
      message.success(`Khởi tạo khóa học thành công`)
    } catch (error) {
      alert('Khởi tạo khóa học thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  return (
    <div>
      <Text className={styles.title2}>
        Tổng quan khóa học
        <br />
      </Text>
      <Text className={styles.title3} style={{ marginTop: 20 }}>
        Tên khóa học
      </Text>
      <Input style={{ maxWidth: 800 }} onChange={e => handleChange('name', e)} />

      <Text className={styles.title3}>
        <br />
        Danh mục khóa học
      </Text>
      <Input style={{ maxWidth: 800, marginBottom: 0 }} onChange={e => handleChange('tags', e)} />

      <Text className={styles.title3}>
        <br />
        Tóm tắt khóa học
      </Text>
      <TextArea rows={4} style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('summary', e)} />

      <Text className={styles.title3}>
        <br />
        Giới thiệu khóa học
      </Text>
      <TextArea rows={4} style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('introduction', e)} />

      <Text className={styles.title3}>
        <br />
        Giới thiệu nội dung khóa học
      </Text>
      <TextArea
        rows={4}
        style={{ maxWidth: 1000, marginBottom: 30 }}
        onChange={e => handleChange('content_introduction', e)}
      />

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
        Thời gian khóa học
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

      <Text className={styles.title3}>
        <br />
        Ngày bắt đầu khóa học
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'start_time')}
      />

      <Text className={styles.title3}>
        <br />
        Ngày kết thúc khóa học
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'end_time')}
      />

      <Text className={styles.title3}>
        <br />
        Ảnh đại diện khóa học
      </Text>

      <Dragger {...uploadProps} style={{ marginTop: 10 }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>

      <Button type="primary" style={{ width: 200, marginTop: 40 }} onClick={handleSubmit}>
        Tạo khóa học
      </Button>
    </div>
  )
}
