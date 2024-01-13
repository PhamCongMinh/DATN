import React, { useState, useEffect } from 'react'
import { Card, Statistic, Row, Col, Button, Typography, CountdownProps } from 'antd'
import moment from 'moment'
import styles from './style.module.scss'

const { Countdown } = Statistic

interface IProps {
  deadline: number
  onFinish: () => void
}

const CountdownTimer: React.FC<IProps> = (props): JSX.Element => {
  const onFinish: CountdownProps['onFinish'] = () => {
    console.log('finished!')
    props.onFinish()
  }

  return (
    <div>
      <Countdown value={props.deadline} onFinish={onFinish} className={styles.countdown} />
    </div>
  )
}

export default CountdownTimer
