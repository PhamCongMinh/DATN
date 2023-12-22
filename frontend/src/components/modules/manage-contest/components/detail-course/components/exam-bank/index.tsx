import { ColumnsType } from 'antd/es/table'
import ButtonOutlined from 'components/elements/button-custom/ButtonOutlined'
import TableCustom from 'components/elements/table'
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import ButtonContained from 'components/elements/button-custom/ButtonContainer'
import { Breadcrumb, Button, message, Typography } from 'antd'
import dayjs from 'dayjs'
import AddQuestionModal from './add-exam-modal'
import NotiModal from 'components/elements/noti-modal'
import { EventFiter, IQuestion, MeetingTimeFilter } from 'types/types'
import debounce from 'lodash/debounce'
import RemovedModal from 'components/elements/removed-modal'
import { useForm } from 'antd/es/form/Form'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import TrashIcon from '../../../../../../../assets/icons/trash.png'
import EditIcon from '../../../../../../../assets/icons/edit.png'
import Image from 'next/image'
import AddExamModal from './add-exam-modal'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { IExam } from '../../../../../../../types/exam'
import { ICourse } from '../../../../index'
import AxiosService from '../../../../../../../utils/axios'
const { Text } = Typography

export const DATE_FORMAT_FULL = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

type IProps = {
  course: ICourse
}

const ExamBank: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  const user = useSelector((state: any) => state.auth?.user)
  const [exams, setExams] = useState<IExam[]>()
  const [reload, setReload] = useState<boolean>(false)

  const [isChooseQuestionType, setIsChooseQuestionType] = useState<boolean>(false)
  const [isAddEvent, setIsAddEvent] = useState(false)
  const [isEditEvent, setIsEditEvent] = useState(false)
  const [isRemove, setIsRemove] = useState(false)
  const [currentExam, setCurrentExam] = useState<IExam>()
  const [timeFilter, setTimeFilter] = useState<MeetingTimeFilter>(MeetingTimeFilter.ALL)
  const [eventFilter, setEventFilter] = useState<EventFiter>()
  const [searchString, setSearchString] = useState<string>()
  const [currentPage, setCurrentPage] = useState(1)

  const [questions, setQuestions] = useState<IQuestion[]>()

  const [form] = useForm()
  const [notiModal, setNotiModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'failed',
    text: ''
  })
  console.log('currentExam', currentExam)

  useEffect(() => {
    const axiosService = new AxiosService('application/json', jwt)
    const query = {
      course_id: props.course._id
    }
    const fetchData = async () => {
      const response1 = await axiosService.get('/exam', { params: query })
      const data1: IExam[] = response1.data
      const response2 = await axiosService.get('/question/quiz', { params: query })
      const data2: IQuestion[] = response2.data
      console.log('examData', data1)
      console.log('questionData', data2)
      setExams(data1)
      setQuestions(data2)

      setReload(false)
    }
    fetchData()
  }, [reload])

  const handleSubmitQuestion = async () => {
    setCurrentExam(undefined)
    setReload(true)
    setIsAddEvent(false)
    setIsEditEvent(false)
  }

  const handleSearch = debounce(setSearchString, 500)

  const handleRemoveEvent = async () => {
    try {
      if (currentExam?._id) {
        const response = await axiosService.delete(`/exam/${currentExam?._id}`)
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

  interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
  }

  const columns: ColumnsType<IExam> = [
    {
      title: 'Mã bài thi',
      dataIndex: 'exam_id',
      key: 'exam_id',
      render: (_, record: IExam) => <span className={styles['table-event limit-text']}>{record?.exam_id}</span>
    },
    {
      title: 'Tên bài thi',
      dataIndex: 'name',
      key: 'name',
      render: (_, record: IExam) => <span className={styles['table-event limit-text']}>{record.name}</span>
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (_, record: IExam) => <span className={styles['table-event limit-text']}>{record.description}</span>
    },
    {
      title: 'Thời gian',
      dataIndex: 'exam_time',
      key: 'exam_time',
      render: (_, record: IExam) => (
        <div className={styles['table-organiser']}>
          <p className={styles['table-organiser-name limit-text']}>{record.exam_time}</p>
        </div>
      )
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_time',
      render: (_, record: IExam) => (
        <span className={styles['table-location']}>
          {/*<DotIcon />*/}
          <span className={styles['location whitespace-nowrap']}>{record.start_time}</span>
        </span>
      )
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'end_time',
      render: (_, record: IExam) => (
        <span className={styles['table-location']}>
          {/*<DotIcon />*/}
          <span className={styles['location whitespace-nowrap']}>{record.end_time}</span>
        </span>
      )
    },
    {
      title: 'Nhận xét',
      dataIndex: 'comment',
      render: (_, record: IExam) => <span className={styles['table-sources']}>{record.comment}</span>
    },
    {
      title: 'Tác giả',
      dataIndex: 'author_id',
      render: (_, record: IExam) => <span className={styles['table-sources']}>{record.author_id}</span>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      render: (_, record: IExam) => (
        <span className={styles['table-created-date whitespace-nowrap']}>
          {dayjs(record?.created_at).format('D MMM YYYY').toString()}
        </span>
      )
    },
    {
      title: 'Ngày chỉnh sửa',
      dataIndex: 'updated_at',
      render: (_, record: IExam) => (
        <span className={styles['table-created-date whitespace-nowrap']}>
          {dayjs(record?.updated_at).format('D MMM YYYY').toString()}
        </span>
      )
    },
    {
      dataIndex: 'action',
      render: (_, record: IExam) => (
        <span className={styles['table-action']}>
          <Button
            className={styles['trash-btn']}
            type="link"
            onClick={() => {
              setCurrentExam(record)
              setIsRemove(true)
            }}
            icon={<Image src={TrashIcon} alt="House1" style={{ height: 19, width: 17 }} />}
          />
          <Button
            onClick={() => {
              setCurrentExam(record)
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
          <span>Cuộc thi</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Ngân hàng đề thi </Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>
        Ngân hàng đề thi
        <br />
      </Text>
      <div className={styles['meeting-page-container']}>
        <div className={styles['meeting-page-container-head']}>
          <div className={styles['head-text']}>
            <h1 className={styles['head-text-title']}>
              Tạo đề thi/bài tập
              <span className={styles['total']}> Tổng số</span>
            </h1>
            <h2 className={styles['head-text-subtitle']}>Thêm bài kiểm tra hoặc bài tập cho khóa học</h2>
          </div>
          <div className={styles['head-action']}>
            <ButtonOutlined btnType="base" height={40}>
              Export
            </ButtonOutlined>
            <ButtonOutlined btnType="base" height={40}>
              Import
            </ButtonOutlined>
            <ButtonOutlined btnType="base" height={40}>
              Tự động tạo đề
            </ButtonOutlined>
            <ButtonContained
              onClick={() => {
                setIsAddEvent(true)
                setIsEditEvent(false)
                setCurrentExam(undefined)
              }}
              btnType="green"
              height={40}
            >
              Thêm đề thi mới
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
          dataSource={exams || []} //{meetingList?.data || []} // TODO
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
          <AddExamModal
            currentExam={currentExam}
            form={form}
            open={isAddEvent || isEditEvent}
            onCancel={() => {
              setIsAddEvent(false)
              setIsEditEvent(false)
              setCurrentExam(undefined)
              setReload(!reload)
            }}
            handleAddExam={handleSubmitQuestion}
            course={props.course}
            questions={questions}
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
            content="Are you sure you wanted to remove this exam?"
            handleDeleteAdmin={handleRemoveEvent}
          />
        </>
      </div>{' '}
    </div>
  )
}

export default ExamBank
