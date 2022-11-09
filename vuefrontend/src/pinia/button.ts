import { defineStore } from "pinia"


export interface buttonState {
    isFold: boolean;
    isFull: boolean;
    isRight: boolean;
    isClose: boolean;
    language: string;
}

export const clickButton = defineStore({
    id: 'button', 
    state: ():buttonState => ({
        isFold: false,
        isFull: false,  
        isRight: false,
        isClose: false,
        language: navigator.language.toLowerCase(),
    }),
    getters: {
    },
    actions: {
    }
})
