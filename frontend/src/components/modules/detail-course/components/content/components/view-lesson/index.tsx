import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal, Space, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import { InboxOutlined } from '@ant-design/icons'
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'
import produce from 'immer'
import { ILesson, LessonType } from '../../../../../../../types/lesson'
import { ISection } from '../../../../../../../types/section'
import { ICourse } from '../../../../../course'
import AxiosService from '../../../../../../../utils/axios'
import PdfView from '../../../../../../elements/pdf-view'
import UploadLesson from '../add-lesson/components/upload-lesson'
import EditIcon from '../../../../../../../assets/icons/edit.png'

const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  lesson?: ILesson
  onBack: () => void
}

const initialState: ILesson = {}

const ViewLesson: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<ILesson>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (props?.lesson) setState(props?.lesson)
    setLoading(false)
  }, [props.lesson])

  return (
    <>
      <Title className={styles.title3} style={{ marginTop: 10 }}>
        {state?.name}
        <br />
      </Title>

      <Text className={styles.title3}>
        {state?.description}
        <br />
      </Text>

      {state && state?.embed_file && (
        <div dangerouslySetInnerHTML={{ __html: state?.embed_file }} style={{ height: 500 }} />
      )}
      {state && state?.documents && state?.documents?.asset_url && state?.documents?.file_type === LessonType.pdf && (
        <PdfView pdfUrl={state?.documents?.asset_url} height={800} />
      )}
      {state &&
        state?.documents &&
        state?.documents?.asset_url &&
        (state?.documents?.file_type === 'png' || state?.documents?.file_type === 'jpg') && (
          <img alt="example" src={state?.documents?.asset_url} />
        )}
      {state && state?.documents && state?.documents?.asset_url && state?.documents?.file_type === 'mp4' && (
        // <ReactPlayer controls height={500} src={file.asset_url} />
        <video controls src={state?.documents?.asset_url} width={1000} />
      )}
      {!state?.documents && !state?.embed_file && !state?.description && (
        <Text className={styles.title3}>
          Không có dữ liệu bài giảng
          <br />
        </Text>
      )}
    </>
  )
}

export default ViewLesson
