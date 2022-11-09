import EchartShowData from '@/utils/show/echart/EchartShowData'

class IPCEechart extends EchartShowData{
    constructor(response: EchartShowData){
        super(response);  //继承父类属性

        if(this.columnNumber <= 2) {
            this.y2AxisName = 'current'
            this.gety2List()
        }
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
