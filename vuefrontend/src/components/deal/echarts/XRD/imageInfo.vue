<template>
    <div class="image-info">
        <h3>
            {{t("deal.leftTop")}}
            <span @click="x0=true">
                <span v-if="x0">
                    <el-input @blur="x0=false" @mouseout="change" v-model="XRDImages.position.x0"></el-input>
                </span>
                <span v-else>
                    {{XRDImages.position.x0}}
                </span>
            </span>
            , 
            <span @click="y0=true">
                <span v-if="y0">
                    <el-input @blur="y0=false" @mouseout="change" v-model="XRDImages.position.y0"></el-input>
                </span>
                <span v-else>
                    {{XRDImages.position.y0}}
                </span>
            </span>
        </h3>
        <h3>
            {{t("deal.rightBottom")}}
            <span @click="x1=true">
                <span v-if="x1">
                    <el-input @blur="x1=false" @mouseout="change" v-model="XRDImages.position.x1"></el-input>
                </span>
                <span v-else>
                    {{XRDImages.position.x1}}
                </span>
            </span>
            , 
            <span @click="y1=true">
                <span v-if="y1">
                    <el-input @blur="y1=false" @mouseout="change" v-model="XRDImages.position.y1"></el-input>
                </span>
                <span v-else>
                    {{XRDImages.position.y1}}
                </span>
            </span>
        </h3>
    
        <h3>
            {{t("deal.number")}}{{ XRDImages.number }}
        </h3>
        
        <h3>
            {{t("deal.yAxis")}}
            <el-input 
                v-model="XRDImages.axis.yAxisName" 
                :placeholder="t('deal.yAxis')" 
                clearable 
                />
        </h3>
        
        <h3>
            {{t("deal.xAxisBegin")}}
            <el-input 
                style="border: 1px solid red"
                v-model="XRDImages.axis.xAxisBegin" 
                :placeholder="t('deal.xAxisBegin')" 
                clearable 
                />
        </h3>
        <h3>
            {{t("deal.xAxisEnd")}}
            <el-input 
                style="border: 1px solid red"
                v-model="XRDImages.axis.xAxisEnd" 
                :placeholder="t('deal.xAxisEnd')"
                clearable 
                />
        </h3>
        <h3>
            {{t("deal.xAxis")}}
            <el-input 
                v-model="XRDImages.axis.xAxisName" 
                :placeholder="t('deal.xAxis')" 
                clearable 
                />
        </h3>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { changeXRD } from '@/pinia/XRD'
import { ref} from 'vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const XRD = changeXRD()
const { XRDImages } = storeToRefs(XRD)

const x0 = ref(false)
const y0 = ref(false)
const x1 = ref(false)
const y1 = ref(false)

const change = () => {
    setTimeout(async ()=>{
        await XRDImages.value.putSubCtxs()
    }, 50)
}
</script>

<style scoped lang="scss">
</style>