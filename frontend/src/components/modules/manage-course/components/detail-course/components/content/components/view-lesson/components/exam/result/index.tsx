import { ColumnsType } from 'antd/es/table'
import ButtonOutlined from 'components/elements/button-custom/ButtonOutlined'
import TableCustom from 'components/elements/table'
import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { Breadcrumb, Button, message, Typography } from 'antd'
import { EventFiter, IQuestion, MeetingTimeFilter } from 'types/types'
import debounce from 'lodash/debounce'
import { useForm } from 'antd/es/form/Form'
import { NextPage } from 'next'
import { useSelector } from 'react-redux'
import EditIcon from '../../../../../../../../../../../../assets/icons/edit.png'
import Image from 'next/image'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import AxiosService from '../../../../../../../../../../../../utils/axios'
import { IExamScore } from '../../../../../../../../../../../../types/exam-score'
const { Text } = Typography

export const DATE_FORMAT_FULL = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

type IProps = {
  exam_id?: string
  onBack?: () => void
}

const ExamResult: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const user = useSelector((state: any) => state.auth?.user)

  const [examResult, setExamResult] = useState<IExamScore[]>()
  const [reload, setReload] = useState<boolean>(false)

  const [isEditEvent, setIsEditEvent] = useState(false)
  const [currentExamResult, setCurrentExamResult] = useState<IExamScore>()
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

  useEffect(() => {
    const axiosService = new AxiosService('application/json', jwt)
    const fetchData = async () => {
      const response1 = await axiosService.get(`/exam-score/exam/${props?.exam_id}`, {})
      const data: IExamScore[] = response1.data
      setExamResult(data)
      setReload(false)
    }
    fetchData()
  }, [reload])

  const handleSearch = debounce(setSearchString, 500)

  interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
  }

  const columns: ColumnsType<IExamScore> = [
    {
      title: 'Họ và tên',
      dataIndex: 'username',
      key: 'username',
      render: (_, record: IExamScore) => (
        <span className={styles['table-event limit-text']}>{record?.author_id?.username}</span>
      )
    },
    {
      title: 'Số câu trả lời đúng',
      dataIndex: 'correct_answer',
      key: 'correct_answer',
      render: (_, record: IExamScore) => (
        <span className={styles['table-event limit-text']}>{record?.correct_answer}</span>
      )
    },
    {
      title: 'Tổng điểm câu hỏi',
      dataIndex: 'total_point',
      key: 'total_point',
      render: (_, record: IExamScore) => <span className={styles['table-event limit-text']}>{record?.total_point}</span>
    },
    {
      title: 'Điểm số đã quy đổi',
      dataIndex: 'score',
      key: 'score',
      render: (_, record: IExamScore) => (
        <div className={styles['table-organiser']}>
          <p className={styles['table-organiser-name limit-text']}>{record?.score}</p>
        </div>
      )
    },
    {
      title: 'Thời gian nộp bài',
      dataIndex: 'end_time',
      render: (_, record: IExamScore) => (
        <span className={styles['table-location']}>
          {/*<DotIcon />*/}
          <span className={styles['location whitespace-nowrap']}>{record?.exam_submit?.end_time?.toString()}</span>
        </span>
      )
    },
    {
      dataIndex: 'action',
      render: (_, record: IExamScore) => (
        <span className={styles['table-action']}>
          <Button
            onClick={() => {
              setCurrentExamResult(record)
              setIsEditEvent(true)
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
      <div className={styles['meeting-page-container']}>
        <div className={styles['meeting-page-container-head']}>
          <div className={styles['head-text']}>
            <h1 className={styles['head-text-title']}>
              Kết quả thi
              <span className={styles['total']}> Tổng số</span>
            </h1>
            <h2 className={styles['head-text-subtitle']}>Kết quả bài thi của người tham gia</h2>
          </div>
          <div className={styles['head-action']}>
            <ButtonOutlined btnType="base" height={40}>
              Export
            </ButtonOutlined>
          </div>
        </div>
        <TableCustom
          className={styles['meeting-table']}
          rowSelection={rowSelection}
          onSearch={handleSearch}
          loading={false} //{isFetching} //TODO
          columns={columns}
          hiddenFilterBtn={true}
          dataSource={examResult || []} //{meetingList?.data || []} // TODO
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          setCurrentPage={setCurrentPage}
          paginate={{
            curPage: currentPage,
            totalPages: 5, //totalPage as number, //TODO
            setPage: setCurrentPage
          }}
        />
        {/*<>*/}
        {/*  <AddExamModal*/}
        {/*    currentExam={currentExam}*/}
        {/*    form={form}*/}
        {/*    open={isAddEvent || isEditEvent}*/}
        {/*    onCancel={() => {*/}
        {/*      setIsAddEvent(false)*/}
        {/*      setIsEditEvent(false)*/}
        {/*      setCurrentExam(undefined)*/}
        {/*      setReload(!reload)*/}
        {/*    }}*/}
        {/*    handleAddExam={handleSubmitQuestion}*/}
        {/*    course={props.course}*/}
        {/*    questions={questions}*/}
        {/*  />*/}
      </div>{' '}
    </div>
  )
}

export default ExamResult
