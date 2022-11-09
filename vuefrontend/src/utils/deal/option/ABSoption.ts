import Option from '@/utils/deal/option/Option'
import { linerFitting } from '@/utils/deal/linerFitting'

class ABSoption extends Option{
    protected x2AxisName = '';
    protected x2List: number[] = []; 

    constructor(response: {[key: string]: string|number[]}){ 
        super(response);  //继承父类属性

        this.x2AxisName = response.x2AxisName as string
        this.x2List = response.x2List as number[]
    }
    
    protected getLegend() {
        return {
            show: true,
            orient: 'vertical',
            align: 'left',
            itemGap: 4,

            x:'center',
            y:'top',
            top: "54%",
            left: "18%",

            data: [
                {
                    name: '实线',
                    icon: 'path:// M928 480v32H96v-32z',
                },
                {
                    name: '虚线',
                    icon: 'path:// M112 476h160v72H112z m320 0h160v72H432z m320 0h160v72H752z',
                }
            ]
        }
    }

    protected getABSGrid() {
        return [
            {
                show: true,
                top: '5%',
                right: '15%',
                left: '15%',
                height: '35%',
                borderColor: 'black',
                borderWidth: 1,
            },
            {
                show: true,
                top: '55%',
                right: '15%',
                left: '15%',
                height: '35%',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    }

    protected getABSxAxis() {
        return [
            {
                show: true,
                position: 'bottom',
                name: this.xAxisName,
                nameLocation: 'middle',
                nameGap: 20,

                min: Math.floor(Math.min(...this.xList)),

                ...this.getAxis()
            },
            {
                show: true,

                min: 0,

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
                },

                gridIndex: 1,
            }
        ]
    }

    protected getABSyAxis() {
        return [
            {
                show: true,
                name: this.yAxisName,
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 42,
                
                min: 0,

                gridIndex: 0,

                ...this.getAxis()
            },
            {
                show: true,
                name: '',
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: 42,
                
                min: 0,
                max: Math.ceil(Math.max(...this.yList)),

                gridIndex: 1,

                ...this.getAxis()
            }
        ]
    }

    protected getABSseries() {
        return [
            {
                type: 'line',
                showSymbol: false,
                data: this.getSeriesData(this.xList, this.yList),

                xAxisIndex: 0,
                yAxisIndex: 0,
            },
            {
                type: 'line',
                name: '实线',
                showSymbol: false,
                data: this.getSeriesData(this.x2List, this.yList),

                xAxisIndex: 1,
                yAxisIndex: 1,
            },
            {
                ...this.getKB(),
            },
        ]
    }
    protected getKB() {
        const gap = (Math.max(...this.x2List) - Math.min(...this.x2List)) / this.x2List.length;
        const gapList: number[] = []
        let flag = false
        for(let i=0; i<this.x2List.length - 1; i++) {
            const deri = (this.yList[i+1]-this.yList[i]) / gap
            if(deri>1) {
                flag = true
            }
            if(flag){
                gapList.push(deri)
                if(deri<0){
                    break
                }
            }
        }

        const deriList: number[][] = []
        for(let i=0; i<this.x2List.length - 1; i++) {
            const deri = (this.yList[i+1]-this.yList[i]) / gap
            if(deri > Math.max(...gapList)*0.5) {
                deriList.push([i, this.x2List[i], this.yList[i]])
            }
        }

        const derixList = []
        const deriyList = []
        for(let i=0; i<deriList.length-1; i++) {
            if(deriList[i+1][0] - deriList[i][0] === 1) {
                derixList.push(deriList[i][1])
                deriyList.push(deriList[i][2])
            } else {
                break
            }
        }

        let {Kreturn, Breturn} = linerFitting(derixList, deriyList)
        Kreturn = Number(Kreturn.toFixed(2))
        Breturn = Number(Breturn.toFixed(2))

        const xList: number[] = []
        const yList: number[] = []
        for(let i=0; i<Math.ceil(this.x2List[this.x2List.length - 1]); i+=0.1) {
            xList.push(i)
            yList.push(Breturn + i * Kreturn)
        }
        
        return {
            type: 'line',
            name: '虚线',
            showSymbol: false,
            itemStyle:{
                normal:{
                    lineStyle:{
                        width:2,
                        type:'dotted'  //'dotted'虚线 'solid'实线
                    }
                }
            },
            data: this.getSeriesData(xList, yList),
            markPoint: {
                data: [{ value: (-Breturn / Kreturn).toFixed(2), xAxis: (-Breturn / Kreturn), yAxis: 0 }],
                symbol: "arrow",
                symbolSize: 24,
                symbolRotate: -90,
                symbolOffset: [-6, 0]
            },

            xAxisIndex: 1,
            yAxisIndex: 1,
        }
    }

    getABSoption() {
        return {
            legend: this.getLegend(),
            grid: this.getABSGrid(),
            xAxis: this.getABSxAxis(),
            yAxis: this.getABSyAxis(),
            tooltip: this.getTooltip(),
            toolbox: this.getToolbox(),
            series: this.getABSseries(),
        }
    }
}

export default ABSoption;