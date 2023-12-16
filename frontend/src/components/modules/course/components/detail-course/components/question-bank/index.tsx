import { ColumnsType } from 'antd/es/table'
import ButtonOutlined from 'components/elements/button-custom/ButtonOutlined'
import TableCustom from 'components/elements/table'
// import { ReactComponent as ImportIcon } from 'assets/icons/meeting/import.svg'
// import { ReactComponent as PlusIcon } from 'assets/icons/meeting/plus.svg'
// import { ReactComponent as SortIcon } from 'assets/icons/meeting/sortArrowIcon.svg'
// import { ReactComponent as DotIcon } from 'assets/icons/meeting/dot.svg'
// import { ReactComponent as TrashIcon } from 'assets/icons/meeting/trash.svg'
// import { ReactComponent as EditIcon } from 'assets/icons/meeting/edit.svg'
import DefaultOrganier from 'assets/icons/meeting/organiser.png'
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import ButtonContained from 'components/elements/button-custom/ButtonContainer'
import { Breadcrumb, Button, message, Typography } from 'antd'
import dayjs from 'dayjs'
import AddQuestionModal from './add-question-modal'
import NotiModal from 'components/elements/noti-modal'
import { MenuProps } from 'antd/lib'
import cx from 'classnames'
import {
  EQuestionType,
  // ConferencePrams,
  EventFiter,
  IQuestion,
  // MeetingSortBy,
  MeetingSortDirection,
  MeetingTimeFilter
} from 'types/types'
// import {
//   useCreateConferenceMutation,
//   useGetMeetingListQuery,
//   useRemoveConferenceMutation,
//   useUpdateConferenceMutation
// } from 'store/slices/meeting/api'
import debounce from 'lodash/debounce'
import RemovedModal from 'components/elements/removed-modal'
import { useForm } from 'antd/es/form/Form'
import moment from 'moment'
import { toast } from 'react-toastify'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import * as url from 'url'
import TrashIcon from '../../../../../../../assets/icons/trash.png'
import EditIcon from '../../../../../../../assets/icons/edit.png'
import Image from 'next/image'
import QuestionTypeChoose from './question-type-choose'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import AxiosService from '../../../../../../../utils/axios'
import { ICourse } from '../../../../index'
const { Text } = Typography

export const DATE_FORMAT_FULL = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

type IProps = {
  course: ICourse
}

const QuestionBank: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const user = useSelector((state: any) => state.auth?.user)
  const [questions, setQuestions] = useState<IQuestion[]>()
  const [reload, setReload] = useState<boolean>(false)

  const [isChooseQuestionType, setIsChooseQuestionType] = useState<boolean>(false)
  const [questionType, setQuestionType] = useState<EQuestionType>()
  const [isAddEvent, setIsAddEvent] = useState(false)
  const [isEditEvent, setIsEditEvent] = useState(false)
  const [isRemove, setIsRemove] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>()
  const [timeFilter, setTimeFilter] = useState<MeetingTimeFilter>(MeetingTimeFilter.ALL)
  const [eventFilter, setEventFilter] = useState<EventFiter>()
  const [searchString, setSearchString] = useState<string>()
  const [currentPage, setCurrentPage] = useState(1)

  const [form] = useForm()
  const [notiModal, setNotiModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'failed',
    text: ''
  })
  console.log('currentQuestion', currentQuestion)

  useEffect(() => {
    const axiosService = new AxiosService('application/json', jwt)
    const query = {
      course_id: props.course._id
    }
    const fetchData = async () => {
      const response = await axiosService.get('/question/quiz', { params: query })
      const data: IQuestion[] = response.data
      console.log('data', data)
      setQuestions(data)
      setReload(false)
    }
    fetchData()
  }, [reload])

  const handleSubmitQuestion = async () => {
    setReload(true)
    setQuestionType(undefined)
    setIsAddEvent(false)
  }

  const handleSearch = debounce(setSearchString, 500)

  const handleRemoveEvent = async () => {
    try {
      if (currentQuestion?._id) {
        const response = await axiosService.delete(`/question/quiz/${currentQuestion?._id}`)
        console.log(response)
        message.success(`Xóa câu hỏi thành công`)
      }
      setIsRemove(false)
      setReload(true)
    } catch (error) {
      alert('Xóa câu hỏi thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }

  const handleChoiceQuestionType = async (type: EQuestionType) => {
    console.log('handleChoiceQuestionType', type)
    setQuestionType(type)
    setIsChooseQuestionType(false)
    setIsAddEvent(true)
  }

  interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
  }

  const columns: ColumnsType<IQuestion> = [
    {
      title: 'Mã câu hỏi',
      dataIndex: 'custom_question_id',
      key: 'custom_question_id',
      render: (_, record: IQuestion) => (
        <span className={styles['table-event limit-text']}>{record?.custom_question_id}</span>
      )
    },
    {
      title: 'Tên câu hỏi',
      dataIndex: 'title',
      key: 'title',
      // sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend'],
      // sortIcon: () => <SortIcon />,
      render: (_, record: IQuestion) => <span className={styles['table-event limit-text']}>{record.title}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: IQuestion) => (
        <div className={styles['table-organiser']}>
          <p className={styles['table-organiser-name limit-text']}>{record.status}</p>
        </div>
      )
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      render: (_, record: IQuestion) => (
        <span className={styles['table-location']}>
          {/*<DotIcon />*/}
          <span className={styles['location whitespace-nowrap']}>{record.type}</span>
        </span>
      )
    },
    {
      title: 'Độ khó',
      dataIndex: 'difficulty_level',
      render: (_, record: IQuestion) => (
        <div className={styles['table-organiser']}>
          <p className={styles['table-organiser-name limit-text']}>{record.difficulty_level}</p>
        </div>
      )
    },
    {
      title: 'Nhận xét',
      dataIndex: 'comment',
      render: (_, record: IQuestion) => <span className={styles['table-sources']}>{record.comment}</span>
    },
    {
      title: 'Tác giả',
      dataIndex: 'author_id',
      render: (_, record: IQuestion) => <span className={styles['table-sources']}>{record.author_id}</span>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      render: (_, record: IQuestion) => (
        <span className={styles['table-created-date whitespace-nowrap']}>
          {dayjs(record?.created_at).format('D MMM YYYY').toString()}
        </span>
      )
    },
    {
      title: 'Ngày chỉnh sửa',
      dataIndex: 'updated_at',
      render: (_, record: IQuestion) => (
        <span className={styles['table-created-date whitespace-nowrap']}>
          {dayjs(record?.updated_at).format('D MMM YYYY').toString()}
        </span>
      )
    },
    {
      dataIndex: 'action',
      render: (_, record: IQuestion) => (
        <span className={styles['table-action']}>
          <Button
            className={styles['trash-btn']}
            type="link"
            onClick={() => {
              setCurrentQuestion(record)
              setIsRemove(true)
            }}
            icon={<Image src={TrashIcon} alt="House1" style={{ height: 19, width: 17 }} />}
          />
          <Button
            onClick={() => {
              setCurrentQuestion(record)
              setIsEditEvent(true)
              setIsAddEvent(false)
            }}
            className={styles['edit-btn']}
            type="link"
            icon={<Image src={EditIcon} alt="House1" style={{ height: 18, width: 18 }} />}
          />
        </span>
      )
    }
  ]

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  return (
    <div className={styles.content}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined />
          <span>Khóa học</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Ngân hàng câu hỏi</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>
        Ngân hàng câu hỏi
        <br />
      </Text>
      <div className={styles['meeting-page-container']}>
        <div className={styles['meeting-page-container-head']}>
          <div className={styles['head-text']}>
            <h1 className={styles['head-text-title']}>
              Tạo câu hỏi
              <span className={styles['total']}> Tổng số</span>
            </h1>
            <h2 className={styles['head-text-subtitle']}>Thêm câu hỏi cho đề thi và bài kiểm tra</h2>
          </div>
          <div className={styles['head-action']}>
            <ButtonOutlined btnType="base" height={40}>
              Export
            </ButtonOutlined>
            <ButtonOutlined btnType="base" height={40}>
              Import
            </ButtonOutlined>
            <ButtonContained
              onClick={() => {
                setIsChooseQuestionType(true)
                setIsAddEvent(false)
                setIsEditEvent(false)
                setCurrentQuestion(undefined)
              }}
              btnType="green"
              height={40}
            >
              Thêm câu hỏi mới
            </ButtonContained>
          </div>
        </div>
        <TableCustom
          className={styles['meeting-table']}
          rowSelection={rowSelection}
          onSearch={handleSearch}
          loading={false} //{isFetching} //TODO
          columns={columns}
          hiddenFilterBtn={true}
          dataSource={questions || []} //{meetingList?.data || []} // TODO
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          setCurrentPage={setCurrentPage}
          paginate={{
            curPage: currentPage,
            totalPages: 5, //totalPage as number, //TODO
            setPage: setCurrentPage
          }}
        />
        <>
          <AddQuestionModal
            questionType={questionType}
            currentQuestion={currentQuestion}
            form={form}
            open={isAddEvent || isEditEvent}
            onCancel={() => {
              setIsAddEvent(false)
              setIsEditEvent(false)
              setCurrentQuestion(undefined)
              setQuestionType(undefined)
            }}
            handleAddQuestion={handleSubmitQuestion}
            course={props.course}
          />
          <NotiModal
            open={notiModal.isOpen}
            onCancel={() => setNotiModal({ isOpen: false, text: '', type: 'success' })}
            type={notiModal.type}
            text={notiModal.text}
          />
          <RemovedModal
            open={isRemove}
            onCancel={() => setIsRemove(false)}
            centered
            content="Are you sure you wanted to remove this event?"
            handleDeleteAdmin={handleRemoveEvent}
          />
          <QuestionTypeChoose
            open={isChooseQuestionType}
            onCancel={() => {
              setIsChooseQuestionType(false)
            }}
            onOk={handleChoiceQuestionType}
          />
        </>
      </div>
    </div>
  )
}

export default QuestionBank
