import React, { useEffect, useState } from 'react'
import produce from 'immer'
import { UploadOutlined } from '@ant-design/icons'
import { serialize } from 'object-to-formdata'
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps
} from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { ValueType } from '@rc-component/mini-decimal'
import { ISection } from '../../../../../../../../../types/section'
import { ICourse } from '../../../../../../index'
import AxiosService from '../../../../../../../../../utils/axios'

const { Dragger } = Upload

const { TextArea } = Input
const { Text } = Typography

interface IProps {
  section?: ISection
  course: ICourse
  open: boolean
  onOk: () => void
  onCancel: () => void
  // setReload: () => void
  // openDetailCourse: (course: any) => void
}

const initialState: ISection = {}

const AddSection: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<ISection>(initialState)
  const [image, setImage] = useState<any>()
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)

  useEffect(() => {
    setState({
      ...state,
      course_id: props.course._id
    })
  }, [props.course])

  useEffect(() => {
    if (props?.section) setState(props?.section)
  }, [props?.section])

  const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement> | ValueType | null) => {
    setState((prev: ISection) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = key === 'order' ? Number(e) : e.target.value
      })
    )
  }

  const handleSubmit = async () => {
    if (!props?.section) {
      // Create new section
      try {
        const response = await axiosService.post('/course/section', state)
        console.log(response)
        message.success(`Thêm chương thành công`)
        props.onOk()
        setState({
          course_id: props.course._id
        })
      } catch (error) {
        alert('Thêm chương thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
        console.log(error)
      }
    } else {
      // Edit section
      try {
        const response = await axiosService.put(`/course/section/${state._id}`, state)
        console.log(response)
        message.success(`Sửa chương thành công`)
        props.onOk()
        setState({
          course_id: props.course._id
        })
      } catch (error) {
        alert('Sửa chương thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
        console.log(error)
      }
    }
  }

  return (
    <>
      <Modal
        title="Tạo nội dung mới"
        open={props.open}
        onOk={handleSubmit}
        onCancel={props.onCancel}
        centered
        // width={1000}
      >
        <Text className={styles.title3} style={{ marginTop: 20 }}>
          Tên nội dung
          <br />
        </Text>
        <Input value={state?.name} onChange={e => handleChange('name', e)} />
        <Text className={styles.title3} style={{ marginTop: 20 }}>
          Thứ tự
          <br />
        </Text>
        <InputNumber value={state?.order} onChange={e => handleChange('order', e)} />
      </Modal>
    </>
  )
}

export default AddSection
