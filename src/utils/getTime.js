export default function getTime(dt, type) {
    const milsec = dt * 1000;
    const currentDate = new Date(milsec);
    const minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()
    const result = type == 'hours' ? currentDate.getHours() : 
                type == 'min' ? minutes :
                type == 'weekday' ? currentDate.toLocaleDateString('ru-Ru', {weekday: 'short'}) :
                type == 'month' ? currentDate.toLocaleDateString('ru-Ru', {month: 'short'}) :
                type == 'day' ? currentDate.toLocaleDateString('ru-Ru', {day: 'numeric'}) :
                '';
    return result
}