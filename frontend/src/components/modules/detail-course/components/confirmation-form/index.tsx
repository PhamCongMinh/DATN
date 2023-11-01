import React, { useState } from 'react'
import { NextPage } from 'next'
import { Button, DatePicker, Input, message, Modal, Typography, Upload } from 'antd'

import styles from './style.module.scss'
import dayjs, { Dayjs } from 'dayjs'
import { UploadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../utils/axios'
import produce from 'immer'
import { serialize } from 'object-to-formdata'

const { Text } = Typography

interface IProps {
  setReload: () => void
}
export interface IConfirmationForm {
  rentalNewsId?: string
  rentalStartDate?: string
  rentedTime?: string
  proofImage?: any
}

const ConfirmationForm: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)
  const [state, setState] = useState<IConfirmationForm>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: IConfirmationForm) =>
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

  const handleAddImage = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
      setState((prev: IConfirmationForm) =>
        produce(prev, draft => {
          // @ts-ignore
          draft['proofImage'] = info.file.originFileObj
        })
      )
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  const checkUpdatedInfo = async () => {
    try {
      const response = await axiosService.get('/auth/check-updated-information')
      console.log(response)
      return response.data.isUpdatedInfo
    } catch (error) {
      alert('Bạn cần đăng nhập mới có thể sử dụng')
      return
    }
  }

  const onSubmit = async () => {
    const isUpdatedInfo = await checkUpdatedInfo()
    if (!isUpdatedInfo) {
      alert(
        'Bạn chưa cập nhật thêm thông tin cá nhân cần thiết, vui lòng truy cập mục Quản lý tài khoản -> Cập nhật thông tin cá nhân để cập nhật thêm thông tin'
      )
      return
    }

    try {
      console.log('state', state)
      const formData = serialize(state)
      const response = await axiosService.post('/rent/proof-rented', formData)
      message.success(`Thông tin đã được nhận`)
      console.log(response)
      setIsModalOpen(false)
      props.setReload()
    } catch (error) {
      alert('Thông tin không hợp lệ, vui lòng thử lại')
      console.log(error)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={showModal} className={styles.button}>
        Đã thuê được trọ
      </Button>
      <Modal
        title="Xác nhận đã liên hệ và thuê nhà trọ nào đó"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={handleCancel}
      >
        <div>
          <Text className={styles.text}>
            Mã tin đăng thuê trọ: <br />
          </Text>
          <Input
            style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }}
            onChange={e => handleChange('rentalNewsId', e)}
          />
          <Text className={styles.text}>
            <br />
            Ngày thuê: <br />
          </Text>
          <DatePicker
            style={{ marginBottom: 30 }}
            defaultValue={dayjs()}
            onChange={(date, dateString) => handleChangeDate(date, dateString, 'rentalStartDate')}
          />
          <Text className={styles.text}>
            <br />
            Thời gian thuê: <br />
          </Text>
          <Input
            style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }}
            onChange={e => handleChange('rentedTime', e)}
          />
          <Text className={styles.text}>
            <br />
            Ảnh chứng minh bạn đã thuê trọ đó: <br />
          </Text>
          <Upload name="file" multiple={false} accept="image/png,image/gif,image/jpeg" onChange={handleAddImage}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(ConfirmationForm)
