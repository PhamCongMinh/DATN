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
import GeneralExamForm from './general-exam-form'
import { IExamScore } from '../../../../../../../../../../../../../types/exam-score'
import AxiosService from '../../../../../../../../../../../../../utils/axios'

const { TextArea } = Input
const { Text } = Typography

interface IProps extends ModalCustomProps {
  form: FormInstance<any>
  handleEditExamResult: () => void
  currentExamResult?: IExamScore
}

const AddExamModal: NextPage<IProps> = ({ form, handleEditExamResult, currentExamResult, ...props }) => {
  const { onCancel } = props
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const [state, setState] = useState<IExamScore>({})

  useEffect(() => {
    if (currentExamResult) {
      const { _id, ...rest } = currentExamResult
      setState(rest)
    }
  }, [currentExamResult])

  const handleSubmit = async () => {
    // Edit question
    try {
      console.log(state)
      // const response = await axiosService.put(`/exam/${currentExam?._id}`, state)
      // console.log(response)
      message.success(`Sửa câu hỏi thành công`)
    } catch (error) {
      alert('Sửa câu hỏi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
    handleEditExamResult()
  }

  const handleChange = (value: any) => {
    // setState((prev: IExamScore) =>
    //   produce(prev, draft => {
    //     // @ts-ignore
    //     draft['exam_time'] = value.exam_time
    //     draft['start_time'] = value.start_time
    //     draft['end_time'] = value.end_time
    //   })
    // )
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Thông tin kết quả bài thi',
      children: (
        <>
          <GeneralExamForm currentExam={state} onFinish={handleChange} />
        </>
      )
    }
  ]

  return (
    <>
      <Modal
        title="Chỉnh sửa kết quả thi"
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
