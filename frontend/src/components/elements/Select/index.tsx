import { Select } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'
// import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/common/arrow-down.svg'
import styles from './style.module.scss'

interface Props extends SelectProps {
  value?: string
  options?: DefaultOptionType[]
  onChange?: (value: string) => void
  widthFull?: boolean
}

const CustomSelect = ({ value, onChange, widthFull, ...props }: Props) => {
  return (
    <div className={styles['select-container']}>
      <Select
        className={widthFull ? styles['w-full'] : undefined}
        popupClassName={styles['custom-select-popup']}
        suffixIcon={<div className={styles['icon-box']}>{/*<ArrowDownIcon />*/}</div>}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

export default CustomSelect
