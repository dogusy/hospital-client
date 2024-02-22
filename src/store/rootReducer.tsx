import { combineReducers } from '@reduxjs/toolkit';
import hospitalReducer from '../features/hospitalSlice';
import appointmentSlice from '../features/appointmentSlice';
const rootReducer = combineReducers({
  hospital: hospitalReducer,
  appointment: appointmentSlice

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
