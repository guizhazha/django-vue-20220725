import { storeToRefs } from 'pinia'
import { getUserInfo } from '@/pinia/userInfo'
import { setName, setCard } from "@/utils/cookies/cookies";

const userInfo = getUserInfo()
const { role } = storeToRefs(userInfo)

export function isSuperManager(card: string) {
    if(card === 'superAdmin'){
        role.value = 'superAdmin'
        
        const expires = 15
        setName('superAdmin', expires)
        setCard('superAdmin', expires)

        return true
    }
}