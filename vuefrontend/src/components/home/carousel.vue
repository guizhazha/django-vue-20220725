<template>
    <el-carousel height="256px">
        <el-carousel-item>
            <h2>{{t('home.title')}}</h2>
            <el-steps align-center>
                <el-step :title="t('components.home')" :description="t('home.home')" />
                <el-step :title="t('components.deal')" :description="t('home.deal')" />
                <el-step :title="t('components.show')" :description="t('home.show')" />
                <el-step :title="t('components.baseInfo')" :description="t('home.baseInfo')" />
            </el-steps>
        </el-carousel-item>
        <el-carousel-item>
            <el-card shadow="hover">
                <h4>{{t('home.person')}} {{userNumber}}</h4>
                <el-divider content-position="right">{{t('home.personIn')}}</el-divider>
                <div>
                    <h5>{{t('home.manager')}}{{managerNumber}}</h5>
                    <h5>{{t('home.teacher')}}{{teacherNumber}}</h5>
                    <h5>{{t('home.student')}}{{ userNumber - teacherNumber }}</h5>
                </div>
            </el-card>
            <el-card shadow="hover">
                <h4>{{t('home.data')}}</h4>
                <el-divider content-position="right">{{t('home.dataIn')}}</el-divider>
                <div>
                    <h5>{{t('home.expris')}}{{exprisNumber}}</h5>
                    <h5>{{t('home.pros')}}{{prosNumber}}</h5>
                    <h5>{{t('home.onlines')}}{{onlinesNumber}}</h5>
                </div>
           </el-card>
        </el-carousel-item>
    </el-carousel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const userNumber = ref(0)
const managerNumber = ref(0)
const teacherNumber = ref(0)
const exprisNumber = ref(0)
const prosNumber = ref(0)
const onlinesNumber = ref(0)
onMounted(() => {
    axios.post(
        'getUserNumber/'
    ).then(
        (response: AxiosResponse) => {
            userNumber.value = response.data['userNumber']
            managerNumber.value = response.data['managerNumber']
            teacherNumber.value = response.data['teacherNumber']
        }
    ).catch(
        (error: AxiosError) => {
            console.log(error, 'error')
        }
    )

    axios.post(
        'getDataNumber/'
    ).then(
        (response: AxiosResponse) => {
            exprisNumber.value = response.data['exprisNumber']
            prosNumber.value = response.data['prosNumber']
            onlinesNumber.value = response.data['onlinesNumber']
        }
    ).catch(
        (error: AxiosError) => {
            console.log(error, 'error')
        }
    )
})
</script>

<style scoped lang="scss">
@import "@/assets/scss/base/size.scss";

h2 {
    text-align: center;
}
h4, h5 {
    margin: map-get($length, size-3);
}
.el-carousel__item {
    ::v-deep .el-card__body {
        padding: map-get($length, size-2);
    }
    &:last-child {
        display: flex;
        justify-content: space-around;
    }

    .el-card {
        width: 40%;
    }
}

</style>