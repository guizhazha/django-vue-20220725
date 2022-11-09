import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

export function getTodayInfo(day: string) {
    const timeList = day.split('-')
    const today = timeList[0].slice(2, 4) + timeList[1] + timeList[2]

    axios.post(
        'getTodayInfo/',
        {
            day: today
        }
    ).then(
        (response: AxiosResponse) => {
            dealResponse(response.data)
        }
    ).catch(
        (error: AxiosError) => {
            ElMessage.error(error)
        }
    )

    return ''
}

function dealResponse(responses: {[key:string]:string|number}[]) {
    for(const res of responses) {
        if(res['number'] !== 0) {
            console.log(res['description'])
        }
    }
}