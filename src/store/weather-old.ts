import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { IGetWeather } from '../services/weather-service';

export interface IWeatherState {
  fullWeather: null | IGetWeather;
  loading: boolean;
  error: null | string;
}

const initialState: IWeatherState = {
  fullWeather: null,
  loading: false,
  error: null
}

export const weatherState = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    dataRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    dataLoaded: (state, action: PayloadAction<IGetWeather>) => {
      state.loading = false;
      state.error = null;
      state.fullWeather = action.payload
    },
    dataError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.fullWeather = null;
    }
  }
})

export const { dataRequested, dataLoaded, dataError } = weatherState.actions

// Other code such as selectors can use the imported `RootState` type
export const selectWeater = (state: RootState) => state.weather.fullWeather

export default weatherState.reducer