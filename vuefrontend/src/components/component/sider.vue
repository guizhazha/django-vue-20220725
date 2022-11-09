<template>
	<el-menu 
		unique-opened="true"
		:default-active="onRoutes"
		router="true"
		:collapse="isFold"
		>
		<el-menu-item index="/">
			<el-icon><location /></el-icon>
			<template #title>
				<span>{{t('components.home')}}</span>
			</template>
		</el-menu-item>

		<el-sub-menu index="2">
			<template #title>
				<el-icon><EditPen /></el-icon>
				<span>{{t('components.deal')}}</span>
			</template>
			<el-menu-item index="/deal/JV">{{t('components.uploadJV')}}</el-menu-item>
			<el-menu-item index="/deal/XRD">{{t('components.uploadXRD')}}</el-menu-item>
			<el-menu-item index="/deal/IPCE">{{t('components.uploadIPCE')}}</el-menu-item>
			<el-menu-item index="/deal/PL">{{t('components.uploadPL')}}</el-menu-item>
			<el-menu-item index="/deal/ABS">{{t('components.uploadABS')}}</el-menu-item>
		</el-sub-menu>

		<el-sub-menu index="3">
			<template #title>
				<el-icon><FolderOpened /></el-icon>
				<span>{{t('components.show')}}</span>
			</template>
			<el-menu-item index="/show/JV">{{t('components.dataJV')}}</el-menu-item>
			<el-menu-item index="/show/XRD">{{t('components.dataXRD')}}</el-menu-item>
			<el-menu-item index="/show/IPCE">{{t('components.dataIPCE')}}</el-menu-item>
			<el-menu-item index="/show/PL">{{t('components.dataPL')}}</el-menu-item>
			<el-menu-item index="/show/ABS">{{t('components.dataABS')}}</el-menu-item>
		</el-sub-menu>

		<el-sub-menu index="4">
			<template #title>
				<el-icon><Tools /></el-icon>
				<span>{{t('components.baseInfo')}}</span>
			</template>
			<el-menu-item index="/staff">{{t('components.staff')}}</el-menu-item>
			<el-menu-item index="/setting" v-if="role !== 'superAdmin'">{{t('components.setting')}}</el-menu-item>
			<el-menu-item index="/login">{{t('components.lagout')}}</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'
import { clickButton } from '@/pinia/button'
import { getUserInfo } from '@/pinia/userInfo'

import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const button = clickButton()
const { isFold } = storeToRefs(button)
const userInfo = getUserInfo()
const { role } = storeToRefs(userInfo)
const route = useRoute()
const routes = changeRoute()
const onRoutes = computed(() => {
	routes.setRoute(route.path)
	routes.setRouteName(route.meta.title)
	return route.path
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/base/size.scss";
.el-menu {
	height: calc(100vh - $header-height);
	width: $sider-fold-width;

	&:not(.el-menu--collapse) {
		width: $sider-unfold-width;
	}

	.el-sub-menu {
		.el-menu-item {
			display: flex;
			justify-content: flex-end;
			padding-right: 2em;
		}
	}
}
</style>