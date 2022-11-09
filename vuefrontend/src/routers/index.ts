import { getName, getCard, removeName, removeCard } from "@/utils/cookies/cookies";

import { createRouter, createWebHistory } from 'vue-router'
import { enterRouter } from '@/routers/enter'
import { componentRouter } from '@/routers/component'

import { changeRoute } from '@/pinia/route'
import { addData } from '@/pinia/uploadData'
import { changeXRD } from '@/pinia/XRD'

const routers = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [...enterRouter, ...componentRouter]
})

// 路由前导
routers.beforeEach((to, from, next) => {
	if (to.path == '/login') {
		const route = changeRoute()
		const uploadData = addData()
		const XRD = changeXRD()

		removeName()
		removeCard()
		route.initRoute()
		uploadData.initUpload()
		XRD.initXRD()

		next()
	} else if (to.path == '/register') {
		next()
	} else if (getName() && getCard()) {
		next()
	} else {
		next('/login')
	}
})

export default routers;

