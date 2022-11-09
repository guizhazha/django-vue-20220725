<template>
    <el-tooltip
            effect="light"
            :content="t('deal.analyse')"
            placement="right"
            >
        <el-button @click="selectCheckPlot" circle>
            <el-icon><DataAnalysis /></el-icon>
        </el-button>
    </el-tooltip>

    <el-dialog 
        v-model="dialogVisible"
        width="700px"
        draggable
        modal="false"
        append-to-body
        >
        <template #header="{ close }">
            <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
                Close
            </el-button>
            <input />
        </template>

        <div ref="selectCheck"/>
    </el-dialog>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { nextTick, ref, defineProps } from 'vue'

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

import Options from '@/utils/deal/options/Options'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    checkData: {
        type: [],
        required: true
    }
})

const route = changeRoute()
const { dataType } = storeToRefs(route)

const dialogVisible = ref(false)
const selectCheck = ref()

const selectCheckPlot = () => {
    dialogVisible.value = true
    const checkData = props.checkData
    
    nextTick(() => {
        const myEchartsall = echarts.init(selectCheck.value, undefined, { renderer: 'svg' })
        myEchartsall.clear()

        if(dataType.value === 'XRD') {
            // 动态修改高度
            const checkNumber = checkData.length
            myEchartsall.getDom().style.height = checkNumber *200 + 160 + "px";
            myEchartsall.resize();
        } else {
            myEchartsall.getDom().style.height = 600 + "px";
            myEchartsall.resize();
        }

        const options = new Options(checkData, dataType.value)
        myEchartsall.setOption(options.getOption())
        
    })
    
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/button.scss";
@include button-circle;
</style>