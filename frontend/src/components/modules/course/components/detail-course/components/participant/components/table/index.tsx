import { message, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IParticipant } from '../../index'
import { EUserRole } from '../../../../../../../../../types/user'
import AxiosService from '../../../../../../../../../utils/axios'

interface DataType {
  _id: string
  email: string
  username?: string
  role: EUserRole
  numberPhone?: string
  zaloPhone?: string
  facebookUrl?: string
  avatarUrl?: string
  created_at: string
  updated_at: string
  status?: string
}

interface IProps {
  table?: IParticipant[]
  reload: () => void
}

const RentalNewsTable: React.FC<IProps> = (props): JSX.Element => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [tableData, setTableData] = useState<DataType[]>()

  console.log(props.table)
  console.log(tableData)

  useEffect(() => {
    if (!props.table) return
    setTableData(
      props.table.map((item: IParticipant) => {
        return {
          ...item,
          role: EUserRole.STUDENT,
          status: 'Hoạt động'
        }
      })
    )
  }, [props?.table])

  const handleChangeStatusNews = async (news: DataType) => {
    // const response = await axiosService.put(`/rent-out/${news._id}`, { status: 'rented' })
    // console.log(response)
    // message.success(`Sửa tin thành công`)
    // await props.reload()
  }
  const handleDeleteNews = async (news: DataType) => {
    // const response = await axiosService.delete(`/rent-out/${news._id}`)
    // console.log(response)
    // message.success(`Xóa tin thành công`)
    // await props.reload()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ và tên',
      dataIndex: 'username',
      key: 'username',
      render: text => <a>{text}</a>
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberPhone',
      key: 'numberPhone'
    },
    {
      title: 'Mạng xã hội',
      dataIndex: 'facebookUrl',
      key: 'facebookUrl'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <Tag color="geekblue" key={status}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={e => handleChangeStatusNews(record)}>Phê duyệt</a>
          <a onClick={e => handleDeleteNews(record)}>Xóa</a>
        </Space>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      style={{ maxHeight: 500, overflowY: 'scroll', minWidth: 1150, marginTop: 20 }}
    />
  )
}

export default RentalNewsTable
