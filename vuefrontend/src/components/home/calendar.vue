<template>
    <el-calendar ref="calendar">
        <template #header="{ date }">
            <span>{{ date }}</span>
            <div class="right">
                <el-button @click="selectDate('today')" icon="Aim" circle size="small" />
                <el-button @click="selectDate('prev-month')" icon="CaretLeft" circle size="small" />
                <span>{{t("home.month")}}</span>
                <el-button @click="selectDate('prev-month')" icon="CaretRight" circle size="small" />
                <el-button @click="selectDate('prev-year')" icon="CaretLeft" circle size="small" />
                <span>{{t("home.year")}}</span>
                <el-button @click="selectDate('next-year')" icon="CaretRight" circle size="small" />
            </div>
        </template>
        <template #date-cell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                {{ data.isSelected ? '✔️' + getTodayInfo(data.day) : '' }}
            </p>
        </template>
    </el-calendar>
</template>

<script lang="ts" setup>
import {getTodayInfo} from '@/utils/axios/getTodayInfo'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const calendar = ref()
const selectDate = (val: string) => {
    calendar.value.selectDate(val)
}
</script>

<style scoped lang="scss">
</style>
<!-- @import "@/assets/scss/base/size.scss";
.el-calendar__header {
    display: flex;
    justify-content: space-around;
} -->

<!-- span {
    &:first-child {
        margin-left: map-get($length, size-4);
    }
    &:not(:first-child) {
        margin: map-get($length, size-1) 0;
    }
} -->