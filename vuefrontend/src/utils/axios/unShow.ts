import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { getCard } from "@/utils/cookies/cookies";

export function unShow(id: number) {
    axios.post(
        'ExperiData/unshow/',
        {
            id: id,
            card: getCard()
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