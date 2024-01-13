import { Button, Divider, message, Radio, RadioChangeEvent, Space, Typography } from 'antd'

import styles from './style.module.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IDetailQuestionPoint } from '../../../../../../../../../../../../../../types/exam-submit'
import AxiosService from '../../../../../../../../../../../../../../utils/axios'

const { Text, Title } = Typography

interface IProps {
  index: number
  question_point?: IDetailQuestionPoint
  // onSubmit: () => void
}

const QuestionOneChoice: React.FC<IProps> = (props): JSX.Element => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [choiceAnswer, setChoiceAnswer] = useState<string>()

  const onChange = (e: RadioChangeEvent) => {
    setChoiceAnswer(e.target.value)
  }

  const handleSubmitAnswer = async () => {}

  return (
    <div className={styles.container}>
      <Divider />
      <Text>
        {`Câu hỏi ${props.index}: ${props.question_point?.question_id?.description}`}
        <br />
      </Text>
      <Radio.Group onChange={onChange} value={choiceAnswer}>
        <Space direction="vertical">
          {props.question_point?.question_id?.question_choice &&
            props.question_point?.question_id?.question_choice?.map(choice => {
              return (
                <Radio key={choice._id} value={choice._id}>
                  {choice.content}
                </Radio>
              )
            })}
        </Space>
      </Radio.Group>

      <br />
      <Button className={styles.button} onClick={handleSubmitAnswer}>
        Gửi đáp án
      </Button>
    </div>
  )
}

export default QuestionOneChoice
