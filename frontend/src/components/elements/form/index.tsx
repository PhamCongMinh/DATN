import { Button, Form, Image, Input, Space, Typography } from 'antd'
import styles from './style.module.scss'
import { SearchOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function CustomForm() {
  return (
    <Form name="basic" className={styles.form}>
      <Space direction={'vertical'}>
        <Text className={styles.title}>Tìm kiếm khóa học</Text>

        <Space>
          <Input placeholder="Từ khóa" style={{ height: 40, width: 470, marginLeft: 100 }} />
          <Button type="primary" htmlType="submit" className={styles.button} icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        </Space>
      </Space>
    </Form>
  )
}
