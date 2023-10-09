import React, { useCallback, useState } from 'react'
import produce from 'immer'
import { useDispatch } from 'react-redux'
import { Button, Form, Input, Space, Typography } from 'antd'
import AxiosService from '../../../../../utils/axios'
import { authSliceActions } from '../../../../../store/auth/authSlice'

import styles from './style.module.scss'
import { useRouter } from 'next/router'

const { Text } = Typography

interface ISignInForm {
  email: string
  password: string
}

export interface IAuth {
  jwt: string
  userId: string
  email: string
  username: string
  numberPhone: string
  role: string
}

const initialState: ISignInForm = {
  email: '',
  password: ''
}

export default function SignInForm() {
  const [state, setState] = useState<ISignInForm>(initialState)
  const axiosService = new AxiosService('application/json')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleChange = useCallback((key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: ISignInForm) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      const response = await axiosService.post('/auth/login', state)
      const userData: IAuth = {
        jwt: response.data.access_token,
        userId: response.data._id,
        email: response.data.email,
        username: response.data.username,
        numberPhone: response.data.numberPhone,
        role: response.data.role
      }

      // @ts-ignore
      if (response.statusCode === 200) {
        dispatch(authSliceActions.logIn(userData))
      }

      router.push('/rent')
    } catch (error) {
      alert('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
      console.log(error)
    }
  }, [state, dispatch, router])

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
          <Text className={styles.title2}>ĐĂNG NHẬP</Text>
        </Form.Item>

        <Form.Item>
          <Input placeholder="Email" onChange={e => handleChange('email', e)} />
        </Form.Item>

        <Form.Item>
          <Input.Password placeholder="Mật khẩu" onChange={e => handleChange('password', e)} />
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
