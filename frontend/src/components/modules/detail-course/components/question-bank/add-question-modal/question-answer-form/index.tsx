import React from 'react'
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Select, Space, Typography } from 'antd'
import { NextPage } from 'next'
import { IQuestionChoice } from '../../../../../../../types/types'

interface IProps {
  onFinish: (value: IQuestionChoice[]) => void
}

const QuestionAnswerForm: NextPage<IProps> = props => (
  <Form name="dynamic_form_nest_item" onFinish={props.onFinish} style={{ maxWidth: 1000 }} autoComplete="off">
    <Form.List name="items">
      {(fields, { add, remove }) => (
        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
          {fields.map(field => (
            <Card
              size="small"
              title={`Đáp án số ${field.name + 1}`}
              key={field.key}
              extra={
                <CloseOutlined
                  onClick={() => {
                    remove(field.name)
                  }}
                />
              }
            >
              <Form.Item label="Đáp án số:" name={[field.name, 'order']} rules={[{ required: true }]}>
                <Input placeholder="Số thứ tụ" />
              </Form.Item>

              <Form.Item label="Nội dung đáp án:" name={[field.name, 'content']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Mô tả/Phản hồi đáp án:"
                name={[field.name, 'description']}
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Điểm số:" name={[field.name, 'point']} rules={[{ required: false }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Là Đáp án đúng ?" name={[field.name, 'is_correct']} rules={[{ required: true }]}>
                <Select
                  options={[
                    { key: 1, value: false, label: 'Sai' },
                    { key: 2, value: true, label: 'Đúng' }
                  ]}
                />
              </Form.Item>
            </Card>
          ))}

          <Button type="dashed" onClick={() => add()} block>
            + Thêm đáp án
          </Button>
        </div>
      )}
    </Form.List>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Chốt số lượng đáp án
      </Button>
    </Form.Item>
  </Form>
)

export default QuestionAnswerForm
