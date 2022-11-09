import Option from '@/utils/deal/option/Option'

class IPCEoption extends Option{
    protected y2AxisName = '';
    protected y2List: number[] = [];

    constructor(response: {[key: string]: string|number[]}){ 
        super(response);  //继承父类属性

        this.y2AxisName = response.y2AxisName as string
        this.y2List = response.y2List as number[]
    }

    protected getIPCEyAxis() {
        return [
            {
                show: true,
                position: 'left',
                name: this.yAxisName,
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 42,
                
                min: 0,

                ...this.getAxis()
            },
            {
                show: true,
                position: 'right',
                name: this.y2AxisName,
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 48,
                
                min: 0,

                ...this.getAxis()
            }
        ]
    }

    protected getIPCEseries() {
        return [
            {
                type: 'line',
                showSymbol: false,
                data: this.getSeriesData(this.xList, this.yList)
            },
            {
                type: 'line',
                showSymbol: false,
                data: this.getSeriesData(this.xList, this.y2List),
                yAxisIndex: 1
            }
        ]
    }

    getIPCEoption() {
        return {
            title: this.getTitle(),
            grid: this.getGrid(),
            xAxis: this.getxAxis(),
            yAxis: this.getIPCEyAxis(),
            tooltip: this.getTooltip(),
            toolbox: this.getToolbox(),
            series: this.getIPCEseries(),
        }
    }
}

export default IPCEoption;