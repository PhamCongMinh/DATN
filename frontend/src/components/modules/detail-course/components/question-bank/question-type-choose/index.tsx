import React, { useState } from 'react'
import { Divider, RadioChangeEvent } from 'antd'
import { Input, Modal, Radio, Space, Typography } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import { EQuestionType } from '../../../../../../types/types'
import AxiosService from '../../../../../../utils/axios'
import Image from 'next/image'
import RentOutImage from '../../../../../../assets/images/image_introduction_rentout.png'

const { Text, Title } = Typography

interface IQuestionType {
  key: EQuestionType
  title: string
  description: string
}

const listQuestionType: IQuestionType[] = [
  {
    key: EQuestionType.QUIZ,
    title: 'Question',
    description: EQuestionType.QUIZ
  },
  {
    key: EQuestionType.CODE_SNIPPET,
    title: 'Code snippet',
    description: EQuestionType.CODE_SNIPPET
  },
  {
    key: EQuestionType.EQUATION,
    title: 'Equation',
    description: EQuestionType.EQUATION
  },
  {
    key: EQuestionType.HOTSPOT,
    title: 'Hot spot',
    description: EQuestionType.HOTSPOT
  },
  {
    key: EQuestionType.TRUE_FALSE,
    title: 'True or false',
    description: EQuestionType.TRUE_FALSE
  },
  {
    key: EQuestionType.MULTIPLE_CHOICE,
    title: 'Multiple choice',
    description: EQuestionType.MULTIPLE_CHOICE
  },
  {
    key: EQuestionType.SHORT_ANSWER,
    title: 'Short answer',
    description: EQuestionType.SHORT_ANSWER
  },
  {
    key: EQuestionType.MULTIPLE_ANSWER,
    title: 'Multi-answer',
    description: EQuestionType.MULTIPLE_ANSWER
  },
  {
    key: EQuestionType.ORDERING,
    title: 'Ordering',
    description: EQuestionType.ORDERING
  },
  {
    key: EQuestionType.PROGRAMMING,
    title: 'Programming',
    description: EQuestionType.PROGRAMMING
  },
  {
    key: EQuestionType.MATCHING,
    title: 'Matching',
    description: EQuestionType.MATCHING
  },
  {
    key: EQuestionType.ESSAY,
    title: 'Essay',
    description: EQuestionType.ESSAY
  },
  {
    key: EQuestionType.FILL_IN_THE_BLANK,
    title: 'Fill in the black',
    description: EQuestionType.FILL_IN_THE_BLANK
  }
]

interface IProps {
  open: boolean
  onCancel: () => void
  onOk: (type: EQuestionType) => void
}

export type QuestionTypeChoose = {
  type: EQuestionType
}

const QuestionTypeChoose: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<QuestionTypeChoose>({ type: EQuestionType.QUIZ })
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)

  const onChange = (e: RadioChangeEvent) => {
    setState({
      type: e.target.value
    })
  }

  const handleSubmit = async () => {
    props.onOk(state.type)
  }

  return (
    <>
      <Modal
        title="Chọn loại câu hỏi để thêm"
        open={props.open}
        onOk={handleSubmit}
        onCancel={props.onCancel}
        centered
        width={540}
        className={styles.modal}
      >
        <Divider />
        <Space className={styles.space}>
          <div className={styles.container}>
            <Radio.Group onChange={onChange} value={state.type}>
              <Space direction="vertical">
                {listQuestionType.map((item: IQuestionType) => {
                  return (
                    <Radio key={item.key} value={item.key}>
                      {item.title}
                    </Radio>
                  )
                })}
              </Space>
            </Radio.Group>
          </div>
          <Divider type="vertical" style={{ minHeight: 400, borderWidth: 2, color: 'dark' }} />
          <div>
            <Text>{listQuestionType?.filter(item => item.key == state.type)[0]?.description}</Text>
          </div>
        </Space>
      </Modal>
    </>
  )
}

export default QuestionTypeChoose
