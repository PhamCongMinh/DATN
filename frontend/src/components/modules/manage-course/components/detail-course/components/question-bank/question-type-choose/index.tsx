import React, { useState } from 'react'
import { Divider, RadioChangeEvent } from 'antd'
import { Input, Modal, Radio, Space, Typography } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import RentOutImage from '../../../../../../assets/images/image_introduction_rentout.png'
import { EQuestionType } from '../../../../../../../../types/types'
import AxiosService from '../../../../../../../../utils/axios'

const { Text, Title } = Typography

interface IQuestionType {
  key: EQuestionType
  title: string
  description: string
}

const listQuestionType: IQuestionType[] = [
  {
    key: EQuestionType.ONE_CHOICE,
    title: 'One choice',
    description: 'Cho phép lựa chọn một đáp án từ danh sách được xác định trước.'
  },
  {
    key: EQuestionType.MULTIPLE_CHOICE,
    title: 'Multiple choice',
    description: 'Cho phép lựa chọn nhiều đáp án từ danh sách được xác định trước.'
  },
  {
    key: EQuestionType.TRUE_FALSE,
    title: 'True or false',
    description: "Một dạng câu hỏi trắc nghiệm đơn giản chỉ có hai lựa chọn 'Đúng' và 'Sai'."
  },
  {
    key: EQuestionType.SHORT_ANSWER,
    title: 'Short answer',
    description:
      'Cho phép phản hồi gồm một hoặc một vài từ được xếp loại bằng cách so sánh với các câu trả lời mẫu khác nhau, có thể chứa ký tự đại diện.'
  },
  {
    key: EQuestionType.ESSAY,
    title: 'Essay',
    description: 'Cho phép phản hồi văn bản trực tuyến. Điều này sau đó phải được chấm điểm bằng tay.'
  },
  {
    key: EQuestionType.PROGRAMMING,
    title: 'Programming',
    description: 'Các câu hỏi lập trình'
  },
  {
    key: EQuestionType.SELECT_MISSING_WORD,
    title: 'Select missing word',
    description: 'Các từ còn thiếu trong nội dung câu hỏi sẽ được điền bằng cách sử dụng menu thả xuống.'
  },
  {
    key: EQuestionType.CALCULATED_SIMPLE,
    title: 'Calculated simple',
    description: 'Các câu hỏi tính toán đơn giản'
  },
  {
    key: EQuestionType.MATCHING,
    title: 'Matching',
    description: 'Câu trả lời cho mỗi câu hỏi phụ phải được chọn từ danh sách các khả năng.'
  },
  {
    key: EQuestionType.ORDERING,
    title: 'Ordering',
    description: 'Sắp xếp các câu trả lời theo thứ tự đúng.'
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
  const [state, setState] = useState<QuestionTypeChoose>({ type: EQuestionType.ONE_CHOICE })
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
          <Divider type="vertical" style={{ minHeight: 320, borderWidth: 2, color: 'dark' }} />
          <div>
            <Text>{listQuestionType?.filter(item => item.key == state.type)[0]?.description}</Text>
          </div>
        </Space>
      </Modal>
    </>
  )
}

export default QuestionTypeChoose
