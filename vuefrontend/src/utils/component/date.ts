export function getToday() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()

    const dealYear = year % 100
    let dealMonth;
    if (month / 10 > 1) {
        dealMonth = Array(0).join("0") + month
    } else {
        dealMonth = Array(1).join("0") + month
    }
    let dealDay;
    if (day / 10 > 1) {
        dealDay = Array(0).join("0") + day
    } else {
        dealDay = Array(1).join("0") + day
    }
    return dealYear + dealMonth + dealDay
}