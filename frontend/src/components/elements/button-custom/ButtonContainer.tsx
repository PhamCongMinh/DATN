import { Button, ButtonProps } from 'antd'
import React from 'react'
import styles from './style.module.scss'

interface IButtonContainedProps extends ButtonProps {
  mode?: 'large' | 'medium' | 'small'
  fullWidth?: boolean
  btnType?: 'default' | 'dark' | 'green'
  height?: number
}

const ButtonContained: React.FC<IButtonContainedProps> = ({
  className,
  children,
  mode = 'large',
  fullWidth,
  height,
  btnType = 'default',
  ...props
}) => {
  return (
    <Button
      style={{ height: `${height}px` }}
      className={
        styles[`contained-default ${className || ''} btn-${mode} type-${btnType} ${fullWidth ? 'w-full' : ''}`]
      }
      {...props}
    >
      {children}
    </Button>
  )
}

export default ButtonContained
