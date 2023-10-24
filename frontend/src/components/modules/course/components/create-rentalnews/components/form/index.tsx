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

interface ICreateRentalNews {
  pricePerMonth: number
  area: number
  city: string
  district: string
  commune: string
  street: string
  specificAddress?: string
  title: string
  description: string
  startDate?: Date
  endDate?: Date
  rentNewsType: RentNewsType
}

const initialState: ICreateRentalNews = {
  pricePerMonth: 0,
  area: 0,
  city: '',
  district: '',
  commune: '',
  street: '',
  specificAddress: '',
  title: '',
  description: '',
  rentNewsType: RentNewsType.TYPE1
}

export default function RentOutForm() {
  const [state, setState] = useState<ICreateRentalNews>(initialState)
  const [image, setImage] = useState<any>()
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState((prev: ICreateRentalNews) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = (key === 'pricePerMonth') | (key === 'area') ? Number(e.target.value) : e.target.value
      })
    )
  }

  const handleChangeDate = (date: Dayjs | null, dateString: string, key: string) => {
    setState((prev: ICreateRentalNews) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = dateString
      })
    )
  }

  const handleSelectRentNewsType = (value: string) => {
    setState((prev: ICreateRentalNews) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['rentNewsType'] = value
      })
    )
  }

  const props: UploadProps = {
    name: 'file',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // headers: {
    //   authorization: 'authorization-text'
    // },
    multiple: false,
    // showUploadList: false,
    accept: 'image/png,image/gif,image/jpeg',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        setImage(info.file.originFileObj)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  const checkUpdatedInfo = async () => {
    const response = await axiosService.get('/auth/check-updated-information')
    console.log(response)
    return response.data.isUpdatedInfo
  }

  const handleSubmit = async () => {
    const isUpdatedInfo = await checkUpdatedInfo()
    if (!isUpdatedInfo) {
      alert(
        'Bạn chưa cập nhật thêm thông tin cá nhân cần thiết, vui lòng truy cập mục Quản lý tài khoản -> Cập nhật thông tin cá nhân để cập nhật thêm thông tin'
      )
      return
    }

    try {
      const formData = serialize(state)
      formData.append('image', image)
      console.log(formData)
      const response = await axiosService.post('/rent-out', formData)
      console.log(response)
      message.success(`Tạo tin thành công`)
    } catch (error) {
      alert('Tạo tin thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  return (
    <div>
      <Text className={styles.title2}>Địa chỉ cho thuê</Text>
      <Row style={{ marginTop: 20, justifyContent: 'left', marginBottom: 30 }}>
        <Col span={4} style={{ marginRight: 40 }}>
          <div>
            <Text className={styles.title3}>Tỉnh/Thành phố</Text>
            <Input onChange={e => handleChange('city', e)} />
          </div>
        </Col>
        <Col span={4} style={{ marginRight: 40 }}>
          <div>
            <Text className={styles.title3}>Quận/Huyện</Text>
            <Input onChange={e => handleChange('district', e)} />
          </div>
        </Col>
        <Col span={4} style={{ marginRight: 40 }}>
          <div>
            <Text className={styles.title3}>Phường/Xã</Text>
            <Input onChange={e => handleChange('commune', e)} />
          </div>
        </Col>
        <Col span={4} style={{ marginRight: 40 }}>
          <div>
            <Text className={styles.title3}>Đường</Text>
            <Input onChange={e => handleChange('street', e)} />
          </div>
        </Col>
      </Row>
      <Text className={styles.title3}>Địa chỉ chính xác</Text>
      <Input style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('specificAddress', e)} />
      <Text className={styles.title2}>Thông tin mô tả</Text>
      <Text className={styles.title3}>
        <br />
        Loại chuyên mục <br />
      </Text>
      <Select
        defaultValue="Phòng trọ"
        style={{ width: 400, marginBottom: 20 }}
        onChange={handleSelectRentNewsType}
        options={[
          { value: RentNewsType.TYPE1, label: 'Phòng trọ' },
          { value: RentNewsType.TYPE2, label: 'Nhà thuê nguyên căn' },
          { value: RentNewsType.TYPE3, label: 'Căn hộ mini' },
          { value: RentNewsType.TYPE4, label: 'Homestay' }
        ]}
      />

      <Text className={styles.title3}>
        <br />
        Tiêu đề
      </Text>
      <Input style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('title', e)} />
      <Text className={styles.title3}>Nội dung mô tả</Text>
      <TextArea rows={4} style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('description', e)} />
      <Text className={styles.title3}>Giá cho thuê</Text>
      <Input style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('pricePerMonth', e)} />
      <Text className={styles.title3}>Diện tích</Text>
      <Input style={{ maxWidth: 1000, marginBottom: 30 }} onChange={e => handleChange('area', e)} />

      <Text className={styles.title3}>
        Ngày bắt đầu
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        defaultValue={dayjs()}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'startDay')}
      />

      <Text className={styles.title3}>
        <br />
        Ngày hết hạn
        <br />
      </Text>
      <DatePicker
        style={{ marginBottom: 30 }}
        defaultValue={dayjs()}
        onChange={(date, dateString) => handleChangeDate(date, dateString, 'endDay')}
      />
      <Text className={styles.title2}>
        <br />
        Hình ảnh
      </Text>
      <div />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button type="primary" style={{ width: 200, marginTop: 40 }} onClick={handleSubmit}>
        Tạo tin
      </Button>
    </div>
  )
}
