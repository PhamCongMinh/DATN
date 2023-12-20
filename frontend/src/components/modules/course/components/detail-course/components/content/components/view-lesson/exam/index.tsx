import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Button, Input, message, Modal, Space, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import BackgroundImage3 from '../../../../../../../../../../assets/images/background-course3.png'
import DateIcon from '../../../../../../../../../../assets/icons/date.png'
import { IExam } from '../../../../../../../../../../types/exam'
import AxiosService from '../../../../../../../../../../utils/axios'
import { IExamSubmit } from '../../../../../../../../../../types/exam-submit'

const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  exam_submit?: IExamSubmit
  onSubmit: () => void
}

const initialState: IExam = {}

const Exam: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<IExam>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [currentExamSubmit, setCurrentExamSubmit] = useState<IExamSubmit>()

  console.log('currentExamSubmit', currentExamSubmit)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get(`/exam/${props?.exam_submit?.exam}`)
      const data = response.data
      setState(data)
      setLoading(false)
    }

    fetchData()
  }, [props?.exam_submit])

  useEffect(() => {
    setCurrentExamSubmit(props?.exam_submit)
  }, [props?.exam_submit])

  const handleSubmitExam = () => {
    props.onSubmit()
  }

  return (
    <div>
      <div className={styles.space}>
        <div className={styles.header}>
          <Title className={styles.name}>{state?.name}</Title>
        </div>
        <Button onClick={handleSubmitExam}>Kết thúc bài thi</Button>
      </div>
    </div>
  )
}

export default Exam
