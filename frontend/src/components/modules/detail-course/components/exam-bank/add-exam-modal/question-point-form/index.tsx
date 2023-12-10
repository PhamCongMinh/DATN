import React, { useEffect } from 'react'
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Select, Space, Typography } from 'antd'
import { NextPage } from 'next'
import { IQuestion, IQuestionChoice } from '../../../../../../../types/types'
import { IExam, IQuestionPoint } from '../../../../../../../types/exam'

interface IProps {
  onFinish: (value: IQuestionPoint[]) => void
  currentExam?: IExam
}

const QuestionPointForm: NextPage<IProps> = props => {
  const [form] = Form.useForm<IQuestionPoint[]>()

  useEffect(() => {}, [props?.currentExam])

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={props.onFinish}
      style={{ maxWidth: 1000 }}
      autoComplete="off"
      initialValues={{ items: props?.currentExam?.question_point }}
    >
      <Form.List name="items" initialValue={form['items']}>
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map(field => (
              <Card
                size="small"
                title={`Câu hỏi số ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name)
                    }}
                  />
                }
              >
                <Form.Item
                  label="Thứ tự câu hỏi trong đề thi:"
                  name={[field.name, 'order']}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Số thứ tụ" />
                </Form.Item>

                <Form.Item label="ID câu hỏi:" name={[field.name, 'question_id']} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Điểm câu hỏi:" name={[field.name, 'point']} rules={[{ required: false }]}>
                  <Input />
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Thêm câu hỏi
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Chốt số lượng câu hỏi
        </Button>
      </Form.Item>
    </Form>
  )
}

export default QuestionPointForm
