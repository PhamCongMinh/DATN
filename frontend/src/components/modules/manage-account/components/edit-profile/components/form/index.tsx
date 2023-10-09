import { Button, DatePicker, Input, message, Row, Typography, Upload, UploadProps } from 'antd'
import AxiosService from '../../../../../../../utils/axios'
import { useSelector } from 'react-redux'
import produce from 'immer'
import React, { useState } from 'react'
import styles from './style.module.scss'
import dayjs, { Dayjs } from 'dayjs'
import { UploadOutlined } from '@ant-design/icons'
import { serialize } from 'object-to-formdata'
import moment from 'moment'

const { Text } = Typography

export interface IEditProfile {
  fullName?: string
  dateOfBirth?: string
  permanentAddress?: string
  temporaryAddress?: string
  numberPhone?: string
  citizenIdNumber?: string
  citizenIdImage?: any
  portraitImage?: any
  proofImage?: any
}

export default function EditProfileForm() {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)
  const [state, setState] = useState<IEditProfile>({})

  const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: IEditProfile) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }
  const handleChangeDate = (date: Dayjs | null, dateString: string, key: string) => {
    setState(prev =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = dateString
      })
    )
  }

  const handleAddCitizenIdImage = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
      setState((prev: IEditProfile) =>
        produce(prev, draft => {
          // @ts-ignore
          draft['citizenIdImage'] = info.file.originFileObj
        })
      )
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const handleAddPortraitImage = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
      setState((prev: IEditProfile) =>
        produce(prev, draft => {
          // @ts-ignore
          draft['portraitImage'] = info.file.originFileObj
        })
      )
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const handleAddProofImage = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
      setState((prev: IEditProfile) =>
        produce(prev, draft => {
          // @ts-ignore
          draft['proofImage'] = info.file.originFileObj
        })
      )
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const onSubmit = async () => {
    try {
      console.log('state', state)
      const formData = serialize(state)
      const response = await axiosService.post('/auth/update-profile', formData)
      message.success(`Thông tin đã cập nhật`)
      console.log(response)
    } catch (error) {
      alert('Thông tin không hợp lệ, vui lòng thử lại')
      console.log(error)
    }
  }

  return (
    <div>
      <Text className={styles.text}>
        Họ và tên: <br />
      </Text>
      <Input style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }} onChange={e => handleChange('fullName', e)} />
      <Text className={styles.text}>
        <br />
        Ngày sinh: <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        defaultValue={dayjs()}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'dateOfBirth')}
      />
      <Text className={styles.text}>
        <br />
        Địa chỉ thường trú: <br />
      </Text>
      <Input
        style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }}
        onChange={e => handleChange('permanentAddress', e)}
      />
      <Text className={styles.text}>
        <br />
        Địa chỉ tạm trú: <br />
      </Text>
      <Input
        style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }}
        onChange={e => handleChange('temporaryAddress', e)}
      />
      <Text className={styles.text}>
        <br />
        Số điện thoại liên lạc: <br />
      </Text>
      <Input
        style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }}
        onChange={e => handleChange('numberPhone', e)}
      />
      <Text className={styles.text}>
        <br />
        Số căn cước công dân: <br />
      </Text>
      <Input
        style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }}
        onChange={e => handleChange('citizenIdNumber', e)}
      />
      <Text className={styles.text}>
        <br />
        Ảnh căn cước công dân: <br />
      </Text>
      <Upload name="file" multiple={false} accept="image/png,image/gif,image/jpeg" onChange={handleAddCitizenIdImage}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Text className={styles.text}>
        <br />
        Ảnh chân dung: <br />
      </Text>
      <Upload name="file" multiple={false} accept="image/png,image/gif,image/jpeg" onChange={handleAddPortraitImage}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Text className={styles.text}>
        <br />
        Ảnh giấy tờ chứng minh bạn là chủ trọ: <br />
      </Text>
      <Text>
        (Nếu bạn là người đi thuê thì vui lòng bỏ qua mục này) <br />
      </Text>
      <Upload name="file" multiple={false} accept="image/png,image/gif,image/jpeg" onChange={handleAddProofImage}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <br />
      <Button type="primary" onClick={onSubmit}>
        Cập nhật
      </Button>
    </div>
  )
}
