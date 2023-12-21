import { Button, Divider, Input, message, Radio, RadioChangeEvent, Space, Typography } from 'antd'

import styles from './style.module.scss'
import { IDetailQuestionPoint, IExamSubmit } from '../../../../../../../../../../../../types/exam-submit'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../../../../../../../../utils/axios'

const { Text, Title } = Typography

interface IProps {
  index: number
  exam_submit?: IExamSubmit
  question_point?: IDetailQuestionPoint
  // onSubmit: () => void
}

const QuestionShortAnswer: React.FC<IProps> = (props): JSX.Element => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [answer, setAnswer] = useState<string>()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value)
  }

  const handleSubmitAnswer = async () => {
    try {
      const res = await axiosService.post(`exam-submit/answer`, {
        exam_submit: props.exam_submit?._id,
        question_point: props.question_point?._id,
        answer: answer
      })
      // props.onSubmit()
      message.success('Đã gửi đáp án')
    } catch (e) {
      message.error('Gửi đáp án thất bại, vui lòng thử lại sau')
    }
  }

  return (
    <div className={styles.container}>
      <Divider />
      <Text>
        {`Câu hỏi ${props.index}: ${props.question_point?.question_id?.description}`}
        <br />
      </Text>

      <Input value={answer} onChange={onChange} className={styles.input} />

      <br />
      <Button className={styles.button} onClick={handleSubmitAnswer}>
        Gửi đáp án
      </Button>
    </div>
  )
}

export default QuestionShortAnswer
