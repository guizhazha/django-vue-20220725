import { binaryImg } from '@/utils/deal/binaryImg'
import { nextTick } from 'vue'

class XRDImageData {
    protected ctxUnshow: CanvasRenderingContext2D

    public name: string
    public url: string
    public position: {[key: string]: number} = {}
    public axis: {[key: string]: string|number} = {}

    public number = 0
    public yLists: {[key: string]: number}[] = []

    public dataName: string[] = []
    public bboxs: {[key: string]: number}[] = []
    public XYList: {[key: string]: number[]}[] = []

    constructor(name: string, url: string){
        const canvasUnshow: HTMLCanvasElement = document.getElementById('ctxUnshow') as HTMLCanvasElement
        this.ctxUnshow = canvasUnshow.getContext('2d') as CanvasRenderingContext2D

        this.name = name
        this.url = url
    }

    getXY(){
        const binImage = binaryImg(this.ctxUnshow)
        this.getXY0(binImage)
        this.getX1(binImage)
        this.getY1(binImage)

        this.position.x0 = this.position.x0 + 2,
        this.position.y0 = this.position.y0 + 2,
        this.position.x1 = this.position.x1 - 2,
        this.position.y1 = this.position.y1 + 2
    }
    protected getXY0(binImage: ImageData) {
        for (let i = 0; i < binImage.data.length; i += 4) {
            const R = binImage.data[i] // R(0-255)
            const G = binImage.data[i + 1] // G(0-255)
            const B = binImage.data[i + 2] // B(0-255)
        
            // 第一步：筛选
            if (R === 255 && G === 255 && B === 255) {
                continue
            } else {
                // 第二步：第一次获得黑点，该黑点为左上角的点
                this.position.y0 = Math.floor(i / (4 * 647))
                this.position.x0 = Math.floor((i - this.position.y0 * 4 * 647) / 4)
                break 
            }
        }
    
    }
    protected getX1(binImage: ImageData) {
        for (let i = (this.position.y0 + 2) * 4 * 647; i > (this.position.y0 + 1) * 4 * 647; i -= 4) {
            const R = binImage.data[i] // R(0-255)
            const G = binImage.data[i + 1] // G(0-255)
            const B = binImage.data[i + 2] // B(0-255)
        
            // 第三步：从右侧取最右边的黑点
            if (R === 255 && G === 255 && B === 255) {
                continue
            } else {
                // 第四步：获得最右边的黑点的横坐标
                this.position.x1 = Math.floor((i - (this.position.y0 + 1) * 4 * 647) / 4)
                
                break
            }
        }
    }
    protected getY1(binImage: ImageData) {
        for (let i = this.position.y0 + 250; i < 400; i += 1) {
            const RSet = new Set()
            const GSet = new Set()
            const BSet = new Set()
        
            // 第五步：取最下面的黑点
            for (let j = i * 4 * 647 + (this.position.x0 + 5) * 4; j < i * 4 * 647 + (this.position.x0 + 400) * 4; j += 4) {
                RSet.add(binImage.data[j])
                GSet.add(binImage.data[j + 1])
                BSet.add(binImage.data[j + 2])
            }
            // 第六步：如果一整行都是同一颜色，通常为白色，则默认这是个底边
            if (RSet.size === 1 && GSet.size === 1 && BSet.size === 1) {
                this.position.y1 = i
                break
            } else {
                continue
            }
        }
        
    }

    material() {
        const black = this.getBlackRange()
        const realYLists = this.getRealyLists(black)
    
        for(let j = 0; j < realYLists.length / 2; j++) {
            this.yLists[j] = {
                y0: realYLists[j * 2],
                y1: realYLists[j * 2 + 1]
            }
        }
    }
    protected getBlackRange() {
        const x0 = this.position.x0 + 5
        const y0 = this.position.y0 + 5
        const width = this.position.x1 - this.position.x0 -10
        const height = this.position.y1 - this.position.y0 -5
        const center = binaryImg(this.ctxUnshow, x0, y0, width, height)
        const black: number[] = []
        for (let j = 0; j < height; j++) {
            const RSet = new Set()
            const GSet = new Set()
            const BSet = new Set()
            for (let i = j * 4 * width; i < (j + 1) * 4 * width; i += 4) {
                RSet.add(center.data[i])
                GSet.add(center.data[i + 1])
                BSet.add(center.data[i + 2])
            }
            if (RSet.size === 1 && GSet.size === 1 && BSet.size === 1) {
                continue
            } else {
                // 曲线实际位置
                black.push(j + y0)
            }
        }
        return black
    }
    protected getRealyLists(black: number[]) {
        const y0 = this.position.y0 + 5
        const height = this.position.y1 - this.position.y0 -5
        const realYLists: number[] = []

        realYLists.push(y0)
        this.number = 1
        for (let j = 0; j < black.length - 1; j++) {
            if (black[j + 1] - black[j] > 1) {
                // 最后一行黑色为材料的纵轴的底端
                // 而下一段黑色的开始为下一个材料的纵轴的首端
                this.number++
                realYLists.push(black[j])
                realYLists.push(black[j + 1])
            }
        }
        realYLists.push(height + y0)
        return realYLists
    }

    getAxis() {
        this.axis = {
            yAxisName: 'WaveLength',
            xAxisName: 'Theta',
            xAxisBegin: '',
            xAxisEnd: '',
        }
    }
    
    async putSubCtxs(){
        for(let index = 0; index < this.number; index++) {
            const x0 = this.position.x0
            const x1 = this.position.x1
            const y0 = this.yLists[index].y0
            const y1 = this.yLists[index].y1

            await nextTick(() => {
                const canvas: HTMLCanvasElement = document.getElementById(this.name + index) as HTMLCanvasElement
                const subCtx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
                
                // 先涂白
                this.bboxs[index] = {
                    x0: x1 - 120,
                    y0: y0,
                    width: 120,
                    height: (y1 - y0)*0.7,
                }
                this.ctxUnshow.fillStyle = 'white'
                this.ctxUnshow.fillRect(this.bboxs[index].x0, 
                    this.bboxs[index].y0, 
                    this.bboxs[index].width, 
                    this.bboxs[index].height)

                // 再绘制
                const subImage = this.ctxUnshow.getImageData(x0, y0, x1 - x0, y1 - y0)
                subCtx.putImageData(subImage, 0, 0)

                const XYList = this.getSubData(subCtx, x1 - x0, y1 - y0)
                this.XYList[index] = {
                    xList: XYList.xList,
                    yList: XYList.yList,
                }

            })

            this.dataName[index] = this.name + (index + 1)
        }
    }
    getSubData (subCtx: CanvasRenderingContext2D, width: number, height: number) {
        const subImage = binaryImg(subCtx, 0, 0, width, height)
        const xList = []
        const yList = []
        for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
            const local = i * 4 + j * 4 * width
            const R = subImage.data[local] // R(0-255)
            const G = subImage.data[local + 1] // G(0-255)
            const B = subImage.data[local + 2] // B(0-255)
            if (R === 255 && G === 255 && B === 255) {
                continue
            } else {
                const x = i
                const y = height - j // 翻转
                xList.push(x)
                yList.push(y)
            }
          }
        }
        return {
          xList,
          yList
        }
    }
}

export default XRDImageData;