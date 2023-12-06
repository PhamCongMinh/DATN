import { DatePicker, DatePickerProps } from 'antd'
import styles from './style.module.scss'
import { ReactComponent as CelanderIcon } from 'assets/icons/common/celander-field.svg'

type ICustomDatePicker = {
  dpSize?: 'large' | 'medium' | 'small'
  prefixIcon?: string
  className?: string
} & DatePickerProps
/* eslint-disable react/prop-types */
const CustomDatePicker: React.FC<ICustomDatePicker> = ({ dpSize = 'medium', prefixIcon, className, ...props }) => {
  return (
    <div className="date-picker-container">
      <DatePicker
        className={styles[`${className} default-date-picker date-picker-${dpSize}`]}
        popupClassName="default-popup-dp"
        {...props}
      />
      <span className={styles[`date-icon date-picker-icon-${dpSize}`]}>
        {prefixIcon ? prefixIcon : <CelanderIcon />}
      </span>
    </div>
  )
}

export default CustomDatePicker
