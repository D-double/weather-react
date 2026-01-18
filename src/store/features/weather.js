import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLatLon = createAsyncThunk('weather/getLatLon', 
  async (city, thunkApi)=>{
    const {getState, dispatch, rejectWithValue} = thunkApi;
    try {
      const {key} = getState().weather
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
      const cityInfo = response.data[0]
      dispatch(getWeather(cityInfo))
      // console.log(cityInfo);      
    } catch (error) {
      return rejectWithValue(error)
    }
  })

  const getWeather = createAsyncThunk('weather/getWeather', 
    async (cityInfo, thunkApi)=>{
      const {getState, rejectWithValue} = thunkApi;
      try {
        const {key} = getState().weather
        const {lat, lon, local_names} = cityInfo;
        const response = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}&units=metric&lang=ru`);
        const weatherObj = {...response.data, name: local_names.ru}
        return weatherObj
      } catch (error) {
        return rejectWithValue(error)
      }
    })

const initialState = {
  key: 'fd0a6ca27d5cbf5772fec7ac633ae094',
  weather: null,
  isError: false
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {  },
  extraReducers: (builder)=>{
    builder.addCase(getLatLon.pending, (state)=>{
      state.isError = false
    })
    builder.addCase(getLatLon.rejected, (state, action)=>{
      // console.log(action.payload);
      state.isError = action.payload.message
    })
    builder.addCase(getWeather.pending, (state)=>{
      state.isError = false;
    })
    builder.addCase(getWeather.fulfilled, (state, action)=>{
      state.weather = action.payload
    })
    builder.addCase(getWeather.rejected, (state, action)=>{
      state.isError = action.payload.message
    })
  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = weatherSlice.actions

export default weatherSlice.reducer