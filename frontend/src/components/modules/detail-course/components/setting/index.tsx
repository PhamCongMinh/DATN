import React from 'react'
import { Collapse, Typography } from 'antd'
import type { CollapseProps } from 'antd'

import styles from './style.module.scss'

const { Text, Title } = Typography

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Giới thiệu',
    children: <p>{text}</p>
  },
  {
    key: '2',
    label: 'Bài học số 1',
    children: <p>{text}</p>
  },
  {
    key: '3',
    label: 'Bài học số 2',
    children: <p>{text}</p>
  },
  {
    key: '4',
    label: 'Bài học số 3',
    children: <p>{text}</p>
  }
]

export default function CourseSetting() {
  return (
    <div className={styles.content}>
      <Collapse accordion items={items} />
    </div>
  )
}
