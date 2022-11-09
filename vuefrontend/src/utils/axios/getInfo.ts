import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { getCard } from "@/utils/cookies/cookies";

import { getUserInfo } from '@/pinia/userInfo'

export function getInfo() {
    const userInfo = getUserInfo()

    axios.post(
        'getInfo/',
        {
            card: getCard()
        }
    ).then(
        (response: AxiosResponse) => {
            userInfo.setInfo(response.data)
        }
    ).catch(
        (error: AxiosError) => {
            console.log(error)
        }
    )
}