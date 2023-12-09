import React from 'react'
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Select, Space, Typography } from 'antd'
import { NextPage } from 'next'
import { EQuestionDifficultyLevel, EQuestionStatus, IQuestionChoice, IQuestion } from '../../../../../../../types/types'

interface IProps {
  onFinish: (value: IQuestion) => void
}

const GeneralQuestionForm: NextPage<IProps> = props => {
  const { onFinish } = props
  // const [form] = Form.useForm<IQuestionQuiz>()

  return (
    <>
      <Form onFinish={props.onFinish} layout="vertical" autoComplete="off">
        <Form.Item name="title" label="Tiêu đề câu hỏi:">
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Nội dung câu hỏi:">
          <Input />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái:">
          <Select
            style={{ width: 120 }}
            // onChange={handleChange}
            options={[
              { value: EQuestionStatus.DRAFT, label: EQuestionStatus.DRAFT },
              { value: EQuestionStatus.READY, label: EQuestionStatus.READY }
            ]}
          />
        </Form.Item>

        <Form.Item name="difficulty_level" label="Đánh giá độ khó:">
          <Select
            style={{ width: 120 }}
            options={[
              { value: EQuestionDifficultyLevel.EASY, label: EQuestionDifficultyLevel.EASY },
              { value: EQuestionDifficultyLevel.MEDIUM, label: EQuestionDifficultyLevel.MEDIUM },
              { value: EQuestionDifficultyLevel.HARD, label: EQuestionDifficultyLevel.HARD }
            ]}
          />
        </Form.Item>

        <Form.Item name="points" label="Điểm số:">
          <Input />
        </Form.Item>

        <Form.Item name="custom_question_id" label=" Mã câu hỏi (Tùy chọn):">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo câu hỏi
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default GeneralQuestionForm
