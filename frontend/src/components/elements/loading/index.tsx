import { Spin } from 'antd'
import styles from './style.module.scss'
import { SpinProps } from 'antd/es/spin'

interface ISpin extends SpinProps {
  height?: number
}

export const Loading = ({ className, height, size = 'large', ...props }: ISpin) => {
  return (
    <div style={{ height: `${height}px` }} className={styles[`loading ${className}`]}>
      <Spin {...props} size={size} />
    </div>
  )
}
