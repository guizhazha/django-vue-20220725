import { defineStore } from "pinia"


export interface userInfoState {
    name: string;
    card: string;
    school: string;
    phone: string;
    email: string;
    role: string;
    password: string;
}

export const getUserInfo = defineStore({
    id: 'userInfo', 
    state: ():userInfoState => ({
        name: '',
        card: '',
        school: '',
        phone: '',
        email: '',
        role: 'student',
        password: '',
    }),
    getters: {
    },
    actions: {
        setInfo(info:{[key:string]:string}) {
            this.name = info.name
            this.card = info.card
            this.school = info.school
            this.phone = info.phone
            this.email = info.email
            this.role = info.role
            this.password = info.password
        }
    }
})
