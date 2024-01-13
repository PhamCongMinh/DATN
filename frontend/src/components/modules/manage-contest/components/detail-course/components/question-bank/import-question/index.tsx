import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal, Select, Spin, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import produce from 'immer'
import { ILesson, LessonType } from '../../../../../../../../types/lesson'
import { ISection } from '../../../../../../../../types/section'
import { ICourse } from '../../../../../index'
import AxiosService from '../../../../../../../../utils/axios'
import { IExam } from '../../../../../../../../types/exam'
import PdfView from '../../../../../../../elements/pdf-view'
import { IImportFile, IQuestionDataFromAI } from '../../../../../../../../types/import'

const { Dragger } = Upload

const { TextArea } = Input
const { Text } = Typography

interface IProps {
  course: ICourse
  open: boolean
  onOk: (data: IQuestionDataFromAI[]) => void
  onCancel: () => void
  // setReload: () => void
  // openDetailCourse: (course: any) => void
}

const initialState: IImportFile = {}

const ImportQuestionFile: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<IImportFile>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)

  const [isPreview, setIsPreview] = useState(false)
  const [isLoadingImport, setLoadingImport] = useState(false)

  const [reload, setReload] = useState<boolean>(true)

  useEffect(() => {
    setState({
      course_id: props.course._id
    })
  }, [props?.course])

  const handleClickPreview = () => {
    setIsPreview(!isPreview)
  }

  const handleSubmit = async () => {
    try {
      const axiosService2 = new AxiosService('application/json', jwt)
      setLoadingImport(true)
      const response = await axiosService2.post('/ai/import-question', {
        asset_url: state?.documents?.asset_url
      })
      setLoadingImport(false)
      console.log(response)
      message.success(`Nhập liệu danh sách câu hỏi thành công`)
      props.onOk(response.data)
      setState(initialState)
    } catch (error) {
      alert('Nhập liệu danh sách câu hỏi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
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
      <Modal
        title="Nhập liệu danh sách câu hỏi với AI"
        open={props.open}
        onOk={handleSubmit}
        onCancel={onCancel}
        centered
        width={1000}
      >
        {isPreview === false && (
          <>
            <Text className={styles.title3}>Ảnh hoặc file pdf chứa danh sách câu hỏi</Text>
            <Button style={{ marginLeft: 20 }} onClick={handleClickPreview}>
              Xem trước
            </Button>
            {isLoadingImport && <Spin />}
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
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ImportQuestionFile
