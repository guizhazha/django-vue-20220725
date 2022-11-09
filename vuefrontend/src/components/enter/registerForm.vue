<template>
    <el-form ref="registerFormRef"
        :model="registerForm"
        status-icon
        :rules="registerFormRules"
        >
        <el-form-item :label="t('enter.name')" prop="name">
            <el-input v-model="registerForm.name" />
        </el-form-item>
        <el-form-item :label="t('enter.card')" prop="card">
            <el-input v-model="registerForm.card" />
        </el-form-item>
        <el-form-item :label="t('enter.school')" prop="school">
            <el-select v-model="registerForm.school">
                <el-option :label="t('enter.school1')" value="BISTU" />
            </el-select>
        </el-form-item>
        <el-form-item :label="t('enter.password')" prop="password">
            <el-input v-model="registerForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item :label="t('enter.email')" prop="email">
            <el-input v-model="registerForm.email" />
        </el-form-item>
        <el-form-item :label="t('enter.phone')" prop="phone">
            <el-input v-model="registerForm.phone" />
        </el-form-item>
        <el-form-item :label="t('enter.role')" prop="role">
            <el-select v-model="registerForm.role">
                <el-option :label="t('enter.teacher')" value="teacher" />
                <el-option :label="t('enter.student')" value="student" />
            </el-select>
        </el-form-item>

        <div class="submit-reset">
            <el-button @click="submitForm(registerFormRef)">
                {{t('enter.register')}}
            </el-button>
            <el-button @click="resetForm(registerFormRef)">
                {{t('enter.reset')}}
            </el-button>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { getToday } from '@/utils/component/date'
import { useRouter } from 'vue-router'

import { useI18n } from "vue-i18n"
const { t } = useI18n()

const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
    name: '',
    card: '',
    school: '',
    password: '',
    email: '',
    phone: '',
    role: ''
})

const validateName = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入姓名'))
    } else {
        callback()
    }
}
const validateCard = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入卡号'))
    } else {
        if (/^[0-9]*$/.test(value) === false) {
            callback(new Error('卡号为您的学号或者职工号哦'))
        } else {
            callback()
        }
    }
}
const validateSchool = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入学校'))
    } else {
        callback()
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const validateEmail = (rule: any, value: any, callback: any) => {
    if (value === '') {
        return callback(new Error('请输入邮箱'))
    } else {
        if (
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) === false
        ) {
            callback(new Error('邮箱格式错误'))
        } else {
            callback()
        }
    }
}
const validatePhone = (rule: any, value: any, callback: any) => {
    if (value === '') {
        return callback(new Error('请输入手机号'))
    } else {
        if (/^1[34578]\d{9}$/.test(value) === false) {
            callback(new Error('手机号格式错误'))
        } else {
            callback()
        }
    }
}
const validateRole = (rule: any, value: any, callback: any) => {
    if (value === '') {
        return callback(new Error('请输入身份'))
    } else {
        callback()
    }
}
const registerFormRules = reactive({
    name: [{ validator: validateName, trigger: 'blur' }],
    card: [{ validator: validateCard, trigger: 'blur' }],
    school: [{ validator: validateSchool, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }],
    phone: [{ validator: validatePhone, trigger: 'blur' }],
    role: [{ validator: validateRole, trigger: 'blur' }],
})

const router = useRouter()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {
        axios.post(
            'register/',
            {
                name: registerForm.name,
                card: registerForm.card,
                school: registerForm.school,
                password: registerForm.password,
                email: registerForm.email,
                phone: registerForm.phone,
                role: registerForm.role,
                createdAt: getToday(),
            }
        ).then(
            (response: AxiosResponse) => {
                router.push({ path: "/login" })
            }
        ).catch(
            (error: AxiosError) => {
                console.error(error)
            }
        )
    } else {
        return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/base/size.scss";
@import "@/assets/scss/animation.scss";
.el-form {
    width: map-get($length, size-14);

    ::v-deep .el-form-item__label {
        width: map-get($length, size-9);
        text-align: right;
    }
}

.el-input, .el-select {
    height: map-get($length, size-6);
    width: map-get($length, size-12);
}

.submit-reset {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: map-get($length, size-13);

    .el-button {
        background-color: black;
        color: white;
        width: map-get($length, size-10);

        &:first-child {
            mask: url(~@/assets/image/enter/nature-sprite.png);
            mask-size: 2300% 100%;
            animation: ani2 1s steps(22) forwards;
            &:active {
                animation: ani 1s steps(22) forwards;
            }
        }

        &:last-child {
            mask: url(~@/assets/image/enter/urban-sprite.png);
            mask-size: 3000% 100%;
            animation: ani2 1s steps(29) forwards;
            &:active {
                animation: ani 1s steps(29) forwards;
            }
        }
    }
}
</style>

