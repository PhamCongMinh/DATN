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
export default function ManagementRentalNews() {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [tableData, setTableData] = useState<RentNews[]>()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get('/rent')
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
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <UserOutlined />
          <span>Quản lý</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách tin đăng</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>Quản lí tin đăng</Text>
      <Divider style={{ width: 1350 }}></Divider>
      <RentalNewsTable table={tableData} reload={handleReload} />
      <Contact />
    </div>
  )
}
