import { useQuery } from "@tanstack/react-query";
import weatherService from "../services/weather-service";
import { useAppSelector } from "../store/hooks";

export const useWeather = ()=>{
  const city = useAppSelector(state => state.weather.city)
  return useQuery({ 
    queryKey: ['weather', city], 
    queryFn:()=> weatherService.getWeather(city),
    // staleTime: 5000,
  })

}