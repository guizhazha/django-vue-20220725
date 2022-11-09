import type { UploadFile } from 'element-plus'

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

class EchartData {
    public dataName = '';
    public xAxisName = '';
    public yAxisName = '';
    public x2AxisName = '';
    public y2AxisName = '';
    public xList: number[] = [];
    public yList: number[] = [];
    public x2List: number[] = [];
    public y2List: number[] = [];

    protected columnNumber = 0;
    protected separator = '\t';
    protected nameLine = 0
    protected dataLine = 1   // 此行为数值列首行

    constructor(uploadData: UploadFile) {
        this.dataName = uploadData.name

        this.setSeparator(uploadData.name.split('.').pop() as string)

        this.getReader(uploadData)
    }

    protected setSeparator(type: string) {
        if (type.toLowerCase() == 'xls') {
            this.separator = '\t'
        } else if (type.toLowerCase() == 'csv') {
            this.separator = ','
        } else if (type.toLowerCase() == 'txt') {
            this.separator = '\t'
        }
    }
    protected getDataLine(lineList: string[]) {
        for (let i=0; i<lineList.length; i++) {
            if(!isNaN(Number(lineList[i].split(this.separator)[0])) 
                && !isNaN(Number(lineList[i].split(this.separator)[1])) 
                && !isNaN(Number(lineList[i + 1].split(this.separator)[0]))
                && !isNaN(Number(lineList[i + 1].split(this.separator)[1]))
                && !isNaN(Number(lineList[i + 2].split(this.separator)[0]))
                && !isNaN(Number(lineList[i + 2].split(this.separator)[1]))
                && !isNaN(Number(lineList[i + 3].split(this.separator)[0]))
                && !isNaN(Number(lineList[i + 3].split(this.separator)[1]))
                ) {
            
                this.dataLine = i
                for (let j=this.dataLine - 1; j>=0; j--) {
                    if (lineList[j].split(this.separator)[0].match(/^\s+$/)) {
                        continue
                    } else {
                        this.nameLine = j
                        this.columnNumber = lineList[j].split(this.separator).length
                        return
                    }
                }
            }
        }
    }
    protected getData(lineList: string[]) {
        this.xAxisName = lineList[this.nameLine].split(this.separator)[0].trim();
        this.yAxisName = lineList[this.nameLine].split(this.separator)[1].trim();
        
        for (let i=this.dataLine; i<lineList.length; i++) {
            if (lineList[i].length !== 0) {
                this.xList.push(Number(lineList[i].split(this.separator)[0].trim()))
                this.yList.push(Number(lineList[i].split(this.separator)[1].trim()))
            }
        }
    }
    protected getDataIPCE(lineList: string[]) {
        this.xAxisName = lineList[this.nameLine].split(this.separator)[0].trim();
        this.yAxisName = lineList[this.nameLine].split(this.separator)[3].trim();
        this.y2AxisName = lineList[this.nameLine].split(this.separator)[2].trim();
        
        for (let i=this.dataLine; i<lineList.length; i++) {
            if (lineList[i].length !== 0) {
                this.xList.push(Number(lineList[i].split(this.separator)[0].trim()))
                this.yList.push(Number(lineList[i].split(this.separator)[3].trim()))
                this.y2List.push(Number(lineList[i].split(this.separator)[2].trim()))
            }
        }
    }
    protected getDataABS(lineList: string[]) {
        this.xAxisName = lineList[this.nameLine].split(this.separator)[this.columnNumber-2].trim();
        this.yAxisName = lineList[this.nameLine].split(this.separator)[this.columnNumber-1].trim();
        
        for (let i=this.dataLine; i<lineList.length; i++) {
            if (lineList[i].length !== 0) {
                this.xList.push(Number(lineList[i].split(this.separator)[this.columnNumber-2].trim()))
                this.yList.push(Number(lineList[i].split(this.separator)[this.columnNumber-1].trim()))
            }
        }
    }

    protected getReader(uploadData: UploadFile) {
        const reader = new FileReader()
        reader.readAsText(uploadData.raw as Blob, 'GB2312')

        reader.onload = async () => {
            const data = reader.result as string
            const lineList: string[] = data.split('\n')

            this.getDataLine(lineList)
            
            const route = changeRoute()
            const { dataType } = storeToRefs(route)

            console.log(dataType.value, dataType.value in ['JV', 'XRD', 'PL'])
            if(['JV', 'XRD', 'PL'].includes(dataType.value)) {
                this.getData(lineList)
            } else if(dataType.value == 'IPCE') {
                if( this.columnNumber > 6) {
                    this.getDataIPCE(lineList)
                } else {
                    this.getData(lineList)
                }
            } else if (dataType.value == 'ABS') {
                this.getDataABS(lineList)
            }
        }
    }
}

export default EchartData;
