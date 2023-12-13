import React, { useEffect } from 'react'
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Form, Input, Select, Space, Typography } from 'antd'
import { NextPage } from 'next'
import { EQuestionDifficultyLevel, EQuestionStatus, IQuestionChoice, IQuestion } from '../../../../../../../types/types'
import { IExam } from '../../../../../../../types/exam'
import moment from 'moment'

interface IProps {
  onFinish: (value: IExam) => void
  currentExam?: IExam
}

const GeneralExamForm: NextPage<IProps> = props => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (props?.currentExam) {
      const { start_time, end_time, ...rest } = props?.currentExam
      const formated_start_time = moment(start_time)
      const formated_end_time = moment(end_time)
      form.setFieldsValue({
        ...rest,
        start_time: formated_start_time,
        end_time: formated_end_time
      })
    }
  }, [props?.currentExam])

  const onFinish = (fieldsValue: any) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      start_time: fieldsValue['start_time'].format('YYYY-MM-DD HH:mm:ss'),
      end_time: fieldsValue['end_time'].format('YYYY-MM-DD HH:mm:ss')
    }
    console.log('Received values of form: ', values)
    props.onFinish(values)
  }

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical" autoComplete="off">
        <Form.Item name="exam_id" label="Mã bài thi:">
          <Input />
        </Form.Item>

        <Form.Item name="name" label="Tên bài thi:">
          <Input />
        </Form.Item>

        <Form.Item name="point_ladder" label="Thang điểm:">
          <Input />
        </Form.Item>

        <Form.Item name="pass_point" label="Điểm để qua:">
          <Input />
        </Form.Item>

        <Form.Item name="retry_times_number" label="Số lần cho phép làm lại:">
          <Input />
        </Form.Item>

        <Form.Item name="exam_time" label="Thời gian làm bài:">
          <Input />
        </Form.Item>

        <Form.Item name="start_time" label="Thời gian bắt đầu:">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item name="end_time" label="Thời gian kết thúc:">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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

export default GeneralExamForm
