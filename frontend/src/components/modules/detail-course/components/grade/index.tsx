import React, { useEffect, useState } from 'react'
import { Breadcrumb, Divider, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

import styles from './style.module.scss'
import RentalNewsTable from './components/table'
import Contact from './components/contact'
import AxiosService from '../../../../../utils/axios'
import { useSelector } from 'react-redux'
import { RentNews } from '../../../../../types'

const { Text } = Typography
export default function Grade() {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [tableData, setTableData] = useState<RentNews[]>()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get('/rent-out')
      setTableData(response.data)
    }
    fetchData().catch(console.error)
    setLoading(false)
  }, [isLoading])

  const handleReload = () => {
    setLoading(true)
    console.log('reload')
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
        <Breadcrumb.Item>Điểm số</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>
        Điểm số
        <br />
      </Text>
      {/*<Divider style={{ width: 1300 }}></Divider>*/}
      <RentalNewsTable table={tableData} reload={handleReload} />
    </div>
  )
}
