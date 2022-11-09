import EchartData from '@/utils/deal/echart/EchartData'
import type { UploadFile } from 'element-plus'

class ABSechart extends EchartData{
    constructor(uploadData: UploadFile){
        super(uploadData);  //继承父类属性

        setTimeout(()=>{
            this.x2AxisName = 'hv'
            this.getx2List()
            this.y2AxisName = this.yAxisName
            this.y2List = this.yList
        }, 500)
    }

    protected getx2List() {
        for(let i=0; i<this.xList.length; i++) {
            this.x2List.push(1240 / this.xList[i])
        }
    }
}

export default ABSechart;
