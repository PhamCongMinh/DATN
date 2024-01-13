import { Tooltip, TooltipProps } from 'antd'
import styles from './style.module.scss'

type ICustomTooltip = {
  children: React.ReactNode
  className?: string
} & TooltipProps

const CustomTooltip = ({ children, className = '', ...props }: ICustomTooltip) => {
  return (
    <Tooltip overlayClassName={styles[`default-tooltip ${className}`]} {...props}>
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
