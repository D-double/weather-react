import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface IWeatherState {
  city: string;
}

const initialState: IWeatherState = {
  city: 'Tashkent',
}

export const weatherState = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    dataCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  }
})

export const { dataCity } = weatherState.actions

// Other code such as selectors can use the imported `RootState` type
export const city = (state: RootState) => state.weather.city

export default weatherState.reducer