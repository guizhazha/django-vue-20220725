class Option {
    protected dataName = '';
    protected xAxisName = '';
    protected yAxisName = '';
    protected xList: number[] = [];
    protected yList: number[] = [];

    constructor(response: {[key: string]: string|number[]}) {
        this.dataName = response.dataName as string
        this.xAxisName = response.xAxisName as string
        this.yAxisName = response.yAxisName as string
        this.xList = response.xList as number[]
        this.yList = response.yList as number[]
    }

    protected getTitle() {
        return {
            show: true,
            text: this.dataName,
            
            x:'center',
            y:'top',
    
            textStyle: this.getTextStyle(),
        }
    }

    protected getGrid() {
        return {
            show: true,
            left: "10%",
            right: "10%",
            top: "10%",
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

            min: Math.floor(Math.min(...this.xList)),

            ...this.getAxis()
        }
    }

    protected getyAxis() {
        return {
            show: true,
            name: this.yAxisName,
            nameLocation: 'middle',
            nameRotate: 90,
            nameGap: Math.floor(Math.max(...this.yList)) > 1000 ? 42 : 24,
            
            min: 0,

            ...this.getAxis()
        }
    }

    protected getTooltip() {
        return {
            show: true,
            trigger: 'axis'
        }
    }

    protected getToolbox() {
        return {
            show: true,
            orient: 'vertical',
    
            itemSize: 16,
            itemGap: 4,
    
            showTitle: true,
    
            feature: {
                saveAsImage: {
                show: true,
                excludeComponents: ['toolbox'],
                pixelRatio: 15
                },
                // dataView: {
                //     show: true,
                //     readOnly: true,
                // },
                dataZoom: {
                    show: true,
                    yAxisIndex: "none"
                },
                // magicType: {
                //     show: true,
                //     type: ['line', 'bar']
                // },
                restore: {
                    show: true,
                },
            }
        }
    }

    protected getSeries() {
        return {
            type: 'line',
            showSymbol: false,
            data: this.getSeriesData(this.xList, this.yList)
        }
    }

    protected getSeriesData (xList: number[], yList: number[]) {
        const seriesData = []
        for(let i=0; i<xList.length; i++) {
            seriesData.push([xList[i], yList[i]])
        }
        return seriesData
    }

    protected getTextStyle () {
        return {
            // 字体类型
            fontFamily: 'sans-serif',
            // 字宽
            fontWeight: 'normal',
            // 字体大小
            fontSize: 16,
    
            color: 'black'
        }
    }

    protected getAxis() {
        return {
            splitLine: { 
                // 网格线
                show: false
            },

            axisTick: {
                show: true,
                // y轴刻度向下延展
                length: 8,
                // 刻度方向朝内
                inside: true,
            },

            axisLabel: {
                show: true,
                rotate: 0,

                margin: 8,

                showMinLabel: true,
                showMaxLabel: true,
            }
        }
    } 

    getOption() {
        return {
            title: this.getTitle(),
            grid: this.getGrid(),
            xAxis: this.getxAxis(),
            yAxis: this.getyAxis(),
            tooltip: this.getTooltip(),
            toolbox: this.getToolbox(),
            series: this.getSeries(),
        }
    }
}

export default Option;