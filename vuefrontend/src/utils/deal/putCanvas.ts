import { storeToRefs } from 'pinia'
import { changeXRD } from '@/pinia/XRD'

export function putCancas(ctx: CanvasRenderingContext2D) {
    const XRD = changeXRD()
    const { imageRaw } = storeToRefs(XRD)

    const reader = new FileReader()
    reader.readAsDataURL(imageRaw.value)
    reader.onload = (event) => {
        const image: HTMLImageElement = new Image()
        const target = event.target as FileReader 
        image.src = target.result as string
        
        image.onload = () => {
            ctx.drawImage(image, 0, 0, 647, 400)
        }
    }
}

export function putSubCancas(
    ctx: CanvasRenderingContext2D, 
    i: number, 
    j: number, 
    bbox: {[key:string]:number}, 
    x0: number,
    x1: number,
    y0: number,
    y1: number
    ) {

    const canvas: HTMLCanvasElement = document.getElementById('subCtx' + i + j) as HTMLCanvasElement
    const subCtx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
    
    // 先涂白
    ctx.fillStyle = 'white'
    ctx.fillRect(
        bbox.x0, 
        bbox.y0, 
        bbox.width, 
        bbox.height
        )

    // 再绘制
    const subImage = ctx.getImageData(x0, y0, x1-x0, y1-y0)
    subCtx.putImageData(subImage, 0, 0)
}