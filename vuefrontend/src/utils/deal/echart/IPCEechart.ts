import EchartData from '@/utils/deal/echart/EchartData'
import type { UploadFile } from 'element-plus'

class IPCEechart extends EchartData{
    constructor(uploadData: UploadFile){
        super(uploadData);  //继承父类属性

        
        setTimeout(()=>{
            if(this.columnNumber < 6) {
                this.y2AxisName = 'current'
                this.gety2List()
            }
        }, 500)
    }

    protected gety2List() {
        const mulList = []
        const gap = (Math.max(...this.xList) - Math.min(...this.xList)) / this.xList.length;
        for(let i=0; i<this.xList.length; i++) {
            mulList.push(1.6 * this.xList[i] * this.yList[i] * gap)
        }

        let sum = 0
        for(let i=0; i<mulList.length; i++) {
            sum += mulList[i]
            this.y2List.push(sum)
        }
    }
}

export default IPCEechart;
