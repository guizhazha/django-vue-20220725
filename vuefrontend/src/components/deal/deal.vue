<template>
    <el-container>
        <el-header>
            <upload />
        </el-header>
        
        <el-container>
            <el-container>
                <el-main>
                    <check v-if="routeEchart[dataType].length !== 0"/>
                    <echarts />
                    <XRDcanvas v-if="dataType === 'XRD'" v-show="Object.keys(imageRaw).length !== 0"/>
                </el-main>
            </el-container>

            <el-aside v-if="isRight">
                <showData />
            </el-aside>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import upload from '@/components/deal/dealHeader/upload.vue';
import check from '@/components/deal/dealCheck/check.vue';
import echarts from '@/components/deal/echarts/echarts.vue';
import XRDcanvas from '@/components/deal/echarts/XRD/XRDcanvas.vue';
import showData from '@/components/deal/dealRight/showData.vue';

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'
import { clickButton } from '@/pinia/button'
import { changeXRD } from '@/pinia/XRD'

const route = changeRoute()
const { dataType, routeEchart } = storeToRefs(route)

const button = clickButton()
const { isRight } = storeToRefs(button)

const XRDvalue = changeXRD()
const { imageRaw } = storeToRefs(XRDvalue)
</script>

<style scoped lang="scss">
@import "@/assets/scss/container.scss";
</style>