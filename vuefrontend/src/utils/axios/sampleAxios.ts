import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { getCard } from "@/utils/cookies/cookies";

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'
import { getUserInfo } from '@/pinia/userInfo'
import { ElMessage } from 'element-plus'

export function sendPassword(card: string) {
    axios.post(
        'sendPassword/',
        {
            card: card
        }
    ).then(
        (response: AxiosResponse) => {
            ElMessage.info(response.data)
        }
    ).catch(
        (error: AxiosError) => {
            ElMessage.error(error)
        }
    )
}

export function sendRank(name: string, rank: string) {
    const route = changeRoute()
    const { dataType } = storeToRefs(route)

	axios.post(
		'ExperiData/updateRank/',
		{
			card: getCard(),
			dataType: dataType.value,
			dataName: name,
			rank: rank
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

export function changePublicStatus (id: number, isPublic: boolean) {
    axios.post(
		'ExperiData/updatePublic/',
		{
			id: id,
            isPublic: isPublic
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

export function changeManager(card: string) {
	axios.post(
		'changeManager/',
		{
			card: card
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

export function changePhone() {
	const userInfo = getUserInfo()
	const { phone } = storeToRefs(userInfo)
	axios.post(
		'changePhone/',
		{
			card: getCard(),
			phone: phone.value
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

export function changeEmail() {
	const userInfo = getUserInfo()
	const { email } = storeToRefs(userInfo)
	axios.post(
		'changeEmail/',
		{
			card: getCard(),
			email: email.value
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

export function changePassword() {
	const userInfo = getUserInfo()
	const { password } = storeToRefs(userInfo)
	axios.post(
		'changePassword/',
		{
			card: getCard(),
			password: password.value
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