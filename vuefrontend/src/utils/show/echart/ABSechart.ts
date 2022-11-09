import EchartShowData from '@/utils/show/echart/EchartShowData'

class ABSechart extends EchartShowData{
    constructor(response: EchartShowData){
        super(response);  //继承父类属性

        this.x2AxisName = 'hv'
        this.getx2List()
        this.y2AxisName = this.yAxisName
        this.y2List = this.yList
    }

    protected getx2List() {
        for(let i=0; i<this.xList.length; i++) {
            this.x2List.push(1240 / this.xList[i])
        }
    }
}

export default ABSechart;
