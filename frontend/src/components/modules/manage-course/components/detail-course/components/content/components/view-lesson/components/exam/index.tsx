import React, { useEffect, useState } from 'react'
import { Button, Input, message, Modal, Space, Tabs, Typography, Upload, UploadProps } from 'antd'

import { useSelector } from 'react-redux'
import { ILesson } from '../../../../../../../../../../../types/lesson'
import Exam from './preview'
import ViewLesson from '../../index'
import ExamResult from './result'
import BarChart from './statistic'
import styles from './style.module.scss'
import StudentAchievementChart from './statistic'
import AxiosService from '../../../../../../../../../../../utils/axios'
import { IChart } from '../../../../../../../../../../../types/chart'
const { Dragger } = Upload

const { TextArea } = Input
const { Text, Title } = Typography

interface IProps {
  exam_id?: string
  onSubmit?: () => void
  onBack?: () => void
}

const initial: IChart = {}

const MenuExam: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<IChart>(initial)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState(true)

  const onChange = (key: string) => {
    console.log(key)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get(`/exam-score/exam/chart/${props?.exam_id}`)
      const data = response.data
      setState(data)
      setLoading(false)
    }

    fetchData()
  }, [props?.exam_id])
  console.log('chartData', state)

  return (
    <>
      <Tabs
        style={{ marginTop: 15 }}
        onChange={onChange}
        type="card"
        items={[
          {
            label: `Xem bài thi`,
            key: '1',
            children: <Exam exam_id={props?.exam_id} onBack={props.onBack} />
          },
          {
            label: `Kết quả thi`,
            key: '2',
            children: <ExamResult exam_id={props?.exam_id} onBack={props.onBack} />
          },
          {
            label: `Thống kê`,
            key: '3',
            children: (
              <div className={styles.statistic}>
                <Text style={{ marginLeft: 50 }}>Điểm số đã quy đổi</Text>
                <StudentAchievementChart data={state.scoreChartData} />
                <Text style={{ marginLeft: 50 }}>Số câu trả lời đúng</Text>
                <StudentAchievementChart data={state.correctAnswerChartData} />
                <Text style={{ marginLeft: 50 }}>Tổng điểm câu hỏi</Text>
                <StudentAchievementChart data={state.totalPointChartData} />
              </div>
            )
          }
        ]}
      />
    </>
  )
}

export default MenuExam
