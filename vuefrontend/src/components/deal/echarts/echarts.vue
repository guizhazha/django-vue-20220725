<template>
	<el-checkbox-group
		v-model="routeCheck[dataType].checkName"
		@change="handleCheck"
		>
		<div v-for="echart, index in routeEchart[dataType]" :key="index" class="response">
			<el-checkbox :label="echart.dataName" border >{{index + 1}}</el-checkbox>
			<div :id="'echart' + index" />
			{{ plot(echart, index) }}
			
			<el-table 
				v-if="dataType === 'JV'" 
				:data="echart.table"
				>
				<el-table-column prop="scan" :label="t('deal.scan')"/>
				<el-table-column prop="Jsc" label="Jsc"/>
				<el-table-column prop="Voc" label="Voc"/>
				<el-table-column prop="FF" label="FF"/>
				<el-table-column prop="Eff" label="Eff"/>
			</el-table>
		</div>
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

import { nextTick } from 'vue'
import * as echarts from 'echarts'
import Option from '@/utils/deal/option/Option'
import JVoption from '@/utils/deal/option/JVoption'
import IPCEoption from '@/utils/deal/option/IPCEoption'
import ABSoption from '@/utils/deal/option/ABSoption'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = changeRoute()
const { dataType, routeEchart, routeData, routeCheck } = storeToRefs(route)

const plot = (echart: {[key:string]: string|number[]}, index: number) => {
	nextTick(() => {
		setTimeout(()=>{
			const myEcharts = echarts.init(document.getElementById('echart' + index), undefined, { renderer: 'svg' })
		
			if(dataType.value === 'JV') {
				const option = new JVoption(echart)
				myEcharts.setOption(option.getJVoption())
			} else if(dataType.value === 'IPCE') {
				const option = new IPCEoption(echart)
				myEcharts.setOption(option.getIPCEoption())
			} else if (dataType.value === 'ABS') {
				const option = new ABSoption(echart)
				myEcharts.setOption(option.getABSoption())
			} else {
				const option = new Option(echart)
				myEcharts.setOption(option.getOption())
			}
		}, 500)
	})
}

const handleCheck = (value: string[]) => {
	// value的值是上方label的值
	const checkedCount = value.length
	const allCount = routeData.value[dataType.value].length
	
	const isCheck = checkedCount === allCount
	const isInde = checkedCount > 0 && checkedCount < allCount
	route.setRouteCheckBoolean(isCheck, isInde)
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base/size.scss";
@import "@/assets/scss/echart.scss";
.response {
	display: inline-block;
	padding-bottom: map-get($length, size-6);
}
</style>
