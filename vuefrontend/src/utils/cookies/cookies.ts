// npm install js-cookie --save
// npm install --save @types/js-cookie
import Cookies from "js-cookie";

export const nameKey = 'name'
export const cardKey = 'card'

export function setName(name: string, cookieExpires: number) {
    if (cookieExpires == 0) {
        return Cookies.set(nameKey, name)
    } else {
        const curDate = new Date()
        curDate.setTime(curDate.getTime() + 24 * 60 * 60 * 1000 * cookieExpires)
        return Cookies.set(nameKey, name, { expires: curDate })
    }
}
export function setCard(card: string, cookieExpires: number) {
    if (cookieExpires == 0) {
        return Cookies.set(cardKey, card)
    } else {
        const curDate = new Date()
        curDate.setTime(curDate.getTime() + 24 * 60 * 60 * 1000 * cookieExpires)
        return Cookies.set(cardKey, card, { expires: curDate })
    }
}

export function getName() {
    return Cookies.get(nameKey)
}
export function getCard() {
    return Cookies.get(cardKey)
}

export function removeName() {
    return Cookies.remove(nameKey)
}
export function removeCard() {
    return Cookies.remove(cardKey)
}
