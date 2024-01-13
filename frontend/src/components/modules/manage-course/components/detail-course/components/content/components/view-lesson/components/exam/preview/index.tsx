import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Button, Input, message, Modal, Space, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import QuestionOneChoice from './components/one-choice'
import QuestionMultipleChoice from './components/multiple-choice'
import QuestionShortAnswer from './components/short-answer'
import QuestionEssay from './components/essay'
import { IDetailExam, IDetailQuestionPoint, IExamSubmit } from '../../../../../../../../../../../../types/exam-submit'
import AxiosService from '../../../../../../../../../../../../utils/axios'
import { EQuestionType } from '../../../../../../../../../../../../types/types'

const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  exam_id?: string
  onSubmit?: () => void
  onBack?: () => void
}

const initialState: IDetailExam = {}

const Exam: React.FC<IProps> = (props): JSX.Element => {
  const [exam, setExam] = useState<IDetailExam>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [currentExamSubmit, setCurrentExamSubmit] = useState<IExamSubmit>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get(`/exam/${props?.exam_id}`)
      const data = response.data
      setExam(data)
      setLoading(false)
    }

    fetchData()
  }, [props?.exam_id])

  return (
    <div>
      <div className={styles.space}>
        <Space>
          <Title className={styles.name}>{`Thời gian kết thúc bài thi: ${
            exam?.end_time?.toString().split('.')[0]
          }.Đếm ngược: ---`}</Title>
        </Space>
        {exam?.question_point?.map((question_point: IDetailQuestionPoint, index) => {
          switch (question_point?.question_id?.type) {
            case EQuestionType.ONE_CHOICE:
              return <QuestionOneChoice index={index + 1} key={question_point._id} question_point={question_point} />
            case EQuestionType.MULTIPLE_CHOICE:
              return (
                <QuestionMultipleChoice index={index + 1} key={question_point._id} question_point={question_point} />
              )
            case EQuestionType.SHORT_ANSWER:
              return <QuestionShortAnswer index={index + 1} key={question_point._id} question_point={question_point} />
            case EQuestionType.ESSAY:
              return <QuestionEssay index={index + 1} key={question_point._id} question_point={question_point} />
            default:
              return <QuestionOneChoice index={index + 1} key={question_point._id} question_point={question_point} />
          }
        })}
      </div>
    </div>
  )
}

export default Exam
