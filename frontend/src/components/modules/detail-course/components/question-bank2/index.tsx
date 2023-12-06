import { ColumnsType } from 'antd/es/table'
import ButtonOutlined from 'components/elements/ButtonCustom/ButtonOutlined'
import TableCustom from 'components/elements/Table'
// import { ReactComponent as ImportIcon } from 'assets/icons/meeting/import.svg'
// import { ReactComponent as PlusIcon } from 'assets/icons/meeting/plus.svg'
// import { ReactComponent as SortIcon } from 'assets/icons/meeting/sortArrowIcon.svg'
// import { ReactComponent as DotIcon } from 'assets/icons/meeting/dot.svg'
// import { ReactComponent as TrashIcon } from 'assets/icons/meeting/trash.svg'
// import { ReactComponent as EditIcon } from 'assets/icons/meeting/edit.svg'
import DefaultOrganier from 'assets/icons/meeting/organiser.png'
import React, { useState } from 'react'
import styles from './style.module.scss'
import ButtonContained from 'components/elements/ButtonCustom/ButtonContainer'
import { Button } from 'antd'
import dayjs from 'dayjs'
import AddMeetingModal from './AddMeetingModal'
import NotiModal from 'components/elements/NotiModal'
import { MenuProps } from 'antd/lib'
import cx from 'classnames'
import {
  ConferencePrams,
  EventFiter,
  IConference,
  MeetingSortBy,
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
import RemovedModal from 'components/elements/RemovedModal'
import { useForm } from 'antd/es/form/Form'
import moment from 'moment'
import { toast } from 'react-toastify'
import { NextPage } from 'next'

export const DATE_FORMAT_FULL = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]'

const Meeting: NextPage = () => {
  const [isAddEvent, setIsAddEvent] = useState(false)
  const [isEditEvent, setIsEditEvent] = useState(false)
  const [isRemove, setIsRemove] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<IConference>()
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

  const columns: ColumnsType<IConference> = [
    {
      title: 'Event Name',
      dataIndex: 'event',
      key: 'event',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend'],
      // sortIcon: () => <SortIcon />,
      render: (_, record: IConference) => <span className="table-event limit-text">{record.conference_name}</span>
    },
    {
      title: 'Organiser',
      dataIndex: 'organiser',
      key: 'organiser',
      render: (_, record: IConference) => (
        <div className="table-organiser">
          <p className="table-organiser-name limit-text">{record.cme_provider}</p>
        </div>
      )
    },
    {
      title: 'Meeting Venue',
      dataIndex: 'location',
      render: (_, record: IConference) => (
        <span className="table-location">
          {/*<DotIcon />*/}
          <span className="location whitespace-nowrap">
            {record.city || '--'}, {record.country || '--'}
          </span>
        </span>
      )
    },
    {
      title: 'Organiser URL',
      dataIndex: 'sources',
      render: (_, record: IConference) => (
        <a href={record.cme_course_webpage_url} target="_blank" className="table-sources text-sources" rel="noreferrer">
          {record.cme_course_webpage_url}
        </a>
      )
    },
    {
      title: 'Medical Field',
      dataIndex: 'type',
      render: (_, record: IConference) => <span className="table-sources">{record.profession}</span>
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      render: (_, record: IConference) => (
        <span className="table-envent-date whitespace-nowrap">
          {dayjs(record?.start_date).format('D MMM YYYY').toString()}
        </span>
      )
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      render: (_, record: IConference) => (
        <span className="table-created-date whitespace-nowrap">
          {dayjs(record?.end_date).format('D MMM YYYY').toString()}
        </span>
      )
    },
    {
      dataIndex: 'action',
      render: (_, record: IConference) => (
        <span className="table-action">
          <Button
            className="trash-btn"
            type="link"
            onClick={() => {
              setCurrentEvent(record)
              setIsRemove(true)
            }}
            // icon={<TrashIcon />}
          />
          <Button
            onClick={() => {
              setCurrentEvent(record)
              setIsEditEvent(true)
              setIsAddEvent(false)
            }}
            className="edit-btn"
            type="link"
            // icon={<EditIcon />}
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
        className={`filter-option ${eventFilter === item.key ? 'filter-active' : ''}`}
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
            Meeting & Event Listing
            <span className={styles['total']}> in Total</span>
          </h1>
          <h2 className={styles['head-text-subtitle']}>Keep track of meeting & event around you</h2>
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
        filterOptions={items}
        dataSource={[]} //{meetingList?.data || []} // TODO
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
        <AddMeetingModal
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

export default Meeting
