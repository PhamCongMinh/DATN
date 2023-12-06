import { Spin } from 'antd'
import './style.module.scss'
import { SpinProps } from 'antd/es/spin'

interface ISpin extends SpinProps {
  height?: number
}

export const Loading = ({ className, height, size = 'large', ...props }: ISpin) => {
  return (
    <div style={{ height: `${height}px` }} className={`loading ${className}`}>
      <Spin {...props} size={size} />
    </div>
  )
}
