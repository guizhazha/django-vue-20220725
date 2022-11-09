<template>
    <el-tabs tab-position="left">
        <el-tab-pane :label="t('components.baseInfo')">
            <baseInfo />
        </el-tab-pane>
        <el-tab-pane :label="t('setting.safe')">
            <SafeSetting />
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import baseInfo from '@/components/setting/baseInfo.vue'
import SafeSetting from '@/components/setting/safeSetting.vue';

import { onMounted } from 'vue'   
import { getInfo } from '@/utils/axios/getInfo'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onMounted(() => {
    getInfo()
})
</script>

<style scoped lang="scss">
</style>