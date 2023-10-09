import { Button, Col, Input, Row, Typography } from 'antd'
import AxiosService from '../../../../../../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'
import { useState } from 'react'
import { authSliceActions } from '../../../../../../../store/auth/authSlice'
import { IAuth } from '../../../../../signin/components/subcontent'

const { Text } = Typography

export interface IEditProfile {
  username?: string
  numberPhone?: string
  password?: string
}

export default function EditAccountForm() {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const dispatch = useDispatch()
  const [state, setState] = useState<IEditProfile>({})

  const handleChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: IEditProfile) =>
      produce(prev, draft => {
        // @ts-ignore
        draft[key] = e.target.value
      })
    )
  }

  const onSubmit = async () => {
    try {
      const sendData = {}
      Object.entries(state).forEach(([key, value]) => {
        if (value !== '') {
          // @ts-ignore
          sendData[key] = state[key]
        }
      })
      const response = await axiosService.post('/auth/update-account', sendData)
      const newProfile: IAuth = {
        jwt: jwt,
        userId: response.data._id,
        email: response.data.email,
        username: response.data.username,
        numberPhone: response.data.numberPhone,
        role: response.data.role
      }
      dispatch(authSliceActions.updateProfile(newProfile))
    } catch (error) {
      alert('Mật khẩu mới quá yếu hoặc thông tin không hợp lệ')
      console.log(error)
    }
  }

  return (
    <div>
      <Text>
        Tên hiển thị <br />
      </Text>
      <Input style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }} onChange={e => handleChange('username', e)} />
      <Text>
        <br />
        Số điện thoại
        <br />
      </Text>
      <Input
        style={{ maxWidth: 300, marginBottom: 20, marginTop: 10 }}
        onChange={e => handleChange('numberPhone', e)}
      />
      <Text>
        <br />
        Mật khẩu
        <br />
      </Text>
      <Input style={{ maxWidth: 300, marginBottom: 30, marginTop: 10 }} onChange={e => handleChange('password', e)} />
      <br />
      <Button type="primary" onClick={onSubmit}>
        Cập nhật
      </Button>
    </div>
  )
}
