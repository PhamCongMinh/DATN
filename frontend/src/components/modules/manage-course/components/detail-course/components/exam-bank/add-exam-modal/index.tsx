import { ModalCustomProps } from 'components/elements/modal'
import {
  Col,
  Collapse,
  type CollapseProps,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Typography
} from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import styles from './style.module.scss'
import React, { ReactNode, useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import produce from 'immer'
import QuestionAnswerForm from './question-point-form'
import GeneralQuestionForm from './general-exam-form'
import GeneralExamForm from './general-exam-form'
import QuestionPointForm from './question-point-form'
import { IExam } from '../../../../../../../../types/exam'
import { ICourse } from '../../../../../index'
import AxiosService from '../../../../../../../../utils/axios'
import { IQuestion } from '../../../../../../../../types/types'

const { TextArea } = Input
const { Text } = Typography

interface IProps extends ModalCustomProps {
  course: ICourse
  form: FormInstance<any>
  handleAddExam: () => void
  currentExam?: IExam
  questions?: IQuestion[]
}

const AddExamModal: NextPage<IProps> = ({ form, handleAddExam, currentExam, ...props }) => {
  const { onCancel } = props
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const [state, setState] = useState<IExam>({
    course_id: props.course._id
  })

  useEffect(() => {
    if (currentExam) {
      const { _id, ...rest } = currentExam
      setState(rest)
    }
  }, [currentExam])

  console.log('Create/edit exam', state)

  const handleSubmit = async () => {
    // const isUpdatedInfo = await checkUpdatedInfo()
    // if (!isUpdatedInfo) {
    //   alert(
    //     'Bạn chưa cập nhật thêm thông tin cá nhân cần thiết, vui lòng truy cập mục Quản lý tài khoản -> Cập nhật thông tin cá nhân để cập nhật thêm thông tin'
    //   )
    //   return
    // }
    console.log('currentExam', currentExam)

    // Create new question
    if (!currentExam) {
      try {
        console.log(state)
        const response = await axiosService.post('/exam', state)
        console.log(response)
        message.success(`Tạo câu hỏi thành công`)
      } catch (error) {
        alert('Tạo câu hỏi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
        console.log(error)
      }
    } else {
      // Edit question
      try {
        console.log(state)
        const response = await axiosService.put(`/exam/${currentExam?._id}`, state)
        console.log(response)
        message.success(`Sửa câu hỏi thành công`)
      } catch (error) {
        alert('Sửa câu hỏi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
        console.log(error)
      }
    }
    handleAddExam()
  }

  const handleGeneralExam = (value: any) => {
    console.log('handleGeneralExam', value)
    setState((prev: IExam) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['exam_id'] = value.exam_id
        draft['name'] = value.name
        draft['point_ladder'] = value.point_ladder
        draft['pass_point'] = value.pass_point
        draft['retry_times_number'] = value.retry_times_number
        draft['password'] = value.password
        draft['exam_time'] = value.exam_time
        draft['start_time'] = value.start_time
        draft['end_time'] = value.end_time
      })
    )
  }

  const handleAddQuestionPoint = (value: any) => {
    console.log('handleAddQuestionPoint', value)
    setState((prev: IExam) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['question_point'] = value.items
      })
    )
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Thông tin bài thi',
      children: (
        <>
          <GeneralExamForm currentExam={state} onFinish={handleGeneralExam} />
        </>
      )
    },
    {
      key: '2',
      label: 'Danh sách câu hỏi',
      children: (
        <>
          <QuestionPointForm currentExam={state} onFinish={handleAddQuestionPoint} questions={props?.questions} />
        </>
      )
    },
    {
      key: '3',
      label: 'Khác',
      children: (
        <p>
          <Text className={styles.title3}>
            <br />
            Nhận xét:
          </Text>
          <TextArea
            rows={4}
            style={{ maxWidth: 1000, marginBottom: 30 }}
            // onChange={e => handleChange('description', e)}
          />
        </p>
      )
    }
  ]

  return (
    <>
      <Modal
        title="Thêm bài thi mới"
        open={props.open}
        onOk={handleSubmit}
        onCancel={props.onCancel}
        centered
        className={styles.modal}
      >
        <Divider />
        <div style={{ height: 500, overflowY: 'scroll' }}>
          <Collapse items={items} defaultActiveKey={'1'} />
        </div>
      </Modal>
    </>
  )
}

export default AddExamModal
