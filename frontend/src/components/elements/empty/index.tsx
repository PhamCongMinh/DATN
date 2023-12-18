import React from 'react'
// import { ReactComponent as EmptyNotiIcon } from 'assets/icons/layout/emtyNoti.svg'
import styles from './style.module.scss'

interface ICustomInterface {
  icon?: React.ReactNode
  text?: string
}

const CustomEmpty = ({ icon, text }: ICustomInterface) => {
  return (
    <div className={styles['custom-empty']}>
      <div className={styles['custom-empty-icon']}>{icon}</div>
      <span className={styles['custom-empty-text']}>{text || 'There are no records to be displayed'}</span>
    </div>
  )
}

export default CustomEmpty
