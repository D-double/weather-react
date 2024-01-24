/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { IDailyWeater } from "../../services/weather-service";
import unix, {TimeType} from "../../utils/timestamp";
import { icons } from "../../assets/image";

interface DayProps {
  day: IDailyWeater,
  index: number
}

const Day: FC<DayProps> = ({day, index}) => {
  const icon = parseInt(day.weather[0].icon);
  //@ts-expect-error
  const iconImg = icons[icon];
  return (
    <div className="day">
      <h3 className="day__title">{
        index == 0 ? 'Сегодня' :
        index == 1 ? 'Завтра' : unix(day.dt, TimeType.weekday)
      }</h3>
      <p className="day__date">{unix(day.dt, TimeType.day)} {unix(day.dt, TimeType.month)}</p>
      <img src={iconImg} alt="" className="day__icon" />
      <p className="day__temp">{Math.round(day.temp.day)}°</p>
      <p className="day__night">{Math.round(day.temp.night)}°</p>
      <p className="day__desc">{day.weather[0].description}</p>
    </div>
  );
}

export default Day;