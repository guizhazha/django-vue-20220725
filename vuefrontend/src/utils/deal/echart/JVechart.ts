import EchartData from '@/utils/deal/echart/EchartData'
import type { UploadFile } from 'element-plus'
import { linerFitting } from '@/utils/deal/linerFitting'

class JVechart extends EchartData{
    protected xPosList: number[] = [];
    protected yPosList: number[] = [];
    protected xNegList: number[] = [];
    protected yNegList: number[] = [];
    protected posJsc = 0;
    protected negJsc = 0;
    protected posVoc = 0;
    protected negVoc = 0;
    protected posMax = 0;
    protected negMax = 0;
    protected posFF = 0;
    protected negFF = 0;
    protected posEff = 0;
    protected negEff = 0;
    protected table = [{}]

    constructor(uploadData: UploadFile){
        super(uploadData);  //继承父类属性
        setTimeout(()=>{
            this.getPosNeg();
            this.getTable();
        }, 500)
    }

    protected getPosNeg () {
        for (let i = 0; i < this.xList.length; i++) {
            if (this.xList[i + 1] < this.xList[i]) {
                this.xPosList = this.xList.slice(0, i)
                this.yPosList = this.yList.slice(0, i)
                this.xNegList = this.xList.slice(i)
                this.yNegList = this.yList.slice(i)

                break
            }
        }
    }

    protected getTable() {
        this.posJsc = this.getJsc(this.xPosList, this.yPosList) as number
        this.negJsc = this.getJsc(this.xNegList, this.yNegList) as number
        this.posVoc = this.getVoc(this.xPosList, this.yPosList) as number
        this.negVoc = this.getVoc(this.xNegList, this.yNegList) as number
        this.posMax = this.getMax(this.xPosList, this.yPosList)
        this.negMax = this.getMax(this.xNegList, this.yNegList)
        this.posFF = Number((this.posMax / (this.posJsc * this.posVoc)).toFixed(2))
        this.negFF = Number((this.negMax / (this.negJsc * this.negVoc)).toFixed(2))
        this.posEff = Number((this.posMax * 0.01 * 0.001 * 100).toFixed(2))
        this.negEff = Number((this.negMax * 0.01 * 0.001 * 100).toFixed(2))

        this.table = [
            {
                scan: '正扫',
                Jsc: this.posJsc,
                Voc: this.posVoc,
                FF: this.posFF,
                Eff: this.posEff
            },
            {
                scan: '反扫',
                Jsc: this.negJsc,
                Voc: this.negVoc,
                FF: this.negFF,
                Eff: this.negEff
            }
        ]
    }

    protected getJsc (xList: number[], yList: number[]) {
        for (let i = 0; i < xList.length; i++) {
            if (xList[i] * xList[i + 1] < 0) {
                const edge = this.getEdge(xList, yList, i)
                const xTinyList = this.getList(xList, i-edge, i+1+edge)
                const yTinyList = this.getList(yList, i-edge, i+1+edge)

                const {Kreturn, Breturn} = linerFitting(xTinyList, yTinyList)
                return Number(Breturn.toFixed(2))
            }
        }
    }

    protected getVoc (xList: number[], yList: number[]) {
        for (let i = 0; i < yList.length; i++) {
            if ((yList[i] * yList[i + 1] < 0)) {
                const edge = this.getEdge(xList, yList, i)
                const xTinyList = this.getList(xList, i-edge, i+1+edge)
                const yTinyList = this.getList(yList, i-edge, i+1+edge)

                const {Kreturn, Breturn} = linerFitting(xTinyList, yTinyList)
                return Number((-Breturn / Kreturn).toFixed(2))
            }
        }
    }

    protected getEdge (xList: number[], yList: number[], index: number) {
        const edge = 5
        for(let i = edge; i > 0; i--) {
            if(xList[index-i] !== undefined 
                && xList[index+1+i] !== undefined 
                && yList[index-i] !== undefined 
                && yList[index+1+i] !== undefined) {
                    return i
                }
        }
        return 0
    }

    protected getList (list: number[], start: number, end: number) {
        const tinyList = []
        for(let i = start; i < end; i++) {
            tinyList.push(list[i])
        }
        return tinyList
    }
    
    protected getMax (xList: number[], yList: number[]) {
        const list = []
        for (let i = 0; i < xList.length; i++) {
            list.push(xList[i]*yList[i])
        }
        return Math.max(...list)
    }
}

export default JVechart;