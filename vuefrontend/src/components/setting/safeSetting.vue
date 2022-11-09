<template>
    <el-descriptions
        :title="t('setting.safe')"
        direction="vertical "
        column="1"
        border
        >
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    {{t('enter.password')}}
                    <el-icon @click="isPassword = !isPassword"><Lock /></el-icon>
                </div>
            </template>
            <el-input
                v-model="password"
                :placeholder="t('enter.password')" 
                :disabled="isPassword"
                show-password
                clearable>
                <template #prepend v-if="!isPassword">
                    <el-button 
                        icon="Promotion"
                        @click="changePassword" />
                </template>
            </el-input>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script lang="ts" setup>
import {changePassword} from '@/utils/axios/sampleAxios'

import { storeToRefs } from "pinia"
import { getUserInfo } from '@/pinia/userInfo'

import {ref} from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const userInfo = getUserInfo()
const { password } = storeToRefs(userInfo)

const isPassword = ref(false)
</script>

<style scoped lang="scss">
</style>