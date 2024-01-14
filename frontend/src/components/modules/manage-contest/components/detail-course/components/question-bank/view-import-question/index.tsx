import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Button, Input, message, Modal, Space, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import ImportQuestionData from './components/import-question-data'
import { IQuestionDataFromAI } from '../../../../../../../../types/import'
import AxiosService from '../../../../../../../../utils/axios'
import { IExamSubmit } from '../../../../../../../../types/exam-submit'
import { ICourse } from '../../../../../index'

const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  course: ICourse
  data?: IQuestionDataFromAI[]
  open: boolean
  onSubmit: () => void
  onBack: () => void
}

const initialState: IQuestionDataFromAI[] = []

const ViewImportQuestion: React.FC<IProps> = (props): JSX.Element => {
  const [questions, setQuestions] = useState<IQuestionDataFromAI[]>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [currentExamSubmit, setCurrentExamSubmit] = useState<IExamSubmit>()

  useEffect(() => {
    if (props?.data) setQuestions(props?.data)
  }, [props?.data])

  const handleSubmit = async () => {
    try {
      const data = props?.data?.map(question => {
        return {
          description: question.question,
          course_id: props.course._id,
          question_choice: question?.answers?.map(answer => {
            return {
              content: answer,
              is_correct: false
            }
          })
        }
      })
      const axiosService2 = new AxiosService('application/json', jwt)
      const response = await axiosService2.post('/question/import', {
        questions: data
      })
      console.log(response)
      message.success(`Nhập liệu danh sách câu hỏi thành công`)
      props?.onSubmit()
    } catch (error) {
      alert('Nhập liệu danh sách câu hỏi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  return (
    <Modal
      title="Danh sách câu hỏi mà AI trích xuất được từ file gửi lên"
      open={props.open}
      onOk={handleSubmit}
      onCancel={props.onBack}
      centered
      width={1000}
      style={{ maxHeight: 1000, overflowY: 'scroll' }}
    >
      <div className={styles.space}>
        {props?.data?.map((question: IQuestionDataFromAI, index) => {
          return <ImportQuestionData index={index + 1} key={index} question_data={question} />
        })}
      </div>
    </Modal>
  )
}

export default ViewImportQuestion
