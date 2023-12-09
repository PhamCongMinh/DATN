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
import { Button } from 'antd'
import dayjs from 'dayjs'
import AddQuestionModal from './add-question-modal'
import NotiModal from 'components/elements/noti-modal'
import { MenuProps } from 'antd/lib'
import cx from 'classnames'
import {
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
import { ICourse } from '../../../course'
import { parseUrlToJson2 } from '../../../../../utils/url'
import { RentNews } from '../../../../../types'
import AxiosService from '../../../../../utils/axios'
import * as url from 'url'
import TrashIcon from '../../../../../assets/icons/trash.png'
import EditIcon from '../../../../../assets/icons/edit.png'
import Image from 'next/image'

export const DATE_FORMAT_FULL = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

const QuestionBank: NextPage = () => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const user = useSelector((state: any) => state.auth?.user)
  const [questions, setQuestions] = useState<IQuestion[]>()
  const [reload, setReload] = useState<boolean>(false)

  const [isAddEvent, setIsAddEvent] = useState(false)
  const [isEditEvent, setIsEditEvent] = useState(false)
  const [isRemove, setIsRemove] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<IQuestion>()
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
    const query = {
      course_id: '65744526ef7e3dff88526be7'
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

  // const { data: meetingList, isFetching } = useGetMeetingListQuery({
  //   limit: 10,
  //   page: currentPage,
  //   sort_by: MeetingSortBy.CREATED_AT,
  //   direction: MeetingSortDirection.DESC,
  //   time_filter: timeFilter,
  //   event_filter: eventFilter,
  //   search_filter: searchString
  // })

  // const totalItem = meetingList?._metadata?.total_item
  // const totalPage = meetingList?._metadata?.total_page

  // const [createConference] = useCreateConferenceMutation()
  // const [removeConference] = useRemoveConferenceMutation()
  // const [updateConference] = useUpdateConferenceMutation()

  const handleSubmitEvent = async () => {
    // try {
    //   form.validateFields()
    //   const formStates = form.getFieldsValue(true)
    //
    //   const missMeetingData: ConferencePrams = {
    //     eventName: formStates.event,
    //     location: formStates.location,
    //     eventType: formStates.eventType,
    //     hostedBy: formStates.hostedBy,
    //     startDate: moment(formStates.startDate).format(DATE_FORMAT_FULL),
    //     endDate: moment(formStates.endDate).format(DATE_FORMAT_FULL),
    //     organizerURL: formStates.organizerURL,
    //     lat: String(formStates.lat),
    //     lng: String(formStates.lng),
    //     country: formStates.country,
    //     city: formStates.city
    //   }
    //   if (isEditEvent && currentEvent) {
    //     await updateConference({
    //       id: currentEvent?.id,
    //       body: missMeetingData
    //     }).unwrap()
    //     setIsEditEvent(false)
    //     setNotiModal({
    //       ...notiModal,
    //       isOpen: true,
    //       text: 'Successfully submit the event based on your recommendation and info given'
    //     })
    //   } else {
    //     await createConference(missMeetingData).unwrap()
    //     setIsAddEvent(false)
    //     setNotiModal({
    //       ...notiModal,
    //       isOpen: true,
    //       text: 'Successfully submit the event based on your recommendation and info given'
    //     })
    //   }
    // } catch (error) {
    //   setIsAddEvent(false)
    //   setNotiModal({
    //     ...notiModal,
    //     isOpen: true,
    //     type: 'failed',
    //     text: 'Your submission was failed, please try it again later'
    //   })
    // }
  }

  const handleSearch = debounce(setSearchString, 500)

  const handleRemoveEvent = async () => {
    // try {
    //   if (currentEvent) {
    //     await removeConference({ conferenceId: currentEvent.id })
    //     toast.success('Event deleted')
    //     const meetingListLength = meetingList?.data?.length
    //     if (meetingListLength && meetingListLength === 1 && currentPage > 1) {
    //       setCurrentPage(currentPage - 1)
    //     }
    //   }
    // } catch (error) {
    //   toast.error('Delete event failed')
    // }
    // setIsRemove(false)
  }

  interface DataType {
    key: React.Key
    name: string
    age: number
    address: string
  }

  const columns: ColumnsType<IQuestion> = [
    {
      title: 'Question Name',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend'],
      // sortIcon: () => <SortIcon />,
      render: (_, record: IQuestion) => <span className={styles['table-event limit-text']}>{record.title}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record: IQuestion) => (
        <div className={styles['table-organiser']}>
          <p className={styles['table-organiser-name limit-text']}>{record.status}</p>
        </div>
      )
    },
    {
      title: 'Question type',
      dataIndex: 'type',
      render: (_, record: IQuestion) => (
        <span className={styles['table-location']}>
          {/*<DotIcon />*/}
          <span className={styles['location whitespace-nowrap']}>{record.type}</span>
        </span>
      )
    },
    {
      title: 'Difficulty level',
      dataIndex: 'difficulty_level',
      render: (_, record: IQuestion) => (
        <div className={styles['table-organiser']}>
          <p className={styles['table-organiser-name limit-text']}>{record.difficulty_level}</p>
        </div>
      )
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      render: (_, record: IQuestion) => <span className={styles['table-sources']}>{record.comment}</span>
    },
    {
      title: 'Author Id',
      dataIndex: 'author_id',
      render: (_, record: IQuestion) => <span className={styles['table-sources']}>{record.author_id}</span>
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      render: (_, record: IQuestion) => (
        <span className={styles['table-created-date whitespace-nowrap']}>
          {dayjs(record?.created_at).format('D MMM YYYY').toString()}
        </span>
      )
    },
    {
      title: 'Updated Date',
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
              setCurrentEvent(record)
              setIsRemove(true)
            }}
            icon={<Image src={TrashIcon} alt="House1" style={{ height: 19, width: 17 }} />}
          />
          <Button
            onClick={() => {
              setCurrentEvent(record)
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

  const items: MenuProps['items'] = [
    { key: EventFiter.UPCOMING, label: 'Upcomming Event' },
    { key: EventFiter.PAST, label: 'Past Event' }
  ].map(item => ({
    key: item.key,
    label: (
      <span
        onClick={() => {
          if (item.key === eventFilter) {
            setEventFilter(undefined)
          } else {
            setEventFilter(item.key)
          }
        }}
        className={styles[`filter-option ${eventFilter === item.key ? 'filter-active' : ''}`]}
      >
        {item.label}
      </span>
    )
  }))

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
              setIsAddEvent(true)
              setIsEditEvent(false)
              setCurrentEvent(undefined)
            }}
            btnType="green"
            height={40}
          >
            Add Event/Meeting
          </ButtonContained>
        </div>
      </div>
      <TableCustom
        className={styles['meeting-table']}
        rowSelection={rowSelection}
        onSearch={handleSearch}
        loading={false} //{isFetching} //TODO
        columns={columns}
        // filterOptions={items}
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
          data={currentEvent}
          form={form}
          open={isAddEvent || isEditEvent}
          onCancel={() => {
            setIsAddEvent(false)
            setIsEditEvent(false)
            setCurrentEvent(undefined)
          }}
          handleAddEvent={handleSubmitEvent}
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
      </>
    </div>
  )
}

export default QuestionBank
