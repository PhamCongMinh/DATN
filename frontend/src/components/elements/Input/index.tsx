import { Input, InputProps } from 'antd'
import './style.module.scss'
import { useMemo } from 'react'

export interface CustomInputProps extends InputProps {
  className?: string
  widthFull?: boolean
  allowNegative?: boolean
}
const CustomInput = ({ className, widthFull, allowNegative = true, ...restProps }: CustomInputProps) => {
  const InputComponent = useMemo(() => {
    if (restProps.type === 'password') {
      return Input.Password
    }
    return Input
  }, [restProps.type])

  return (
    <div className={'input-box ' + className}>
      {allowNegative ? (
        <InputComponent className={`input-default input-default ${widthFull ? 'w-full' : ''}`} {...restProps} />
      ) : (
        <InputComponent
          className={`input-default input-default ${widthFull ? 'w-full' : ''}`}
          pattern="^\d*(\.\d{0,2})?$"
          onInput={e => {
            if (!e.currentTarget.validity.valid) {
              e.currentTarget.value = ''
            }
          }}
          {...restProps}
        />
      )}
    </div>
  )
}

export default CustomInput
