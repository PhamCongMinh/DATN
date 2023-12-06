import { Select } from 'antd'
import { DefaultOptionType, SelectProps } from 'antd/es/select'
import { ReactComponent as ArrowDownIcon } from '../../../assets/icons/common/arrow-down.svg'
import './style.module.scss'

interface Props extends SelectProps {
  value?: string
  options?: DefaultOptionType[]
  onChange?: (value: string) => void
  widthFull?: boolean
}

const CustomSelect = ({ value, onChange, widthFull, ...props }: Props) => {
  return (
    <div className="select-container">
      <Select
        className={widthFull ? 'w-full' : undefined}
        popupClassName="custom-select-popup"
        suffixIcon={
          <div className="icon-box">
            <ArrowDownIcon />
          </div>
        }
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

export default CustomSelect
