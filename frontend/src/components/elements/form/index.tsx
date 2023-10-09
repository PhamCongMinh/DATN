import { Button, Form, Image, Input, Typography } from 'antd'
import styles from './style.module.scss'
import { SearchOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function CustomForm() {
  return (
    <Form name="basic" className={styles.form}>
      <Form.Item style={{ textAlign: 'center' }}>
        <Text className={styles.title}>Tìm kiếm phòng trọ</Text>
      </Form.Item>
      <Form.Item>
        <Input placeholder="Địa điểm" />
      </Form.Item>

      <Form.Item>
        <Input placeholder="Chọn giá" />
      </Form.Item>

      <Form.Item>
        <Input placeholder="Diện tích" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.button} icon={<SearchOutlined />}>
          Tìm kiếm
        </Button>
      </Form.Item>
    </Form>
  )
}
