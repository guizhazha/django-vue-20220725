<template>
    <div class="sub-image-info">
        <h3>
            {{t("deal.matName")}}
            <el-input 
                v-model="XRDImages.dataName[index]" 
                :placeholder="t('deal.matName')" 
                clearable 
                />
        </h3>
        <h3>
            {{t("deal.submit")}}
            <el-button 
                icon="Promotion"
                type="text"
                @click="uploadSubXRD" />
        </h3>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

import { reservexList } from '@/utils/deal/reservexList'

import { storeToRefs } from 'pinia'
import { changeXRD } from '@/pinia/XRD'
import { changeRoute } from '@/pinia/route'

import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const XRD = changeXRD()
const { XRDImages } = storeToRefs(XRD)

const props = defineProps({
    index: {
        type: Number,
        required: true
    }
})

const route = changeRoute()
const uploadSubXRD = () => {
    const xAxisBegin = XRDImages.value.axis.xAxisBegin
    const xAxisEnd = XRDImages.value.axis.xAxisEnd

    ElMessage.info('务必核实横坐标的刻度值！！！')
    if (typeof xAxisBegin === 'undefined' || typeof xAxisEnd === 'undefined') {
        ElMessage.error('请填写横坐标首尾值！！！')
        return
    }
    
    const reg = /^[0-9]*$/
    if (!reg.test(xAxisBegin as string) || !reg.test(xAxisEnd as string)) {
        ElMessage.error('横坐标首尾值不是数字！！！')
        return
    }

    if (Number(xAxisBegin) - Number(xAxisEnd) >= 0) {
        console.log(Number(xAxisBegin))
        console.log(Number(xAxisEnd))
        ElMessage.error('横坐标首值大于尾值！！！')
        return
    }

    const dataName = XRDImages.value.dataName[props.index]
    if (dataName.length === 0) {
        ElMessage.error('填写材料名！！！')
        return
    }
    
    const xAxisName = XRDImages.value.axis.xAxisName as string
    const yAxisName = XRDImages.value.axis.yAxisName as string
    const yList = XRDImages.value.XYList[props.index].yList
    const response = {
        dataName: dataName,
        xAxisName: xAxisName,
        yAxisName: yAxisName,
        xList: reservexList(props.index),
        yList: yList
    }
    route.setRouteEchart(response)
}
</script>

<style scoped lang="scss">
</style>