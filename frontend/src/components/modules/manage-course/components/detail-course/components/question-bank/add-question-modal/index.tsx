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
import QuestionAnswerForm from './question-answer-form'
import GeneralQuestionForm from './general-question-form'
import AxiosService from '../../../../../../../../utils/axios'
import { ICourse } from '../../../../../index'
import { EQuestionType, IQuestion } from '../../../../../../../../types/types'

const { TextArea } = Input
const { Text } = Typography

interface IProps extends ModalCustomProps {
  course: ICourse
  form: FormInstance<any>
  handleAddQuestion: () => void
  currentQuestion?: IQuestion
  questionType?: EQuestionType
}

const AddQuestionModal: NextPage<IProps> = ({ form, handleAddQuestion, currentQuestion, ...props }) => {
  const { onCancel } = props
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const [state, setState] = useState<IQuestion>({
    type: props.questionType,
    course_id: props.course._id
  })

  useEffect(() => {
    setState((prev: IQuestion) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['type'] = props.questionType
      })
    )
  }, [props.questionType])

  useEffect(() => {
    if (currentQuestion) {
      const { _id, ...rest } = currentQuestion
      setState(rest)
    }
  }, [currentQuestion])

  console.log('Create/edit question', state)

  const handleSubmit = async () => {
    // const isUpdatedInfo = await checkUpdatedInfo()
    // if (!isUpdatedInfo) {
    //   alert(
    //     'Bạn chưa cập nhật thêm thông tin cá nhân cần thiết, vui lòng truy cập mục Quản lý tài khoản -> Cập nhật thông tin cá nhân để cập nhật thêm thông tin'
    //   )
    //   return
    // }

    // Create new question
    if (!currentQuestion) {
      try {
        console.log(state)
        const response = await axiosService.post('/question/quiz', state)
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
        const response = await axiosService.put(`/question/quiz/${currentQuestion?._id}`, state)
        console.log(response)
        message.success(`Sửa câu hỏi thành công`)
      } catch (error) {
        alert('Sửa câu hỏi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
        console.log(error)
      }
    }
    handleAddQuestion()
  }

  const handleGeneralQuestion = (value: any) => {
    console.log('handleGeneralQuestion', value)
    setState((prev: IQuestion) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['title'] = value.title
        draft['description'] = value.description
        draft['status'] = value.status
        draft['difficulty_level'] = value.difficulty_level
        draft['points'] = value.points
        draft['custom_question_id'] = value.custom_question_id
      })
    )
  }

  const handleAddQuestionAnswers = (value: any) => {
    console.log('handleAddQuestionAnswers', value)
    setState((prev: IQuestion) =>
      produce(prev, draft => {
        // @ts-ignore
        draft['question_choice'] = value.items
      })
    )
  }

  const handleChange = (key: string, value: any) => {
    setState((prev: IQuestion) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = value
      })
    )
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Câu hỏi',
      children: (
        <>
          <GeneralQuestionForm currentQuestion={currentQuestion} onFinish={handleGeneralQuestion} />
        </>
      )
    },
    {
      key: '2',
      label: 'Đáp án',
      children: (
        <>
          {props?.questionType !== EQuestionType.ESSAY &&
            props?.questionType !== EQuestionType.SHORT_ANSWER &&
            currentQuestion?.type !== EQuestionType.ESSAY &&
            currentQuestion?.type !== EQuestionType.SHORT_ANSWER && (
              <QuestionAnswerForm currentQuestion={currentQuestion} onFinish={handleAddQuestionAnswers} />
            )}
          {
            // @ts-ignore
            props?.questionType === EQuestionType.SHORT_ANSWER ||
            currentQuestion?.type === EQuestionType.SHORT_ANSWER ? (
              <p>
                <Text className={styles.title3}>
                  <br />
                  Đáp án đúng:
                </Text>
                <TextArea
                  rows={4}
                  value={state?.answer}
                  style={{ maxWidth: 1000, marginBottom: 30 }}
                  onChange={e => handleChange('answer', e.target.value)}
                />
              </p>
            ) : null
          }
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
        title="Thêm câu hỏi mới"
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

export default AddQuestionModal
