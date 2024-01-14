import { Button, Divider, message, Radio, RadioChangeEvent, Space, Typography } from 'antd'

import styles from './style.module.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { Checkbox } from 'antd'
import { IDetailQuestionPoint } from '../../../../../../../../../../types/exam-submit'
import AxiosService from '../../../../../../../../../../utils/axios'
import { IQuestionDataFromAI } from '../../../../../../../../../../types/import'

const { Text, Title } = Typography

interface IProps {
  index: number
  question_data?: IQuestionDataFromAI
  // onSubmit: () => void
}

const ImportQuestionData: React.FC<IProps> = (props): JSX.Element => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [choiceAnswer, setChoiceAnswer] = useState<string[]>()

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setChoiceAnswer(checkedValues as string[])
  }
  const handleSubmitAnswer = async () => {}

  return (
    <div className={styles.container}>
      <Divider />
      <Text>
        {`Câu hỏi ${props.index}: ${props.question_data?.question}`}
        <br />
      </Text>

      <>
        {props.question_data?.answers?.map((answer, index) => {
          return (
            <Text key={index}>
              {`Đáp án số ${index + 1}: ${answer}`}
              <br />
            </Text>
          )
        })}
      </>
    </div>
  )
}

export default ImportQuestionData
