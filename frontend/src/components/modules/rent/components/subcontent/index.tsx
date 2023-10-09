import { List, Typography } from 'antd'
import { listArea, subContentTitle } from '../../../../../constants/rent.constants'

import styles from './style.module.scss'

const { Text, Title } = Typography

export default function SubContent() {
  return (
    <div className={styles.container}>
      <div className={styles.sub_filter}>
        <Title className={styles.title}>{subContentTitle}</Title>
        <List
          itemLayout="horizontal"
          dataSource={listArea}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="http://localhost:3000/rent">
                    <Text className={styles.text}>{item.title}</Text>
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
