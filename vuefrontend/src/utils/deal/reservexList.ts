import { storeToRefs } from 'pinia'
import { changeXRD } from '@/pinia/XRD'

export function reservexList(index: number) {
    const XRD = changeXRD()
    const { XRDImages } = storeToRefs(XRD)

    const XYList = XRDImages.value.XYList[index]
    const xAxisBegin = XRDImages.value.axis.xAxisBegin
    const xAxisEnd = XRDImages.value.axis.xAxisEnd
    const x0 = XRDImages.value.position.x0
    const x1 = XRDImages.value.position.x1

    const uploadXList: number[] = []
    for(let i=0; i < XYList.xList.length; i++) {
        const a = Number(xAxisBegin)
        const k = (Number(xAxisEnd) - Number(xAxisBegin)) / Number(x1 - x0)
        const x = a + XYList.xList[i] * k
        uploadXList.push(x)
    }

    return uploadXList
}