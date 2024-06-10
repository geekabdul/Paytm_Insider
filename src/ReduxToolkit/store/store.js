import {configureStore} from '@reduxjs/toolkit';
import cityReducer from '../slices/citySlice';
export const store = configureStore({
  reducer: {
    city: cityReducer,
  },
});
