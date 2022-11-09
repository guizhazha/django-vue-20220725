<template>
	<specialEvent v-if="imageRaw.name !== undefined"/>
	<fieldset class="show-canvas">
		<legend>{{imageRaw.name}}</legend>
			<canvas id="ctxShow" width="647" height="400" />
			<canvas v-show="false" id="ctxUnshow" width="647" height="400" />
			<ImageInfo v-if="imageRaw.name !== undefined"/>
	</fieldset>
	
	<fieldset v-for="yList, index in XRDImages.yLists" :key="index" class="subs">
		<legend>{{XRDImages.dataName[index] ? XRDImages.dataName[index] : XRDImages.name + '+' + Number(index + 1) }}</legend>
		<div class="canvas">
			<canvas 
				@click="change"
				:id="XRDImages.name + index"
				:height="yList.y1 - yList.y0"
				:width="XRDImages.position.x1 - XRDImages.position.x0"/>
		</div>
		<subImageInfo :index='index'/>
	</fieldset>
</template>

<script lang="ts" setup>
import specialEvent from '@/components/deal/echarts/XRD/specialEvent.vue'
import ImageInfo from '@/components/deal/echarts/XRD/imageInfo.vue'
import subImageInfo from '@/components/deal/echarts/XRD/subImageInfo.vue'

import { ref, watch } from 'vue'

import { storeToRefs } from 'pinia'
import { changeXRD } from '@/pinia/XRD'

import XRDImageData from '@/utils/deal/upload/XRDImageData'

const XRD = changeXRD()
const { imageRaw, XRDImages } = storeToRefs(XRD)
watch(imageRaw, () => {
	putCtx()
})

const url = ref('')
const putCtx = async () => {
    const reader = new FileReader()
    reader.readAsDataURL(imageRaw.value)
    reader.onload = (event) => {
        const image: HTMLImageElement = new Image()
        image.src = event.target.result as string
		url.value = image.src
        
        image.onload = () => {
			const canvasShow: HTMLCanvasElement = document.getElementById('ctxShow') as HTMLCanvasElement
			const ctxShow: CanvasRenderingContext2D = canvasShow.getContext('2d') as CanvasRenderingContext2D
            ctxShow.drawImage(image, 0, 0, 647, 400)

			const canvasUnshow: HTMLCanvasElement = document.getElementById('ctxUnshow') as HTMLCanvasElement
			const ctxUnshow: CanvasRenderingContext2D = canvasUnshow.getContext('2d') as CanvasRenderingContext2D
            ctxUnshow.drawImage(image, 0, 0, 647, 400)

			// 处理数据
			dealImage()
        }
    }
}

const dealImage = () => {
	const curName = imageRaw.value.name
	const imageData = new XRDImageData(curName, url.value)
	setTimeout(async ()=>{
		imageData.getXY()
		imageData.material()
		imageData.getAxis()
		XRD.setXRDImages(imageData)

		await imageData.putSubCtxs()
	}, 50)
}

// 去除文字
const change = () => {
	console.log('hhh')
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/h.scss"; 
@import "@/assets/scss/base/size.scss";

.show-canvas {
	border: solid transparent 2px;
	margin: map-get($length, size-2);
}
.subs {
	border: solid #4f6077 2px;
	margin: map-get($length, size-2);
}
@media (min-width: 992px) {
    .show-canvas, .subs {
		display: flex;
	}
}

.image-info, .sub-image-info {
    display: flex;
    flex-direction: column;
	justify-content: center;
    ::v-deep h3 {
        margin: map-get($length, size-2) 0;
    }
}
</style>