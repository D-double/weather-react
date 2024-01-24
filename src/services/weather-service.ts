/* eslint-disable no-useless-catch */
import axios, {AxiosResponse} from 'axios';

interface ICityInfo {
  lat: number;
  lon: number; 
  local_names: {
    ru: string
  }
}


interface ICurrentWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: [
    { icon: string}
  ]
}

export interface IDailyWeater {
  dt: number;
  temp: {
    day: number,
    night: number
  },
  weather: [
    {
      description: string,
      icon: string
    }
  ]
}

export interface IFullWeather {
  current: ICurrentWeather,
  daily: IDailyWeater[]
}

export interface IGetWeather extends IFullWeather {
  name: string  
}


class WeatherService {
  private apiKey: string = 'fd0a6ca27d5cbf5772fec7ac633ae094';

  async getWeather(city: string = 'Tashkent'): Promise<IGetWeather>{
    try {
      //https://www.dhiwise.com/post/exploring-the-possibilities-of-axios-with-typescript
      const response: AxiosResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${this.apiKey}`);
      if (response.status != 200) {
       throw new Error(response.statusText);
      }
      const cityInfo: ICityInfo = response.data[0];
      // console.log(cityInfo);
      const {lat, lon, local_names } = cityInfo;
      const responseWeather: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${this.apiKey}&units=metric&lang=ru`);
      if (responseWeather.status != 200) {
       throw new Error(responseWeather.statusText);
      }
      const weather: IFullWeather = responseWeather.data;
      // console.log(weather);
      return { ...weather, name: local_names.ru }
    } catch (error) {
      throw error;
    }
  }
  
}

export default new WeatherService()