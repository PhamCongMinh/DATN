import React, { useEffect } from 'react'
import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Form, Input, Select, Space, Typography } from 'antd'
import { NextPage } from 'next'
import moment from 'moment'
import { IExamScore } from '../../../../../../../../../../../../../../types/exam-score'

interface IProps {
  onFinish: (value: IExamScore) => void
  currentExam?: IExamScore
}

const GeneralExamForm: NextPage<IProps> = props => {
  const [form] = Form.useForm()

  // useEffect(() => {
  //   if (props?.currentExam) {
  //     const { start_time, end_time, ...rest } = props?.currentExam
  //     const formated_start_time = moment(start_time)
  //     const formated_end_time = moment(end_time)
  //     form.setFieldsValue({
  //       ...rest,
  //       start_time: formated_start_time,
  //       end_time: formated_end_time
  //     })
  //   }
  // }, [props?.currentExam])

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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật kết quả thi
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default GeneralExamForm
