<template>
    <el-row>
        <div class="left">
            <el-popover
                placement="top-start"
                width="50"
                trigger="hover"
                :content='t("deal.reset")'
                >
                <template #reference>
                    <el-button 
                        icon="Refresh" 
                        circle
                        @click="refresh" />
                </template>
            </el-popover>

            <el-popover
                placement="top-start"
                width="50"
                trigger="hover"
                :content='t("deal.border")'
                >
                <template #reference>
                    <el-button 
                        icon="Location" 
                        circle
                        color="#3E8CD3"
                        @click="showPosition" />
                </template>
            </el-popover>

            <div class="sub-button" v-for="index in XRDImages.number" :key="index">
                <span>{{ t("deal.sub") }} {{index}}</span>
                <el-popover
                    placement="top-start"
                    width="50"
                    trigger="hover"
                    :content='t("deal.subPicP")'
                    >
                    <template #reference>
                        <el-button 
                            icon="Place" 
                            circle
                            color="#EBFDFF"
                            @click="showSubPosition(index - 1)" />
                    </template>
                </el-popover>
                
                <el-popover
                    placement="top-start"
                    width="50"
                    trigger="hover"
                    :content='t("deal.matText")'
                    >
                    <template #reference>
                        <el-button 
                            icon="Aim" 
                            circle
                            color="#95B0B4"
                            @click="showSubTestPosition(index - 1)" />
                    </template>
                </el-popover>
                
            </div>
        </div>
    </el-row>
</template>
                                        
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { changeXRD } from '@/pinia/XRD'

import { putCancas } from '@/utils/deal/putCanvas'
import { drawBorder } from '@/utils/deal/drawBorder'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const refresh = () => {
    const canvasShow: HTMLCanvasElement = document.getElementById('ctxShow') as HTMLCanvasElement
    const ctxShow: CanvasRenderingContext2D = canvasShow.getContext('2d') as CanvasRenderingContext2D
    putCancas(ctxShow)
}

const XRD = changeXRD()
const { imageRaw, XRDImages } = storeToRefs(XRD)

const showPosition = () => {
    const canvasShow: HTMLCanvasElement = document.getElementById('ctxShow') as HTMLCanvasElement
    const ctxShow: CanvasRenderingContext2D = canvasShow.getContext('2d') as CanvasRenderingContext2D
    
    const x0 = XRDImages.value.position.x0
    const y0 = XRDImages.value.position.y0
    const x1 = XRDImages.value.position.x1
    const y1 = XRDImages.value.position.y1

    drawBorder(ctxShow, x0, y0, x1-x0, y1-y0)
}

const showSubPosition = (index: number) => {
    const canvasShow: HTMLCanvasElement = document.getElementById('ctxShow') as HTMLCanvasElement
    const ctxShow: CanvasRenderingContext2D = canvasShow.getContext('2d') as CanvasRenderingContext2D
    
    const x0 = XRDImages.value.position.x0
    const y0 = XRDImages.value.yLists[index].y0
    const x1 = XRDImages.value.position.x1
    const y1 = XRDImages.value.yLists[index].y1

    drawBorder(ctxShow, x0, y0, x1-x0, y1-y0)
}

const showSubTestPosition = (index: number) => {
    const canvasShow: HTMLCanvasElement = document.getElementById('ctxShow') as HTMLCanvasElement
    const ctxShow: CanvasRenderingContext2D = canvasShow.getContext('2d') as CanvasRenderingContext2D

    const x0 = XRDImages.value.bboxs[index].x0
    const y0 = XRDImages.value.bboxs[index].y0
    const x1 = XRDImages.value.bboxs[index].x1
    const y1 = XRDImages.value.bboxs[index].y1

    drawBorder(ctxShow, x0, y0, x1-x0, y1-y0)
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/header.scss";
@import "@/assets/scss/button.scss";
@import "@/assets/scss/base/size.scss";
@import "@/assets/scss/base/color.scss";
.left {
    @include button-circle;
    ::v-deep .el-icon {
        font-size: map-get($length, size-5);
    }

    .sub-button {
        border: solid map-get($around-color-blue, two) map-get($length, size-1);
        margin: 0 map-get($length, size-2);
        padding: map-get($length, size-1) map-get($length, size-2);
    }
}
</style>