import React from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import { Divider, Rate, Space, Typography } from 'antd'
import AvatarImage from '../../../../../assets/images/avatar.png'
import { CommentType } from '../../../../../types'

import styles from './style.module.scss'

const { Text } = Typography

interface IProps {
  commentData: CommentType
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

const Comments: NextPage<IProps> = props => {
  return (
    <Space className={styles.container}>
      <div>
        <Image src={AvatarImage} alt="avatar" className={styles.avatar} />
        <Text>
          <br />
          {props.commentData.ownerId.username}
        </Text>
      </div>
      <div>
        <Rate tooltips={desc} disabled value={props.commentData.rate} />
        <br />
        <Text className={styles.text}>{props.commentData.content}</Text>
      </div>
    </Space>
  )
}

export default React.memo(Comments)
