<template>
	<el-collapse 
		v-model="activeName"
		@change="handleChange"
		accordion
		>
		<div v-for="(response, index) in routeData[dataType]" :key="index">
			<el-collapse-item :title="response.dataName" :name="index">
				<h2>{{t("deal.dataState")}}</h2>
				<h3>{{t("deal.isSU")}}{{ response.isSuccess }}</h3>
				<h3 v-if="!response.isSuccess">{{t("deal.error")}}{{ response.message }}</h3>
				<h3 v-else>
					{{t("deal.rank")}}
					<el-rate
						@change="sendRank(response.dataName, response.rank)"
						v-model="response.rank"
						:texts="[t('deal.rank1'), t('deal.rank2'), t('deal.rank3'), t('deal.rank4'), t('deal.rank5')]"
						show-text/>
				</h3>

				<h2>{{t("deal.nameInfo")}}</h2>
				<h3>{{t("deal.testTime")}}{{ response.testTime }}</h3>
				<h3>{{t("deal.proId")}}{{ response.processId }}</h3>
				<h3>{{t("deal.samId")}}{{ response.sampleId }}</h3>

				<h2>{{t("deal.expInfo")}}</h2>
				<h3>{{t("deal.xAxis")}}{{ response.xAxisName }}</h3>
				<h3>{{t("deal.yAxis")}}{{ response.yAxisName }}</h3>
			</el-collapse-item>
		</div>
	</el-collapse>
</template>

<script lang="ts" setup>
import { sendRank } from '@/utils/axios/sampleAxios'

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = changeRoute()
const { dataType, routeData } = storeToRefs(route)


const activeName = ref(0)
const handleChange = (value: number) => {
	console.log('value', value)
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/collapse.scss";
</style>
  