import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { getCard } from "@/utils/cookies/cookies";

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'
import { getToday } from '@/utils/component/date'


export function online(name: string, describe: string) {
    const route = changeRoute()
    const { dataType } = storeToRefs(route)

    axios.post(
        'OnlineData/online/',
        {
            userInfo: getCard(),
            datatype: dataType.value,
            fileName: name,
            createdAt: getToday(),
            describe: describe
        }
    ).then(
        (response: AxiosResponse) => {
            console.log()
        }
    ).catch(
        (error: AxiosError) => {
            console.log()
        }
    )
}