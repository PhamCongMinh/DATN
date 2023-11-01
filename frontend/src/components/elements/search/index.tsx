import { Space, Typography } from 'antd'
import styles from './style.module.scss'
import CustomForm from '../form'

const { Text } = Typography

export default function Search() {
  return (
    <div className={styles.space}>
      <Typography style={{ textAlign: 'center' }}>
        <Text className={styles.title}>
          Advance your skills and
          <br />
        </Text>
        <Text className={styles.title}>career with online courses</Text>
      </Typography>
      <CustomForm />
    </div>
  )
}
