<template>
    <el-form :model="loginForm">
        <img src="../../assets/image/enter/002.svg" />
        <h2>{{t('enter.welcome')}}</h2>

        <el-input v-model="loginForm.card" :placeholder="t('enter.card')"/>
        
        <el-input 
            v-model="loginForm.password" 
            type="password" 
            :placeholder="t('enter.password')"
            show-password />
        
        <div class="remember-forget">
            <el-checkbox v-model="rememberMe">
                {{t('enter.rememberMe')}}
            </el-checkbox>

            <el-button type="text" @click="sendPassword(loginForm.card)">
                {{t('enter.forgetPassword')}}
            </el-button>
        </div>

        <el-button class="submit"  @click="submitForm">
            {{t('enter.login')}}
        </el-button>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {sendPassword} from '@/utils/axios/sampleAxios'

import { isSuperManager } from '@/utils/manage/isManager'
import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { setName, setCard } from "@/utils/cookies/cookies"

import { useRouter } from 'vue-router'

import { useI18n } from "vue-i18n"
const { t } = useI18n()

const loginForm = reactive({
    card: '',
    password: ''
})
const rememberMe = ref(true)
const router = useRouter()
const submitForm = () => {
    // 是否是超级管理员
    const isSM = isSuperManager(loginForm.card) as boolean

    if(isSM) {
        router.push({ path: "/" })

    } else {
        // 普通用户的验证
        axios.post(
            'login/',
            {
                card: loginForm.card,
                password: loginForm.password
            }
        ).then(
            (response: AxiosResponse) => {
                if(rememberMe.value) {
                    const expires = 15
                    setName(response.data.name, expires)
                    setCard(response.data.card, expires)
                } else {
                    setName(response.data.name, 0)
                    setCard(response.data.card, 0)
                }
                router.push({ path: "/" })
            }
        ).catch(
            (error: AxiosError) => {
                console.error(error)
            }
        )
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base/size.scss";
@import "@/assets/scss/animation.scss";
@import "@/assets/scss/base/color.scss";

.el-form {
    width: map-get($length, size-12);
    padding: 0 map-get($length, size-6);
    border-radius: map-get($length, size-2);
    box-shadow: 0 0 4px 2px map-get($main-color, main);
    
    img {
        display: block;
        width: map-get($length, size-6);
        padding: map-get($length, size-2);
        margin-left: auto;
    }

    h2 {
        margin: map-get($length, size-2);
    }

    .el-input {
        padding: map-get($length, size-2);
        &:first-child {
            padding-top: map-get($length, size-4);
        }
    }

    .remember-forget{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: map-get($length, size-2) 0;
    }

    .submit {
        width: map-get($length, size-12);
        height: map-get($length, size-6);
        margin: auto;
        margin-top: map-get($length, size-3);
        margin-bottom: map-get($length, size-5);
    }
}
</style>