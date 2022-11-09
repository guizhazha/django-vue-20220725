<template>
    <el-row>
        <el-col :lg="8" :sm="12" :xs="24" class="upload-xrd">
            <div :id="'echart' + row.id" class="echart"/>
            {{ plot(row, row.id) }}
        </el-col>
        <el-col :lg="8" :sm="12" :xs="24" v-if="dataType === 'JV'">
            <el-table :data="row.table">
                <el-table-column prop="scan" :label="t('deal.scan')"/>
                <el-table-column prop="Jsc" label="Jsc"/>
                <el-table-column prop="Voc" label="Voc"/>
                <el-table-column prop="FF" label="FF"/>
                <el-table-column prop="Eff" label="Eff"/>
            </el-table>
        </el-col>
        <el-col :lg="dataType === 'JV' ? 8: 16" :sm="12" v-if="row.file !== '请上传对应的工艺文件'">
            <el-scrollbar height="300px">
                {{ row.file }}
            </el-scrollbar>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

import { defineProps ,nextTick } from 'vue'
import * as echarts from 'echarts'

import EchartShowData from '@/utils/show/echart/EchartShowData'
import Option from '@/utils/deal/option/Option'
import JVoption from '@/utils/deal/option/JVoption'
import IPCEoption from '@/utils/deal/option/IPCEoption'
import ABSoption from '@/utils/deal/option/ABSoption'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    row: {
        type: EchartShowData,
        required: true
    }
})

const route = changeRoute()
const { dataType } = storeToRefs(route)

const plot = (response: EchartShowData, index: number) => {
    nextTick(() => {
        const myEcharts = echarts.init(document.getElementById('echart' + index), null, { renderer: 'svg' })
    
        if(dataType.value === 'JV') {
            const option = new JVoption(response)
            myEcharts.setOption(option.getJVoption())
        } else if(dataType.value === 'IPCE') {
            const option = new IPCEoption(response)
            myEcharts.setOption(option.getIPCEoption())
        } else if (dataType.value === 'ABS') {
            const option = new ABSoption(response)
            myEcharts.setOption(option.getABSoption())
        } else {
            const option = new Option(response)
            myEcharts.setOption(option.getOption())
        }
	})
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/echart.scss";
</style>