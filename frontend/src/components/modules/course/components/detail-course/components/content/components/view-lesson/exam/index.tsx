import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Button, Input, message, Modal, Space, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import BackgroundImage3 from '../../../../../../../../../../assets/images/background-course3.png'
import DateIcon from '../../../../../../../../../../assets/icons/date.png'
import { IExam } from '../../../../../../../../../../types/exam'
import AxiosService from '../../../../../../../../../../utils/axios'
import { IDetailExam, IDetailQuestionPoint, IExamSubmit } from '../../../../../../../../../../types/exam-submit'
import QuestionOneChoice from './components/one-choice'
import QuestionMultipleChoice from './components/multiple-choice'
import QuestionShortAnswer from './components/short-answer'
import QuestionEssay from './components/essay'
import { EQuestionType } from '../../../../../../../../../../types/types'
import CountdownTimer from './components/cowndown'
import moment from 'moment/moment'

const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  exam_submit?: IExamSubmit
  onSubmit: () => void
}

const initialState: IDetailExam = {}

const Exam: React.FC<IProps> = (props): JSX.Element => {
  const [exam, setExam] = useState<IDetailExam>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [currentExamSubmit, setCurrentExamSubmit] = useState<IExamSubmit>()

  console.log('currentExamSubmit', currentExamSubmit)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get(`/exam/${props?.exam_submit?.exam}`)
      const data = response.data
      setExam(data)
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

  const handleEndExamTime = () => {
    message.error('Thời gian làm bài đã hết!')
    handleSubmitExam()
  }

  return (
    <div>
      <div className={styles.space}>
        <Space>
          <Title className={styles.name}>{`Thời gian kết thúc bài thi: ${
            exam?.end_time?.toString().split('.')[0]
          }.Đếm ngược: `}</Title>
          <CountdownTimer deadline={Date.now() + 1000 * 60 * Number(exam?.exam_time)} onFinish={handleEndExamTime} />
        </Space>
        {exam?.question_point?.map((question_point: IDetailQuestionPoint, index) => {
          switch (question_point?.question_id?.type) {
            case EQuestionType.ONE_CHOICE:
              return (
                <QuestionOneChoice
                  index={index + 1}
                  key={question_point._id}
                  exam_submit={props?.exam_submit}
                  question_point={question_point}
                />
              )
            case EQuestionType.MULTIPLE_CHOICE:
              return (
                <QuestionMultipleChoice
                  index={index + 1}
                  key={question_point._id}
                  exam_submit={props?.exam_submit}
                  question_point={question_point}
                />
              )
            case EQuestionType.SHORT_ANSWER:
              return (
                <QuestionShortAnswer
                  index={index + 1}
                  key={question_point._id}
                  exam_submit={props?.exam_submit}
                  question_point={question_point}
                />
              )
            case EQuestionType.ESSAY:
              return (
                <QuestionEssay
                  index={index + 1}
                  key={question_point._id}
                  exam_submit={props?.exam_submit}
                  question_point={question_point}
                />
              )
            default:
              return (
                <QuestionOneChoice
                  index={index + 1}
                  key={question_point._id}
                  exam_submit={props?.exam_submit}
                  question_point={question_point}
                />
              )
          }
        })}
        <Button onClick={handleSubmitExam}>Kết thúc bài thi</Button>
      </div>
    </div>
  )
}

export default Exam
