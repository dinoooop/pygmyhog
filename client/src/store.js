import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './project/projectSlice'
import authReducer from './auth/authSlice'

export default configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer
  }
})