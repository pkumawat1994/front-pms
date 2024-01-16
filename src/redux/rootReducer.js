import { combineReducers } from 'redux'
import AdminAuthSlice from './allSlices/adminSlices/AdminAuthSlice'
import EmployeeSlice from './allSlices/adminSlices/EmployeeSlice'

export const rootReducer = combineReducers({
  adminAuth: AdminAuthSlice,
  Employee:EmployeeSlice

})