<template>
    <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-Progress="onProgress"
        >
        <h3>{{t("deal.pro")}}</h3>
        <h5>{{t("deal.proRule1")}}</h5>
        <el-icon><UploadFilled /></el-icon>
        <h5>{{t("deal.proRule2")}}</h5>
        <h6>{{t("deal.rule")}}</h6>
        <h6>{{t("deal.proTip")}}</h6>
    </el-upload>
</template>

<script lang="ts" setup>
import { online } from '@/utils/axios/online'
import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { getCard } from "@/utils/cookies/cookies";
import type { UploadRawFile, UploadFile, UploadFiles } from 'element-plus'

import { getToday } from '@/utils/component/date'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const beforeUpload = (rawFile: UploadRawFile) => {
    online(rawFile.name, '一份工艺文件正准备上传')
    
    if (rawFile.name.split('.')[0].length !== 3) {
        console.error('工艺文件由3位数字组成,XXX(例:007)')
        return false
    }
}

const onProgress = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    const formData: FormData = new FormData()
    formData.append('userInfo', getCard() as string)
    formData.append('createdAt', getToday())
    formData.append('processId', uploadFiles.name.split('.')[0])
    formData.append('fileName', uploadFiles.name)
    formData.append('file', uploadFiles.raw)

    axios.post(
        'ProcessFile/upload/',
        formData
    ).then(
        (response: AxiosResponse) => {
            console.log()
        }
    ).catch(
        (error: AxiosError) => {
            console.error(error)
        }
    )
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/upload.scss";
</style>