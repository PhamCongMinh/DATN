import { Form, Input } from 'antd'
import { FormInstance } from 'antd/es/form'
import { FormItemProps } from 'antd/lib/form'
import { InputProps } from 'antd/lib/input'
import React, { useMemo, useRef } from 'react'
import CustomInput from '../Input'
import { TextAreaProps } from 'antd/es/input'
import styles from './style.module.scss'

interface ICustomFormItem extends FormItemProps<any> {
  form?: FormInstance<any>
  regexOnChange?: RegExp
  isRequired?: boolean
  inputProps?: InputProps
  inputRefValue?: string
  textAreaProps?: TextAreaProps
  mode?: 'default' | 'profile' | 'vertical'
}

const CustomFormItem: React.FC<ICustomFormItem> = ({
  form,
  regexOnChange,
  children,
  label,
  isRequired,
  inputProps,
  textAreaProps,
  inputRefValue = '',
  className,
  mode = 'default',
  ...props
}) => {
  const inputRef = useRef(inputRefValue)
  const { name } = props

  const renderChildren = useMemo(() => {
    const handleCheckValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (regexOnChange) {
        if (regexOnChange?.test(value)) {
          inputRef.current = value
          form?.setFieldValue(name ?? '', value)
        } else {
          if (value === '') {
            inputRef.current = value
            form?.setFieldValue(name ?? '', value)
            return
          }
          if (value.length === 1) inputRef.current = ''
          form?.setFieldValue(name ?? '', inputRef.current)
        }
      }
    }

    if (children) {
      return children
    }

    if (textAreaProps) {
      return (
        <Input.TextArea
          className="input-message"
          placeholder="Would you like to send a message with this offer?"
          autoSize={{ minRows: 5, maxRows: 5 }}
          onChange={handleCheckValue as any}
          {...textAreaProps}
        />
      )
    }

    return <CustomInput {...inputProps} onChange={handleCheckValue} />
  }, [children, textAreaProps, inputProps, regexOnChange, form, name])

  return (
    <Form.Item
      className={`form-item type-${mode} ${className}`}
      label={
        label ? (
          <p className="title">
            {label} {isRequired ? <span>*</span> : ''}
          </p>
        ) : undefined
      }
      {...props}
    >
      {renderChildren}
    </Form.Item>
  )
}

export default CustomFormItem
