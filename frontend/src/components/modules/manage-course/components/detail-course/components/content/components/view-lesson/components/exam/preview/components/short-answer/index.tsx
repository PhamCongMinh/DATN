import { Button, Divider, Input, message, Radio, RadioChangeEvent, Space, Typography } from 'antd'

import styles from './style.module.scss'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IDetailQuestionPoint } from '../../../../../../../../../../../../../../types/exam-submit'
import AxiosService from '../../../../../../../../../../../../../../utils/axios'

const { Text, Title } = Typography

interface IProps {
  index: number
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

  const handleSubmitAnswer = async () => {}

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
