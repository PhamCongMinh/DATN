import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'

import styles from './style.module.scss'
import RentalNewsTable from './components/table'
import AxiosService from '../../../../../utils/axios'
import { useSelector } from 'react-redux'
import { ICourse } from '../../../course'
import { NextPage } from 'next'
import { EUserRole } from '../../../../../types/user'

const { Text } = Typography

type IProps = {
  course: ICourse
}

export type IParticipant = {
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
}

const Participant: NextPage<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [tableData, setTableData] = useState<IParticipant[]>()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get(`/course/${props.course._id}/participants`)
      setTableData(response.data)
    }
    fetchData().catch(console.error)
    setLoading(false)
  }, [isLoading, props.course._id])

  const handleReload = () => {
    setLoading(true)
    console.log('reload')
  }

  return (
    <div className={styles.content}>
      {/*<Divider style={{ width: 1300 }}></Divider>*/}
      <RentalNewsTable table={tableData} reload={handleReload} />
    </div>
  )
}

export default Participant
