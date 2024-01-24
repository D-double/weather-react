import { useQuery } from "@tanstack/react-query";
import weatherService from "../services/weather-service";

const query = useQuery<IGetWeather, Error, IGetWeather, QueryKey>({ queryKey: ['weather', city], queryFn:()=> weatherService.getWeather(city) })
  console.log(query);