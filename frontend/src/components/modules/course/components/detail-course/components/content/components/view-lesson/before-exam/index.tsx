import React, { useCallback, useEffect, useState } from 'react'
import { Breadcrumb, Button, Input, message, Modal, Space, Typography, Upload, UploadProps } from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import { ILesson } from '../../../../../../../../../../types/lesson'
import { IExam } from '../../../../../../../../../../types/exam'
import AxiosService from '../../../../../../../../../../utils/axios'
import Image from 'next/image'
import BackgroundImage3 from '../../../../../../../../../../assets/images/background-course3.png'
import DateIcon from '../../../../../../../../../../assets/icons/date.png'
import ModalStartExam from '../modal-start-exam'

const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  exam_id?: string
  onBack: () => void
}

const initialState: IExam = {}

const BeforeExam: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<IExam>(initialState)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)
  const [isStartExam, setStartExam] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get(`/exam/${props?.exam_id}`)
      const data = response.data
      setState(data)
      setLoading(false)
    }

    fetchData()
  }, [props?.exam_id])

  const handleStartExam = () => {
    setIsModalOpen(false)
  }

  const handleClickButton = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className={styles.space}>
        <Image src={BackgroundImage3} alt="House1" style={{ height: 450, width: 1200 }} />
        <div className={styles.header}>
          <Title className={styles.name}>{state?.name}</Title>
          <div className={styles.subheader}>
            <Text className={styles.summary}>
              {`Bài kiểm tra này có giới hạn thời gian. Để vượt qua kỳ thi này, bạn phải hoàn thành các câu hỏi trong thời gian cho phép. Sau khi bạn chọn Tôi đã sẵn sàng để bắt đầu bài kiểm tra tính giờ này, bạn sẽ có ${state.exam_time} minutes để hoàn thành và nộp bài thi. `}
              <br />
            </Text>
            <Space className={styles.space_date}>
              <div>
                <Space>
                  <Image src={DateIcon} alt="icon" className={styles.icon} />
                  <div>
                    <Text className={styles.date}>
                      Giờ bắt đầu
                      <br />
                    </Text>
                    <Space>
                      <Text className={styles.date}>{state?.start_time?.toString().split('.')[0]}</Text>
                    </Space>
                  </div>
                </Space>
              </div>
              <div style={{ marginLeft: 10 }}>
                <Space>
                  <Image src={DateIcon} alt="icon" className={styles.icon} />
                  <div>
                    <Text className={styles.date}>
                      Giờ kết thúc
                      <br />
                    </Text>
                    <Space>
                      <Text className={styles.date}>{state?.end_time?.toString().split('.')[0]}</Text>
                    </Space>
                  </div>
                </Space>
              </div>
            </Space>
            <Button onClick={handleClickButton} className={styles.button}>
              Bắt đầu vào thi
            </Button>
          </div>
        </div>
      </div>
      <ModalStartExam exam_id={props?.exam_id} onOk={handleStartExam} onCancel={handleCancel} is_open={isModalOpen} />
    </div>
  )
}

export default BeforeExam
