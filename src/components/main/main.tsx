import { FC } from "react";
import Current from "../current";
import { images } from "../../assets/image";
import Week from "../week";
import { useWeather } from "../../hooks/useWeather";

const Main: FC = ()=>{
  const {isLoading, isError, error, data} = useWeather();
  if (isLoading) {
    return (
      <div className="loading">
        <img src={images.loading} alt="" className="loading__img" />
      </div>
    )
  }
  else if (isError) {
    return (
      <div className="error">
        <h1>{error.message}</h1>
      </div>
    )
  }
  if(data){
    return (
      <>
        <Current current={data.current} localName={data.name}/>
        <Week dailyWeater={data.daily}/>
      </>
    )
  }
}
export default Main;