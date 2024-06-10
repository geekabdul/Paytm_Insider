import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  city: 'Pick Your City',
};
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export default citySlice.reducer;
export const {setCity} = citySlice.actions;
