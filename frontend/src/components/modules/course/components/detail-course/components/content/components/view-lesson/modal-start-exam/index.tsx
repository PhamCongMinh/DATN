import React, { useState } from 'react'
import { Input, message, Modal, Space, Typography, Upload, UploadProps } from 'antd'

import { useSelector } from 'react-redux'
import AxiosService from '../../../../../../../../../../utils/axios'

const { Text } = Typography

interface IProps {
  exam_id?: string
  is_open?: boolean
  onOk: () => void
  onCancel: () => void
}

const ModalStartExam: React.FC<IProps> = props => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [password, setPassword] = useState<string>('')

  const handleCancel = () => {
    props.onCancel()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleOk = async () => {
    try {
      const res = await axiosService.post(`exam-submit`, {
        exam_id: props?.exam_id,
        password: password
      })
      props.onOk()
      message.success('Bắt đầu bài thi')
    } catch (e) {
      message.error('Bắt đầu bài thi thất bại, vui lòng thử lại sau')
    }
  }

  return (
    <>
      <Modal title="Bắt đầu bài thi" open={props?.is_open} onOk={handleOk} onCancel={handleCancel} width={400}>
        <div>
          <Text>Nhập mật khẩu bài thi</Text>
          <Input onChange={e => handleChange(e)} placeholder="Nhập mật khẩu bài thi" />
        </div>
      </Modal>
    </>
  )
}

export default ModalStartExam
