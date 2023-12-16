import React, { useState } from 'react'
import { Button, Input, message, Modal, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import AxiosService from '../../../../../../../../../utils/axios'
import PdfView from '../../../../../../../../elements/pdf-view'
import { IFile } from '../../../../../../../../../types/file'
import { LessonType } from '../../../../../../../../../types/lesson'
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'

const { Dragger } = Upload

const { TextArea } = Input
const { Text } = Typography

interface IProps {
  open: boolean
  onOk: () => void
  onCancel: () => void
  // setReload: () => void
  // openDetailCourse: (course: any) => void
}

interface ICreateRentalNews {}

const initialState: ICreateRentalNews = {}

const UploadLesson: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<ICreateRentalNews>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)

  const [isPreview, setIsPreview] = useState(false)
  const [file, setFile] = useState<IFile>()
  const [embedFile, setEmbedFile] = useState<string>()

  const handleClickPreview = () => {
    setIsPreview(!isPreview)
  }

  // const handleChange = (
  //   key: string,
  //   e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setState((prev: ICreateRentalNews) =>
  //     produce(prev, draft => {
  //       // @ts-ignore
  //       draft[key] = (key === 'pricePerMonth') | (key === 'area') ? Number(e.target.value) : e.target.value
  //     })
  //   )
  // }
  //
  // const handleChangeDate = (date: Dayjs | null, dateString: string, key: string) => {
  //   setState((prev: ICreateRentalNews) =>
  //     produce(prev, draft => {
  //       // @ts-ignore
  //       draft[key] = dateString
  //     })
  //   )
  // }
  //
  // const handleSelectRentNewsType = (value: string) => {
  //   setState((prev: ICreateRentalNews) =>
  //     produce(prev, draft => {
  //       // @ts-ignore
  //       draft['rentNewsType'] = value
  //     })
  //   )
  // }
  //

  //
  // const checkUpdatedInfo = async () => {
  //   const response = await axiosService.get('/auth/check-updated-information')
  //   console.log(response)
  //   return response.data.isUpdatedInfo
  // }
  //
  // const handleSubmit = async () => {
  //   const isUpdatedInfo = await checkUpdatedInfo()
  //   if (!isUpdatedInfo) {
  //     alert(
  //       'Bạn chưa cập nhật thêm thông tin cá nhân cần thiết, vui lòng truy cập mục Quản lý tài khoản -> Cập nhật thông tin cá nhân để cập nhật thêm thông tin'
  //     )
  //     return
  //   }
  //
  //   try {
  //     const formData = serialize(state)
  //     formData.append('image', image)
  //     console.log(formData)
  //     const response = await axiosService.post('/rent-out', formData)
  //     console.log(response)
  //     message.success(`Tạo tin thành công`)
  //   } catch (error) {
  //     alert('Tạo tin thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
  //     console.log(error)
  //   }
  // }

  const handleEmbedFile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmbedFile(e.target.value)
    setFile(undefined)
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
        setFile(response.data)
        setEmbedFile(undefined)
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

  const onOk = () => {
    props.onOk()
    setIsPreview(false)
    setFile(undefined)
  }

  const onCancel = () => {
    props.onCancel()
    setIsPreview(false)
    setFile(undefined)
  }

  return (
    <>
      <Modal title="Tạo bài học mới" open={props.open} onOk={onOk} onCancel={onCancel} centered width={1000}>
        {isPreview === false && (
          <>
            <Text className={styles.title3} style={{ marginTop: 20 }}>
              Tên bài học
              <br />
            </Text>
            <Input
            // onChange={e => handleChange('name', e)}
            />

            <Text className={styles.title3}>
              <br />
              Nhúng video vào bài giảng
            </Text>
            <Button style={{ marginLeft: 20 }} onClick={handleClickPreview}>
              Xem trước
            </Button>
            <TextArea
              rows={4}
              style={{ maxWidth: 1000, marginBottom: 30, marginTop: 10 }}
              value={embedFile}
              onChange={e => handleEmbedFile(e)}
            />

            <Text className={styles.title3}>Tài liệu khóa học</Text>
            <Button style={{ marginLeft: 20 }} onClick={handleClickPreview}>
              Xem trước
            </Button>
            <div />
            <Dragger {...uploadProps} style={{ marginTop: 10 }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned
                files.
              </p>
            </Dragger>
          </>
        )}
        {isPreview === true && (
          <div>
            <Button onClick={handleClickPreview}>Quay lại</Button>
            <div style={{ maxHeight: 800, display: 'flex', justifyContent: 'center', marginTop: 10, minHeight: 500 }}>
              {file && file.asset_url && file.file_type === LessonType.pdf && <PdfView pdfUrl={file.asset_url} />}
              {file && file.asset_url && (file.file_type === 'png' || file.file_type === 'jpg') && (
                <img alt="example" src={file.asset_url} height={500} />
              )}
              {file && file.asset_url && file.file_type === 'mp4' && (
                // <ReactPlayer controls height={500} src={file.asset_url} />
                <video controls src={file.asset_url} height={500} />
              )}
              {embedFile && <div dangerouslySetInnerHTML={{ __html: embedFile }} style={{ height: 500 }} />}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default UploadLesson
