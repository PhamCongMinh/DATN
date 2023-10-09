import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { AuthSlice } from './auth/authSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      [AuthSlice.name]: AuthSlice.reducer
    },
    devTools: true
  })

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
