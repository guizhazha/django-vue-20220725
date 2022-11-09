import Legend from '@/utils/deal/options/api/Legend'
import Grid from '@/utils/deal/options/api/Grid'
import XAxis from '@/utils/deal/options/api/XAxis'
import YAxis from '@/utils/deal/options/api/YAxis'
import Toolbox from '@/utils/deal/options/api/Toolbox'
import Series from '@/utils/deal/options/api/Series'

class Options {
    protected responses
    protected type

    protected dataNames: string[] = [];
    protected xAxisName
    protected yAxisName
    protected y2AxisName
    protected xLists: number[][] = []
    protected yLists: number[][] = []
    protected y2Lists: number[][] = []
    

    constructor(responses: {[key: string]: string|number[]}[], type: string) {
        this.responses = responses
        this.type = type

        this.setDataNames(responses)

        this.xAxisName = responses[0].xAxisName as string
        this.yAxisName = responses[0].yAxisName as string
        this.y2AxisName = responses[0].y2AxisName as string

        this.setxLists(responses)
        this.setyLists(responses)
        this.sety2Lists(responses)
    }

    protected setDataNames(responses: {[key: string]: string|number[]}[]) {
        for(const res of responses) {
            this.dataNames.push(res.dataName as string)
        }
    }
    protected setxLists(responses: {[key: string]: string|number[]}[]) {
        for(const res of responses) {
            this.xLists.push(res.xList as number[])
        }
    }
    protected setyLists(responses: {[key: string]: string|number[]}[]) {
        for(const res of responses) {
            this.yLists.push(res.yList as number[])
        }
    }
    protected sety2Lists(responses: {[key: string]: string|number[]}[]) {
        for(const res of responses) {
            this.y2Lists.push(res.y2List as number[])
        }
    }

    getOption() {
        const legend = new Legend(this.dataNames, this.yAxisName, this.y2AxisName)
        const grid = new Grid(this.dataNames.length)
        const xAxis = new XAxis(this.dataNames, this.xAxisName, this.xLists)
        
        const yAxis = new YAxis(this.dataNames, this.yAxisName, this.y2AxisName, this.xLists, this.yLists)
        const toolbox = new Toolbox()
        const series = new Series(this.responses, this.dataNames, this.xLists, this.yLists, this.y2Lists, this.yAxisName, this.y2AxisName)

        if(this.type === 'JV') {
            return {
                legend: {
                    ...legend.getLegendOther(),
                    data: legend.getLegendJVData(),
                },
                grid: grid.getGrid(),
                xAxis: xAxis.getJVxAxis(),
                yAxis: yAxis.getyAxis(),
                toolbox: toolbox.getToolbox(),
                series: series.getJVSeries(),
            }
        } else if(this.type === 'XRD') {
            return {
                legend: {
                    ...legend.getLegendXRDOther(),
                    data: legend.getLegendData(),
                },
                grid: grid.getXRDGrid(),
                xAxis: xAxis.getXRDxAxis(),
                yAxis: yAxis.getXRDyAxis(),
                toolbox: toolbox.getXRDToolbox(),
                series: series.getXRDSeries(),
            }
        } else if(this.type === 'IPCE') {
            return {
                legend: {
                    ...legend.getLegendIPCEOther(),
                    data: legend.getLegendIPCEData(),
                },
                grid: grid.getGrid(),
                xAxis: xAxis.getxAxis(),
                yAxis: yAxis.getIPCEyAxis(),
                toolbox: toolbox.getToolbox(),
                series: series.getIPCESeries(),
            }
        } else if(this.type === 'PL') {
            return {
                legend: {
                    ...legend.getLegendOther(),
                    data: legend.getLegendPLData(),
                },
                grid: grid.getPLGrid(),
                xAxis: xAxis.getPLxAxis(),
                yAxis: yAxis.getPLyAxis(),
                toolbox: toolbox.getToolbox(),
                series: series.getPLSeries(),
            }
        } else {
            return {
                legend: {
                    ...legend.getLegendOther(),
                    data: legend.getLegendData(),
                },
                grid: grid.getGrid(),
                xAxis: xAxis.getxAxis(),
                yAxis: yAxis.getyAxis(),
                toolbox: toolbox.getToolbox(),
                series: series.getSeries(),
            }
        }
    }
}

export default Options;