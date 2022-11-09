<template>
    <el-button 
        :disabled="scopeRow.card === getCard()"
        @click="openDialog()"
        icon="Document"/>

    <el-dialog 
        v-model="dialogVisible"
        :width="600"
        draggable
        append-to-body>
        To {{ scopeRow.name }} ({{ scopeRow.card }}):
        <el-input
            v-model="message"
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
import { getCard } from "@/utils/cookies/cookies";
import { defineProps } from 'vue'

import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
    scopeRow: {
        type: [],
        required: true
    }
    
})

const dialogVisible = ref(false)
const openDialog = () => {
    dialogVisible.value = !dialogVisible.value
}
const message = ref('')
const sendMessage = () => {
    if (message.value === '') return 

    axios.post(
        'ChatData/sendMessage/',
        {
            sendCard: getCard(),
            toCard: props.scopeRow.card,
            messageTime: new Date(),
            message: message.value,
            isRead: false,
        }
    ).then(
        (response: AxiosResponse) => {
            ElMessage.success('已成功发送')
            message.value = ''
        }
    ).catch(
        (error: AxiosError) => {
            console.log(error, 'error')
        }
    )
}
</script>

<style scoped lang="scss">

</style>