import Image from 'next/image'
import styles from './style.module.scss'
import { Breadcrumb, Button, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { NextPage } from 'next'
import { BlogType } from '../../../../../../../types'
import { IDiscuss } from '../../index'

const { Text, Title } = Typography

type IProps = {
  discuss: IDiscuss
  handleClickBack: () => void
}

const DetailDiscussContent: NextPage<IProps> = props => {
  const { discuss } = props
  return (
    <div style={{ marginLeft: 200, marginTop: 25 }}>
      <Text className={styles.title1}>
        {discuss.title}
        <br />
      </Text>
      <div>
        <pre className={styles.text} style={{ width: 800, whiteSpace: 'initial' }}>
          {discuss.content}
        </pre>
      </div>
    </div>
  )
}

export default React.memo(DetailDiscussContent)
