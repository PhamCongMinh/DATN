import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { RentNews } from '../../../../../../../types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../../../utils/axios'

interface DataType {
  _id: string
  title: string
  pricePerMonth: number
  area: number
  address: string
  owner: string
  rentNewsType: string
  status: string
}

interface IProps {
  table?: RentNews[]
  reload: () => void
}

const RentalNewsTable: React.FC<IProps> = (props): JSX.Element => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [tableData, setTableData] = useState<DataType[]>()

  useEffect(() => {
    if (!props.table) return
    setTableData(
      props.table.map((e: RentNews) => {
        const newData: DataType = {
          _id: e._id,
          title: e.title,
          pricePerMonth: e.pricePerMonth,
          area: e.area,
          address: e.specificAddress,
          owner: e.ownerId.username,
          rentNewsType: e.rentNewsType,
          status: e.status
        }
        return newData
      })
    )
  }, [props.table])

  const handleDeleteNews = async (news: DataType) => {
    const response = await axiosService.delete(`/rent-out/${news._id}`)
    console.log(response)
    await props.reload()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>
    },
    {
      title: 'Giá cho thuê',
      dataIndex: 'pricePerMonth',
      key: 'pricePerMonth'
    },
    {
      title: 'Diện tích',
      dataIndex: 'area',
      key: 'area'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Người đăng tin',
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: 'Loại tin',
      dataIndex: 'rentNewsType',
      key: 'rentNewsType'
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
          <a onClick={e => handleDeleteNews(record)}>Xóa</a>
        </Space>
      )
    }
  ]

  return <Table columns={columns} dataSource={tableData} style={{ maxHeight: 500, overflowY: 'scroll' }} />
}

export default RentalNewsTable
