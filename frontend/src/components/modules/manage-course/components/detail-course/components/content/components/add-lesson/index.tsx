import React, { useState } from 'react'
import produce from 'immer'
import { UploadOutlined } from '@ant-design/icons'
import { serialize } from 'object-to-formdata'
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  Upload,
  UploadProps
} from 'antd'

import styles from './style.module.scss'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import VideoIcon from '../../../../../../../../../assets/icons/video.png'
import AssignmentIcon from '../../../../../../../../../assets/icons/assignment.png'
import AudioIcon from '../../../../../../../../../assets/icons/audio.png'
import TextIcon from '../../../../../../../../../assets/icons/text.png'
import PdfIcon from '../../../../../../../../../assets/icons/pdf.png'
import ExamIcon from '../../../../../../../../../assets/icons/exam.png'
import QuizIcon from '../../../../../../../../../assets/icons/quiz.png'
import SurveyIcon from '../../../../../../../../../assets/icons/survey.png'
import { LessonType } from '../../../../../../../../../types/lesson'
import AxiosService from '../../../../../../../../../utils/axios'

const { Dragger } = Upload

const { TextArea } = Input
const { Text } = Typography

interface IProps {
  open: boolean
  onOk: (type: LessonType) => void
  onCancel: () => void
  // setReload: () => void
  // openDetailCourse: (course: any) => void
}

interface ICreateRentalNews {}

const initialState: ICreateRentalNews = {}

const AddLesson: React.FC<IProps> = (props): JSX.Element => {
  const [state, setState] = useState<ICreateRentalNews>(initialState)
  const [image, setImage] = useState<any>()
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('multipart/form-data', jwt)

  const [lessonType, setLessonType] = useState<LessonType>(LessonType.pdf)
  const [isOpenLessonType, setIsOpenLessonType] = useState<boolean>(false)
  const [isOpenUploadLesson, setIsOpenUploadLesson] = useState<boolean>(false)

  const handleChooseLessonType = (type: LessonType) => {
    setLessonType(type)
    props.onOk(type)
  }

  return (
    <>
      <Modal
        title="Tạo bài học mới"
        style={{ fontSize: 30 }}
        open={props.open}
        onCancel={props.onCancel}
        centered
        width={1100}
      >
        <Text className={styles.title3} style={{ marginTop: 20 }}>
          Cung cấp nội dung học tập
          <br />
        </Text>

        <Space className={styles.space}>
          <div onClick={() => handleChooseLessonType(LessonType.video)}>
            <Space className={styles.mini_space}>
              <Image src={VideoIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  Video
                  <br />
                </Text>
                <Text className={styles.text}>Dễ dàng tải lên và hiển thị nội dung video</Text>
              </div>
            </Space>
          </div>
          <div onClick={() => handleChooseLessonType(LessonType.pdf)}>
            <Space className={styles.mini_space}>
              <Image src={PdfIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  PDF
                  <br />
                </Text>
                <Text className={styles.text}>
                  Dễ dàng tải lên nội dung PDF để sinh viên xem trong Trình phát khóa học
                </Text>
              </div>
            </Space>
          </div>
        </Space>

        <Space className={styles.space}>
          <div onClick={() => handleChooseLessonType(LessonType.text)}>
            <Space className={styles.mini_space}>
              <Image src={TextIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  Text
                  <br />
                </Text>
                <Text className={styles.text}>
                  Bao gồm nội dung văn bản, nội dung HTML theo kiểu, hình ảnh và liên kết bên ngoài
                </Text>
              </div>
            </Space>
          </div>
          <div onClick={() => handleChooseLessonType(LessonType.audio)}>
            <Space className={styles.mini_space}>
              <Image src={AudioIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  Audio
                  <br />
                </Text>
                <Text className={styles.text}>Hoàn hảo cho việc học khi đang di chuyển</Text>
              </div>
            </Space>
          </div>
        </Space>

        <Text className={styles.title3} style={{ marginTop: 20 }}>
          <br />
          Đánh giá học sinh của bạn
          <br />
        </Text>

        <Space className={styles.space}>
          <div onClick={() => handleChooseLessonType(LessonType.quiz)}>
            <Space className={styles.mini_space}>
              <Image src={QuizIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  Quiz
                  <br />
                </Text>
                <Text className={styles.text}>
                  Cho phép học sinh kiểm tra kiến thức của mình về những gì đã được dạy
                </Text>
              </div>
            </Space>
          </div>
          <div onClick={() => handleChooseLessonType(LessonType.survey)}>
            <Space className={styles.mini_space}>
              <Image src={SurveyIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  Survey
                  <br />
                </Text>
                <Text className={styles.text}>Kết hợp các phương thức phản hồi giữa bạn và học sinh</Text>
              </div>
            </Space>
          </div>
        </Space>

        <Space className={styles.space}>
          <div onClick={() => handleChooseLessonType(LessonType.assignment)}>
            <Space className={styles.mini_space}>
              <Image src={AssignmentIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  Assignment
                  <br />
                </Text>
                <Text className={styles.text}>
                  Tuyệt vời cho bất kỳ loại bài tập về nhà nào mà học sinh có thể gửi để phê duyệt
                </Text>
              </div>
            </Space>
          </div>
          <div onClick={() => handleChooseLessonType(LessonType.exam)}>
            <Space className={styles.mini_space}>
              <Image src={ExamIcon} alt="House1" style={{ width: 40, height: 40 }} />
              <div>
                <Text className={styles.title}>
                  Exam
                  <br />
                </Text>
                <Text className={styles.text}>Kiểm tra kiến thức khóa học</Text>
              </div>
            </Space>
          </div>
        </Space>
      </Modal>
    </>
  )
}

export default AddLesson
