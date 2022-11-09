<template>
    <el-table
        :data="staffData">
        <el-table-column 
            prop="name" 
            :label="t('enter.name')" 
            sortable />
        <el-table-column 
            prop="card" 
            :label="t('enter.card')"
            sortable 
            />
        <el-table-column 
            prop="phone" 
            :label="t('enter.phone')"
            v-if="isManager()"
            sortable />
        <el-table-column 
            prop="email" 
            :label="t('enter.email')"
            sortable 
            />
        <el-table-column
            prop="ExperiNum"
            sortable
            :label="t('deal.exp')"
            />
        <el-table-column
            prop="ProcessNum"
            sortable
            :label="t('deal.pro')"
            />

        <el-table-column
            v-if="role === 'superAdmin'"
            prop="isManager"
            sortable
            :label="t('setting.manager')">
            <template #default="scope">
                <div @click="changeManager(scope.row.card)">
                    <el-popover
                        v-if="scope.row.isManager"
                        placement="right"
                        :width="100"
                        trigger="hover"
                        content="撤销管理员"
                        >
                        <template #reference>
                            <el-button
                                type="danger"
                                icon="CloseBold" 
                                circle />
                        </template>
                    </el-popover>

                    <el-popover
                        v-else
                        placement="right"
                        :width="100"
                        trigger="hover"
                        content="设为管理员"
                        >
                        <template #reference>
                            <el-button
                                type="info"
                                icon="Flag" 
                                circle />
                        </template>
                    </el-popover>
                </div>

            </template>
        </el-table-column>

        <el-table-column
            fixed="right"
            :label="t('setting.send')"
            >
            <template #default="scope">
                <sendMessage :scopeRow="scope.row"/>
            </template>
        </el-table-column>
        

    </el-table>
</template>

<script lang="ts" setup>
import sendMessage  from '@/components/tinyComponent/sendMessage.vue'
import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { changeManager } from '@/utils/axios/sampleAxios'

import { storeToRefs } from 'pinia'
import { getUserInfo } from '@/pinia/userInfo'

import { isManager } from '@/utils/component/isManager'
import { onMounted, ref } from 'vue'   
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const userInfo = getUserInfo()
const { role } = storeToRefs(userInfo)
const staffData = ref([])
onMounted(() => {
    axios.post(
        'getInfos/'
    ).then(
        (response: AxiosResponse) => {
			staffData.value = response.data
        }
    ).catch(
        (error: AxiosError) => {
			console.log(error, 'error')
        }
    )
})
</script>

<style scoped lang="scss">
</style>