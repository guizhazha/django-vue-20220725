<template>
    <el-row>
        <el-col :lg="8" :sm="10" :xs="12" class="left">
            <!-- indeterminate：表示中间状态 -->
            <el-checkbox
                v-model="routeCheck[dataType].isCheck"
                :indeterminate="routeCheck[dataType].isInde"
                @change="handleCheckAll"
                border
                />
                <plotAll :checkData="getCheckData()"/>
        </el-col>

        <el-col :lg="10" :sm="6" :xs="2"></el-col>

        <el-col :lg="6" :sm="8" :xs="10" class="right">
            <div @click="changeRight">
                <el-button v-if="!isRight" icon="Right" />
                <el-button v-else icon="Back" />
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import plotAll from '@/components/deal/dealCheck/plotAll.vue'

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'
import { clickButton } from '@/pinia/button'

import { getCheckData } from '@/utils/component/getCheckData'

const route = changeRoute()
const { dataType, routeEchart, routeCheck } = storeToRefs(route)

const handleCheckAll = (value: boolean) => {
    const isChick = value ? true : false
    const isInde = false
    const checkName: string[] = []

    if(value) {
        for(const data of routeEchart.value[dataType.value]) {
            checkName.push(data.dataName as string)
        }
    }
    route.setRouteCheck({isChick, isInde,checkName})
}

const button = clickButton()
const { isRight } = storeToRefs(button)
const changeRight = () => {
    isRight.value = !isRight.value
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/header.scss";
@import "@/assets/scss/button.scss";
.right {
    @include button-fold;
}
</style>
  