import React, { useState } from 'react'
import produce from 'immer'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { serialize } from 'object-to-formdata'
import { Button, Col, DatePicker, DatePickerProps, Input, message, Row, Select, Typography, Upload } from 'antd'
import type { UploadProps } from 'antd'

import { AxiosService } from '../../../../../../../utils/axios'
import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { RentNewsType } from '../../../../../../../types'
import CustomDrag from '../../../../../../elements/Drag'
import { toast } from 'react-toastify'
import Dragger from 'antd/es/upload/Dragger'

const { TextArea } = Input
const { Text } = Typography

interface ICreateCourse {
  name: string
  tags: string
  description: string
  status: string
  start_time?: Date
  end_time?: Date
}

const initialState: ICreateCourse = {
  name: '',
  tags: '',
  description: '',
  status: ''
}

export default function CreateCourseForm() {
  const [state, setState] = useState<ICreateCourse>(initialState)
  const [image, setImage] = useState<any>()
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatarFileUpload, setAvatarFileUpload] = useState<FormData>()
  const [isDisable, setIsDisable] = useState(true)

  console.log('uploaded image', image ? image : 'no image')

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState((prev: ICreateCourse) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }

  const handleChangeDate = (date: Dayjs | null, dateString: string, key: string) => {
    setState((prev: ICreateCourse) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = dateString
      })
    )
  }

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    accept: 'image/png,image/gif,image/jpeg',
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        setImage(info.file.originFileObj)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  const checkUpdatedInfo = async () => {
    const response = await axiosService.get('/auth/check-updated-information')
    console.log(response)
    return response.data.isUpdatedInfo
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
      // const formData = serialize(state)
      // formData.append('image', image)
      // console.log(formData)
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
      <Input style={{ maxWidth: 800, marginBottom: 30 }} onChange={e => handleChange('tags', e)} />

      <Text className={styles.title3}>
        Ngày bắt đầu
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        defaultValue={dayjs()}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'start_time')}
      />

      <Text className={styles.title3}>
        <br />
        Ngày kết thúc
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        defaultValue={dayjs()}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'end_time')}
      />

      <Text className={styles.title2}>
        <br />
        Mô tả khóa học
        <br />
      </Text>

      <Text className={styles.title3}>
        <br />
        Tóm tắt khóa học
      </Text>
      <TextArea rows={4} style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('description', e)} />

      <Text className={styles.title3}>Ảnh đại diện khóa học</Text>
      <div />

      <Dragger {...props}>
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
