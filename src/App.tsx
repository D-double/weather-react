import Header from './components/header';
import Main from './components/main';
// import WeatherService, {IGetWeather} from './services/weather-service';
import { useState } from 'react';
import { useAppDispatch } from "./store/hooks";
import { dataRequested, dataLoaded, dataError } from "./store/weather";
import { QueryKey, useQuery } from '@tanstack/react-query';
import weatherService, { IGetWeather }  from './services/weather-service';
function App() {
  // const [fullWeather, setFullWeather] = useState<IGetWeather | null>(null)
  const [city, setCity] = useState<string>('Tashkent');
  const dispatch = useAppDispatch()
  const query = useQuery<IGetWeather, Error, IGetWeather, QueryKey>({ queryKey: ['weather', city], queryFn:()=> weatherService.getWeather(city) })
  console.log(query);
  if (query.isLoading) {
    dispatch(dataRequested())
  } else if(query.data) {
    setTimeout(() => {
      dispatch(dataLoaded(query.data))
    }, 500);
  } else if(query.isError) {
    dispatch(dataError(query.error.message))
  }

  // useEffect(() => {
    // weather.getWeather(city)
    //   .then((resp) => {
    //     setTimeout(() => {
    //       dispatch(dataLoaded(resp))
    //     }, 1000);
    //     // setFullWeather(resp) 
    //   })
    //   .catch((reject: Error) => {
    //     dispatch(dataError(reject.message))
    //     console.log(reject);
    //   })
  // }, [city])

  return (
    <div className='container'>
      <Header setCity={setCity} />
      {query.data && <Main/>}
    </div>
  )
}

export default App
