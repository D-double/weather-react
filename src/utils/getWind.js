export default function getWind(deg) {
    let name = '';
    if ((deg > 315 && deg <= 360) || (deg >= 0 && deg < 45)) {
        name = 'север'
    } 
    else if (deg >= 45 && deg < 135) {
        name = 'восток'
    }
    else if (deg >= 135 && deg < 225) {
        name = 'юг'
    }
    else {
        name = 'запад'
    }
    return name
}