import { FC, useState } from "react";
import Day from "./day";
import { IDailyWeater } from "../../services/weather-service";

interface IWeekProps {
  dailyWeater: IDailyWeater[];
}
const Week: FC<IWeekProps> = ({dailyWeater}) => {
  const daily = dailyWeater.slice(0, 7);

  const [show, setShow] = useState<boolean>(true)
  return (
    <div className="week">
      <div className="week__nav">
        <button className={show ? "week__btn active" : "week__btn"} onClick={()=>setShow(true)}>На неделю</button>
        <button className={!show ? "week__btn active" : "week__btn"} onClick={()=>setShow(false)}>Отменить</button>
      </div>
      <div className={show ? "week__content active" : "week__content"}>
        {
          daily && daily.map((elem, index)=>{
            return <Day day={elem} key={elem.dt} index={index}/>
          })
        }
      </div>
    </div>
  )
}
export default Week;