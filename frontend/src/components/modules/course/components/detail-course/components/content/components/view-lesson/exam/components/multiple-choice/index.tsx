import { Button, Divider, message, Radio, RadioChangeEvent, Space, Typography } from 'antd'

import styles from './style.module.scss'
import { IDetailQuestionPoint, IExamSubmit } from '../../../../../../../../../../../../types/exam-submit'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../../../../../../../../utils/axios'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { Checkbox } from 'antd'

const { Text, Title } = Typography

interface IProps {
  index: number
  exam_submit?: IExamSubmit
  question_point?: IDetailQuestionPoint
  // onSubmit: () => void
}

const QuestionMultipleChoice: React.FC<IProps> = (props): JSX.Element => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [choiceAnswer, setChoiceAnswer] = useState<string[]>()

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setChoiceAnswer(checkedValues as string[])
  }
  const handleSubmitAnswer = async () => {
    try {
      const res = await axiosService.post(`exam-submit/answer`, {
        exam_submit: props.exam_submit?._id,
        question_point: props.question_point?._id,
        question_choice: choiceAnswer
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

      <Checkbox.Group
        onChange={onChange}
        options={props.question_point?.question_id?.question_choice?.map(choice => {
          return { label: choice.content as string, value: choice._id as string }
        })}
        className={styles.checkbox}
      />

      <br />
      <Button className={styles.button} onClick={handleSubmitAnswer}>
        Gửi đáp án
      </Button>
    </div>
  )
}

export default QuestionMultipleChoice
