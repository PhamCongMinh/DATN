import { Space, Typography } from 'antd'
import styles from './style.module.scss'
import CustomForm from '../form'

const { Text } = Typography

export default function Search() {
  return (
    <Space className={styles.space}>
      <Typography>
        <Text className={styles.title}>
          Quality Rooms at <br />
          Wallet-Friendly Prices
        </Text>
      </Typography>
      <CustomForm />
    </Space>
  )
}
