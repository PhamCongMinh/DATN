import { createSlice } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/src/types/types-external'

export interface AuthState {
  user?: {
    jwt?: string
    userId?: string
    email?: string
    username?: string
    role?: string
    numberPhone?: string
  }
}

const initialState: AuthState = {}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload
    },

    logOut: (state: WritableDraft<AuthState>) => {
      state.user = {}
    },
    updateProfile: (state, action) => {
      state.user = action.payload
    },
    extraReducers: (builder: any) => {}
  }
})

export const authSliceActions = {
  ...AuthSlice.actions
}

export default AuthSlice.reducer
