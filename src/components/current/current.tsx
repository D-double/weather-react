/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { images, icons } from '../../assets/image';
import unix, {TimeType} from "../../utils/timestamp";
import { ICurrentWeather } from "../../services/weather-service";

function windName(deg: number): string {
  let name = '';
  if (deg >= 0 && deg < 45 || deg > 315 && deg <= 360) {
    name = 'северный'
  }
  else if (deg >= 45 && deg < 135) {
    name = 'восточный'
  }
  else if (deg >= 135 && deg < 225) {
    name = 'южный'
  }
  else {
    name = 'западный'
  }
  return name;
}

interface ICurrentProps {
  current: ICurrentWeather,
  localName: string
}
const Current: FC<ICurrentProps> = ({current, localName}) => {
  const windDeg = windName(current.wind_deg)
  const icon = parseInt(current.weather[0].icon);
  //@ts-expect-error
  const iconImg = icons[icon];
  return (
    <div className="current">
      <div className="current__info">
        <p className="current__deg">{Math.round(current.temp)}°</p>
        <p className="current__day">Сегодня</p>
        <p className="current__time">Время: {unix(current.dt, TimeType.hours)}:{unix(current.dt, TimeType.minutes)}</p>
        <p className="current__city">Город: {localName}</p>
        <img src={iconImg} alt="" className="current__img" />
      </div>
      <div className="current__content">
        <div className="current__card">
          <div className="current__icon">
            <img src={images.temp} alt="" />
          </div>
          <p className="current__name">Температура</p>
          <p className="current__desc">{Math.round(current.temp)}° - ощущается как {Math.round(current.feels_like)}°</p>
        </div>
        <div className="current__card">
          <div className="current__icon">
            <img src={images.pressure} alt="" />
          </div>
          <p className="current__name">Давление</p>
          <p className="current__desc">{current.pressure} мм ртутного столба</p>
        </div>
        <div className="current__card">
          <div className="current__icon">
            <img src={images.precipitation} alt="" />
          </div>
          <p className="current__name">Осадки</p>
          <p className="current__desc">{current.humidity} %</p>
        </div>
        <div className="current__card">
          <div className="current__icon">
            <img src={images.wind} alt="" />
          </div>
          <p className="current__name">Ветер</p>
          <p className="current__desc">{current.wind_speed} м/с {windDeg} ветер</p>
        </div>
      </div>
    </div>
  )
}

export default Current