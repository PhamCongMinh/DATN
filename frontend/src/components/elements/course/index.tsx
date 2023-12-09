import Image from 'next/image'
import { Button, Space, Typography } from 'antd'
import CourseImage from '../../../assets/images/course.png'
import RentOutImage from '../../../assets/images/image_introduction_rentout.png'

import styles from './style.module.scss'
import Paragraph from 'antd/lib/typography/Paragraph'

const { Text, Title } = Typography

interface IProps {
  name?: string
  tag?: string
  status?: string
  author?: string
  onClick: () => void
}

const Course: React.FC<IProps> = (props): JSX.Element => {
  const { name, tag, status, author } = props

  return (
    <div style={{ textAlign: 'center' }} onClick={props.onClick}>
      <div className={styles.space}>
        <Image src={CourseImage} alt="CourseImage" style={{ width: 280, height: 200 }} />
        <div className={styles.container}>
          <Title ellipsis={{ rows: 1 }} className={styles.title}>
            {name}
          </Title>
          <Text className={styles.price}>
            {tag}
            <br />
          </Text>
          <Text className={styles.text}>
            {status}
            <br />
          </Text>
          <Text className={styles.text}>
            {author}
            <br />
          </Text>
          <Button className={styles.button}>Xem khóa học</Button>
        </div>
      </div>
    </div>
  )
}

export default Course
