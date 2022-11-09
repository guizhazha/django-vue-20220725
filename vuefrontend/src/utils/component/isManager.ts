import { getCard } from "@/utils/cookies/cookies";

export function isManager() {
    const card = getCard()
    if(card === '3') {
        return true
    } else {
        return false
    }
}