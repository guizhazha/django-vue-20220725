import Option from '@/utils/deal/option/Option'

class JVoption extends Option{
    protected xPosList: number[] = [];
    protected yPosList: number[] = [];
    protected xNegList: number[] = [];
    protected yNegList: number[] = [];
    
    constructor(response: {[key: string]: string|number[]}){
        super(response);  //继承父类属性

        this.xPosList = response.xPosList as number[]
        this.yPosList = response.yPosList as number[]
        this.xNegList = response.xNegList as number[]
        this.yNegList = response.yNegList as number[]
    }

    protected getLegend() {
        return {
            show: true,
            orient: 'horizontal',
            align: 'left',
            itemGap: 4,

            x:'center',
            y:'top',
            top: "8%",

            textStyle: this.getTextStyle(),

            data: [
                {
                    name: '正扫',
                    icon: 'path:// M928 480v32H96v-32z',
                },
                {
                    name: '反扫',
                    icon: 'path:// M928 480v32H96v-32z',
                }
            ]
        }
    }

    protected getGrid() {
        return {
            show: true,
            left: "10%",
            right: "10%",
            top: "20%",
            bottom: "10%",
    
            containLabel: true,
    
            borderColor: 'black',
            borderWidth: 2,
        }
    }

    protected getxAxis() {
        return {
            show: true,
            position: 'bottom',
            name: this.xAxisName,
            nameLocation: 'middle',
            nameGap: 24,

            min: 0,

            ...this.getAxis()
        }
    }

    protected getJVseries() {
        return [
            {
                type: 'line',
                name: '正扫',
                showSymbol: false,
                data: this.getSeriesData(this.xPosList, this.yPosList)
            },
            {
                type: 'line',
                name: '反扫',
                showSymbol: false,
                data: this.getSeriesData(this.xNegList, this.yNegList)
            }
        ]
    }

    getJVoption() {
        return {
            title: this.getTitle(),
            legend: this.getLegend(),
            grid: this.getGrid(),
            xAxis: this.getxAxis(),
            yAxis: this.getyAxis(),
            tooltip: this.getTooltip(),
            toolbox: this.getToolbox(),
            series: this.getJVseries(),
        }
    }
}

export default JVoption;