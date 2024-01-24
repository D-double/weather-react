export enum TimeType {
  weekday = 'weekday',
  month = 'month',
  day = 'day', 
  hours = 'hours',
  minutes = 'minutes'
}

function unix (dt: number, type: TimeType): string { 
  const milsec = dt * 1000;
  const date = new Date(milsec);
  let min: number | string = date.getMinutes();
  min = min < 10 ? '0' + min : min.toString();
  const result: string  = 
    type == TimeType.weekday ? date.toLocaleString('ru-RU', {weekday: 'short'}) :
    type == TimeType.month ? date.toLocaleString('ru-RU', {month: 'long'}) :
    type == TimeType.day ? date.toLocaleString('ru-RU', {day: 'numeric'}) : 
    type == TimeType.hours ? date.getHours().toString() :
    type == TimeType.minutes ? min : ''
  return result;
}

export default unix;