<template>
    <el-descriptions
        :title="t('components.baseInfo')"
        direction="horizontal"
        column="1"
        border
        >
        <el-descriptions-item :label="t('enter.name')">
            <span>{{name}}</span>
        </el-descriptions-item>

        <el-descriptions-item :label="t('enter.card')">
            <span>{{card}}</span>
        </el-descriptions-item>

        <el-descriptions-item :label="t('enter.school')">
            <span>{{school}}</span>
        </el-descriptions-item>
        

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    {{t('enter.phone')}}
                    <el-icon @click="isPhone = !isPhone"><Phone /></el-icon>
                </div>
            </template>
            <el-input
                v-model="phone"
                :placeholder="t('enter.phone')" 
                :disabled="isPhone"
                clearable>
                <template #prepend v-if="!isPhone">
                    <el-button 
                        icon="Promotion"
                        @click="changePhone" />
                </template>
            </el-input>
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    {{t('enter.email')}}
                    <el-icon @click="isEmail = !isEmail"><Message /></el-icon>
                </div>
            </template>
            <el-input
                v-model="email"
                :placeholder="t('enter.email')" 
                :disabled="isEmail"
                clearable>
                <template #prepend v-if="!isEmail">
                    <el-button 
                        icon="Promotion"
                        @click="changeEmail" />
                </template>
            </el-input>
        </el-descriptions-item>
        
    </el-descriptions>

</template>

<script lang="ts" setup>
import {changePhone, changeEmail} from '@/utils/axios/sampleAxios'

import { storeToRefs } from "pinia"
import { getUserInfo } from '@/pinia/userInfo'
import {ref} from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const userInfo = getUserInfo()
const { name, card, school, phone, email } = storeToRefs(userInfo)

const isPhone = ref(false)
const isEmail = ref(false)
</script>

<style scoped lang="scss">
</style>