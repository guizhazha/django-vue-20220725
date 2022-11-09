<template>
    <el-table
        :data="responseData[dataType]"
        border 
		stripe 
        table-layout="fixed"
        default-expand-all
        @selection-change="handleSelectionChange"
        >
        <el-table-column>
			<template #header>
				<plotAll :checkData="checkData"/>
			</template>

            <el-table-column type="selection" />
            <el-table-column 
				type="expand" 
				:label="t('show.add')"
                width="120">
				<template #default="props">
                    <addVue :row="props.row"/>
				</template>
			</el-table-column>
        </el-table-column>
		
        <el-table-column 
            align="center" 
            :label="t('setting.date')">
            <el-table-column 
                prop="testTime" 
                :label="t('setting.testTime')"
                sortable />
            <el-table-column 
                prop="createdAt" 
                :label="t('setting.createdAt')"
                sortable 
                />
        </el-table-column>
        <el-table-column 
            :label="t('setting.info')">
            <el-table-column 
                :label="t('setting.aff')">
                <el-table-column 
                    prop="card" 
                    :label="t('enter.card')"
                    sortable 
					align="right"
                    />
                <el-table-column 
                    prop="name" 
                    :label="t('enter.name')"
                    sortable 
					align="right"
                    />
            </el-table-column>
            <el-table-column :label="t('setting.data')">
                <el-table-column 
                    prop="processId" 
                    :label="t('setting.processId')"
                    sortable 
					align="right"
                    />
                <el-table-column 
                    prop="sampleId" 
                    :label="t('setting.sampleId')"
                    sortable 
					align="right"
                    />

                <el-table-column 
                    :label="t('setting.rank')"
					prop="rank" 
                    sortable>
                    <template #default="props">
                        <el-rate
                            @change="sendRank(props.row.dataName, props.row.rank)"
                            v-model="props.row.rank"
                            :texts="[t('deal.rank1'), t('deal.rank2'), t('deal.rank3'), t('deal.rank4'), t('deal.rank5')]"
                            :disabled="!props.row.isEdit"
                            show-text/>
                    </template>
				</el-table-column>

                <el-table-column 
                    :label="t('show.isPublic')"
					prop="isPublic" 
                    sortable
                    align="center">
                    <template #default="props">
                        <el-switch
                            :disabled="!props.row.isEdit"
                            @change="changePublicStatus(props.row.id, props.row.isPublic)"
                            v-model="props.row.isPublic"
                            inline-prompt
                            style="--el-switch-on-color: #84E898; --el-switch-off-color: #F9F871"
                            active-text="Y"
                            inactive-text="N"/>
                    </template>
				</el-table-column>

            </el-table-column>
        </el-table-column>

        <el-table-column 
            fixed="right"
            :label="t('setting.operation')"
            align="center">
            <template #default="scope">
                <el-button 
                    v-if="!scope.row.isEdit"
                    :disabled="!scope.row.hasPrivilege"
                    type="warning"
                    @click="scope.row.isEdit = true">
                    {{t('show.edit')}}
                </el-button>
                <el-button 
                    v-else
                    :disabled="!scope.row.hasPrivilege"
                    type="warning"
                    @click="scope.row.isEdit = false">
                    {{t('show.finish')}}
                </el-button>

                <el-button 
                    :disabled="!scope.row.hasPrivilege"
                    type="danger"
                    @click="handleDelete(scope.row)">
                    {{t('show.delete')}}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import plotAll from '@/components/deal/dealCheck/plotAll.vue'
import addVue from '@/components/show/add.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

import { ref, nextTick } from 'vue'
import * as echarts from 'echarts'

import { sendRank, changePublicStatus } from '@/utils/axios/sampleAxios'
import { unShow } from '@/utils/axios/unShow'

import Option from '@/utils/deal/option/Option'
import JVoption from '@/utils/deal/option/JVoption'
import IPCEoption from '@/utils/deal/option/IPCEoption'
import ABSoption from '@/utils/deal/option/ABSoption'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const route = changeRoute()
const { dataType, responseData } = storeToRefs(route)

const plot = (response: {[key: string]: string| number|number[]}, index: number) => {
    nextTick(() => {
        const myEcharts = echarts.init(document.getElementById('echart' + index), null, { renderer: 'svg' })
    
        if(dataType.value === 'JV') {
            const option = new JVoption(response)
            myEcharts.setOption(option.getJVoption())
        } else if(dataType.value === 'IPCE') {
            const option = new IPCEoption(response)
            myEcharts.setOption(option.getIPCEoption())
        } else if (dataType.value === 'ABS') {
            const option = new ABSoption(response)
            myEcharts.setOption(option.getABSoption())
        } else {
            const option = new Option(response)
            myEcharts.setOption(option.getOption())
        }
	})
}

let checkData = ref([] as {[key: string]: string| number|number[]}[])
const handleSelectionChange = (value: {[key: string]: string| number|number[]}[]) => {
    checkData.value = value
}

const handleDelete = (response: {[key: string]: string| number|number[]}) => {
    ElMessageBox.confirm(
        '确定删除吗?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            unShow(response.id as number)

            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            })
    })
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/echart.scss";
</style>