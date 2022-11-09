<template>
    <el-tabs v-model="notMess" type="border-card" >
        <el-tab-pane is-dot label="通知" name="notification">
            <div v-for="key in Object.keys(notions)" :key="key">
                <span v-if="notions[key].size !== 0">{{key}}数据缺失</span>
                <span v-for="notion,index in notions[key]" :key="notion">
                    {{notion}}
                    <span v-if="index+1 !== notions[key].size">,</span>
                </span>
                <span v-if="notions[key].size !== 0">工艺文件</span>
            </div>
        </el-tab-pane>

        <el-tab-pane label="消息" name="Message">
            <div v-if="messages.length > 0">
                <div v-for="message, index in messages" :key="message">
                    <div @click="read(message)">
                        <h5>from: {{message.sendName}}({{message.sendCard}})</h5>
                        <span>{{message.message}}</span>
                        <el-divider v-if="index+1 !== messages.length" />
                    </div>
                </div>
            </div>

            <div v-else>
                暂无
            </div>
        </el-tab-pane>
    </el-tabs>

    <el-dialog 
        v-model="dialogVisible"
        :width="600"
        draggable
        append-to-body>
        To {{ name }} ({{ card }}):
        <el-input
            v-model="mes"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
            />
        <div style="display: flex; justify-content: end;">
            <el-button
                @click="sendMessage"
                icon="Upload"/>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

import { getCard } from "@/utils/cookies/cookies";
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const route = changeRoute()
const { notions } = storeToRefs(route)

const name = ref('')
const card = ref('')
const notMess = ref('notification')

const messages = ref([])

onMounted(() => {
    axios.post(
        'ChatData/getMessage/',
        {
            card: getCard(),
        }
    ).then(
        (response: AxiosResponse) => {
            console.log('ChatData/getMessage', response.data)
            messages.value = response.data
        }
    ).catch(
        (error: AxiosError) => {
            console.log(error, 'error')
        }
    )
})

const dialogVisible = ref(false)
const read = (message: {[key:string]:string|number|boolean}) => {
    axios.post(
        'ChatData/read/',
        {
            id: message.id,
        }
    ).then(
        (response: AxiosResponse) => {
            console.log('ChatData/read', response.data)
        }
    ).catch(
        (error: AxiosError) => {
            console.log(error, 'error')
        }
    )
    dialogVisible.value = !dialogVisible.value
    name.value = message.sendName as string
    card.value = message.sendCard as string
}

const mes = ref('')
const sendMessage = () => {
    if (mes.value === '') return 

    axios.post(
        'ChatData/sendMessage/',
        {
            sendCard: getCard(),
            toCard: card.value,
            messageTime: new Date(),
            message: mes.value,
            isRead: false,
        }
    ).then(
        (response: AxiosResponse) => {
            ElMessage.success('已成功发送')
            mes.value = ''
        }
    ).catch(
        (error: AxiosError) => {
            console.log(error, 'error')
        }
    )
}
</script>

<style scoped lang="scss">
::v-deep .el-card__body {
    padding: 0;
}
</style>
  