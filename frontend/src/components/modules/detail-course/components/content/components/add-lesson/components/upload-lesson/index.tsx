import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import AxiosService from '../../../../../../../../../utils/axios'
import PdfView from '../../../../../../../../elements/pdf-view'
import { IFile } from '../../../../../../../../../types/file'
import { ILesson, LessonType } from '../../../../../../../../../types/lesson'
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'
import { ISection } from '../../../../../../../../../types/section'
import { ICourse } from '../../../../../../../course'
import produce from 'immer'

const { Dragger } = Upload

const { TextArea } = Input
const { Text } = Typography

interface IProps {
  section?: ISection
  course: ICourse
  open: boolean
  onOk: () => void
  onCancel: () => void
  // setReload: () => void
  // openDetailCourse: (course: any) => void
}

const initialState: ILesson = {}

const UploadLesson: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<ILesson>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)

  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    setState({
      course_id: props.course._id,
      section_id: props.section?._id
    })
  }, [props?.section])

  const handleClickPreview = () => {
    setIsPreview(!isPreview)
  }

  const handleChange = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (key === 'embed_file')
      setState((prev: ILesson) =>
        produce(prev, draft => {
          // @ts-ignore
          draft['documents'] = undefined
        })
      )

    setState((prev: ILesson) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }

  const handleSubmit = async () => {
    try {
      const axiosService2 = new AxiosService('application/json', jwt)
      const response = await axiosService2.post('/course/lesson', state)
      console.log(response)
      message.success(`Thêm bài học thành công`)
      props.onOk()
      setState(initialState)
    } catch (error) {
      alert('Thêm  bài học thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
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
        setState((prev: ILesson) =>
          produce(prev, draft => {
            // @ts-ignore
            draft['embed_file'] = undefined
            draft['documents'] = response.data
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

  const onOk = () => {
    props.onOk()
    setIsPreview(false)
    setState((prev: ILesson) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['documents'] = undefined
      })
    )
  }

  const onCancel = () => {
    props.onCancel()
    setIsPreview(false)
    setState((prev: ILesson) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['documents'] = undefined
      })
    )
  }

  return (
    <>
      <Modal title="Tạo bài học mới" open={props.open} onOk={handleSubmit} onCancel={onCancel} centered width={1000}>
        {isPreview === false && (
          <>
            <Text className={styles.title3} style={{ marginTop: 20 }}>
              Tên bài học
              <br />
            </Text>
            <Input value={state?.name} onChange={e => handleChange('name', e)} />

            <Text className={styles.title3}>
              Nội dung
              <br />
            </Text>
            <TextArea
              rows={4}
              style={{ maxWidth: 1000, marginTop: 10, height: 50 }}
              value={state?.description}
              onChange={e => handleChange('description', e)}
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
              value={state?.embed_file}
              onChange={e => handleChange('embed_file', e)}
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
              {state &&
                state?.documents &&
                state?.documents?.asset_url &&
                state?.documents?.file_type === LessonType.pdf && (
                  <PdfView pdfUrl={state?.documents?.asset_url} height={500} />
                )}
              {state &&
                state?.documents &&
                state?.documents?.asset_url &&
                (state?.documents?.file_type === 'png' || state?.documents?.file_type === 'jpg') && (
                  <img alt="example" src={state?.documents?.asset_url} height={500} />
                )}
              {state && state?.documents && state?.documents?.asset_url && state?.documents?.file_type === 'mp4' && (
                // <ReactPlayer controls height={500} src={file.asset_url} />
                <video controls src={state?.documents?.asset_url} height={500} />
              )}
              {state && state?.embed_file && (
                <div dangerouslySetInnerHTML={{ __html: state?.embed_file }} style={{ height: 500 }} />
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default UploadLesson
