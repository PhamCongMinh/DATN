import { Button, ButtonProps } from 'antd'
import React from 'react'
import styles from './style.module.scss'

interface IButtonOutlinedProps extends ButtonProps {
  mode?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  btnType?: 'default' | 'text-dark' | 'base'
  height?: number
}

const ButtonOutlined: React.FC<IButtonOutlinedProps> = ({
  className,
  children,
  mode = 'large',
  btnType = 'default',
  fullWidth,
  height,
  ...props
}) => {
  return (
    <Button
      style={{ height: `${height}px` }}
      className={styles[`outlined-default ${className || ''} type-${btnType} btn-${mode} ${fullWidth ? 'w-full' : ''}`]}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonOutlined
