<template>
    <el-upload
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :show-file-list="false"
        :on-change="onChangeImage"
        >
        <h2>{{t("deal.uploadPic")}}</h2>
        <el-icon><UploadFilled /></el-icon>
    </el-upload>
</template>

<script lang="ts" setup>
import { online } from '@/utils/axios/online'
import type { UploadFile, UploadFiles, UploadRawFile } from 'element-plus'

import { changeXRD } from '@/pinia/XRD'
import { useI18n } from 'vue-i18n'
import { returnStatement } from '@babel/types'
const { t } = useI18n()

const XRD = changeXRD()
const onChangeImage = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    if (uploadFile.status !== 'ready') returnStatement
    online(uploadFile.name, 'XRD图片正在被处理')

    XRD.setImageRaw(uploadFile.raw as UploadRawFile)
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/upload.scss";
</style>