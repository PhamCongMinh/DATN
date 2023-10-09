import React, { useCallback, useState } from 'react'
import produce from 'immer'
import { serialize } from 'object-to-formdata'
import { Button, Form, Input, Select, Space, Typography } from 'antd'
import { AxiosService } from '../../../../../utils/axios'

import styles from './style.module.scss'
import { RentNewsType } from '../../../../../types'

const { Text } = Typography

export enum Role {
  HOST = 'host',
  RENTER = 'renter',
  ADMIN = 'admin'
}

interface ISignUpForm {
  username: string
  email: string
  numberPhone: string
  password: string
  role: Role
}

const initialState: ISignUpForm = {
  username: '',
  email: '',
  numberPhone: '',
  password: '',
  role: Role.RENTER
}
export default function SignUpForm() {
  const [state, setState] = useState<ISignUpForm>(initialState)
  const axiosService = new AxiosService('application/json')

  const handleChange = useCallback((key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: ISignUpForm) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }, [])

  const handleSelectRentNewsType = (value: string) => {
    setState(prev =>
      produce(prev, draft => {
        // @ts-ignore
        draft['role'] = value
      })
    )
  }

  const handleSubmit = useCallback(async () => {
    try {
      const response = await axiosService.post('/auth/register', state)
      console.log(response)
      alert('Đăng kí thành công, vui lòng trở lại trang đăng nhập để tiếp tục')
      window.location.href = '/signin'
    } catch (error) {
      alert('Đăng kí thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }, [state])

  return (
    <Space className={styles.space}>
      <Typography>
        <Text className={styles.title}>
          Quality Rooms at <br />
          Wallet-Friendly Prices
        </Text>
      </Typography>
      <Form name="basic" className={styles.form}>
        <Form.Item style={{ textAlign: 'center' }}>
          <Text className={styles.title2}>ĐĂNG KÍ</Text>
        </Form.Item>
        <Form.Item>
          <Input placeholder="Họ và tên" onChange={e => handleChange('username', e)} />
        </Form.Item>

        <Form.Item>
          <Input placeholder="Email" onChange={e => handleChange('email', e)} />
        </Form.Item>

        <Form.Item>
          <Input placeholder="Số điện thoại" onChange={e => handleChange('numberPhone', e)} />
        </Form.Item>

        <Form.Item>
          <Input.Password placeholder="Mật khẩu" onChange={e => handleChange('password', e)} />
        </Form.Item>

        <Form.Item>
          <Select
            defaultValue="renter"
            className={styles.select}
            onChange={handleSelectRentNewsType}
            value={state?.role}
            options={[
              { value: Role.RENTER, label: 'Người thuê trọ' },
              { value: Role.HOST, label: 'Chủ trọ' }
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.button} onClick={handleSubmit}>
            Bắt đầu
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}
