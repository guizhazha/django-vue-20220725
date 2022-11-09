<template>
    <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :show-file-list="false"
        :on-change="onChange"
        >
        <h3>{{ dataType }}{{t("deal.exp")}}</h3>
        <h5>{{t("deal.expRule1")}}</h5>
        <el-icon><UploadFilled /></el-icon>
        <h5>{{t("deal.expRule2")}}</h5>
        <h6>{{t("deal.rule")}}</h6>
        <h6>{{t("deal.expTip")}}</h6>
    </el-upload>
</template>

<script lang="ts" setup>
import type { UploadFile, UploadFiles } from 'element-plus'
import { online } from '@/utils/axios/online'

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

import EchartData from '@/utils/deal/echart/EchartData'
import JVechart from '@/utils/deal/echart/JVechart'
import IPCEechart from '@/utils/deal/echart/IPCEechart'
import ABSechart from '@/utils/deal/echart/ABSechart'
import TypeData from '@/utils/deal/upload/TypeData'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = changeRoute()
const { dataType } = storeToRefs(route)
const onChange = (uploadData: UploadFile, uploadFiles: UploadFiles) => {
    if (uploadData.status !== 'ready') return
    online(uploadData.name, '数据正在被处理')

    if (dataType.value === 'JV') {
        const echartData = new JVechart(uploadData)
        route.setRouteEchart(echartData)
    } else if (dataType.value === 'IPCE') {
        const echartData = new IPCEechart(uploadData)
        route.setRouteEchart(echartData)
    } else if (dataType.value === 'ABS') {
        const echartData = new ABSechart(uploadData)
        route.setRouteEchart(echartData)
    } else {
        const echartData = new EchartData(uploadData)
        route.setRouteEchart(echartData)
    }

    const typeData = new TypeData(uploadData)
    route.setRouteData(typeData)
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/upload.scss";
</style>