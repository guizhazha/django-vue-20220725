import { defineStore } from "pinia"
import type { UploadRawFile } from 'element-plus'
import XRDImageData from '@/utils/deal/upload/XRDImageData'

export interface XRDState {
    imageRaw: UploadRawFile;
    XRDImages: XRDImageData;
}

export const changeXRD = defineStore({
    id: 'XRD', 
    state: ():XRDState => ({
        imageRaw: {} as UploadRawFile,
        XRDImages: {} as XRDImageData,
    }),
    getters: {
    },
    actions: {
        setImageRaw(image: UploadRawFile) {
            this.imageRaw = image;
        },
        setXRDImages(image: XRDImageData) {
            this.XRDImages = image
        },

        initXRD(){
            this.imageRaw = {} as UploadRawFile,
            this.XRDImages = {} as XRDImageData
        }
    }
})
