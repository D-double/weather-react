import { FC } from "react";
import Current from "../current";
import { useAppSelector } from "../../store/hooks";
import { images } from "../../assets/image";
import Week from "../week";

const Main: FC = ()=>{
  const fullWeather = useAppSelector(state => state.weather.fullWeather)
  const loading = useAppSelector(state => state.weather.loading)
  const error = useAppSelector(state => state.weather.error)
  if (loading) {
    return (
      <div className="loading">
        <img src={images.loading} alt="" className="loading__img" />
      </div>
    )
  }
  if (error) {
    return (
      <div className="error">
        <h1>{error}</h1>
      </div>
    )
  }
  return (
    <>
      {fullWeather && <Current getFullWeather={fullWeather} />}
      <Week/>
    </>
  )
}
export default Main;