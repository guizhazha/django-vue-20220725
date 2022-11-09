class Series {
    protected number;
    protected dataNames;
    protected xLists;
    protected yLists;
    protected y2Lists;
    protected yAxisName
    protected y2AxisName

    protected responses
    protected xPosLists: number[][] = [];
    protected yPosLists: number[][] = [];
    protected xNegLists: number[][] = [];
    protected yNegLists: number[][] = [];

    constructor(
        responses: {[key: string]: string|number[]}[], 
        dataNames: string[], 
        xLists: number[][], 
        yLists: number[][], 
        y2Lists: number[][],
        yAxisName: string,
        y2AxisName: string
        ){
        this.responses = responses
        this.number = dataNames.length
        this.dataNames = dataNames
        this.xLists = xLists
        this.yLists = yLists
        this.y2Lists = y2Lists
        this.yAxisName = yAxisName
        this.y2AxisName = y2AxisName
    }

    getSeries() {
        const series: {[key: string]: string|boolean|number[][]}[] = []
        for(let i=0; i<this.number; i++) {
            series.push(
                {
                    type: 'line',
                    showSymbol: false,
                    name: this.dataNames[i],
                    data: this.getSeriesData(this.xLists[i], this.yLists[i])
                }
            )
        }
        return series
    }
    protected getSeriesData (xList: number[], yList: number[]) {
        const seriesData = []
        for(let i=0; i<xList.length; i++) {
            seriesData.push([xList[i], yList[i]])
        }
        return seriesData
    }

    getJVSeries() {
        this.getPosNeg()

        const series: {[key: string]: string|boolean|number[][]}[] = []
        for(let i=0; i<this.number; i++) {
            series.push(
                {
                    type: 'line',
                    name: this.dataNames[i] + '-正扫',
                    showSymbol: false,
                    data: this.getSeriesData(this.xPosLists[i], this.yPosLists[i])
                },
                {
                    type: 'line',
                    name: this.dataNames[i] + '-反扫',
                    showSymbol: false,
                    data: this.getSeriesData(this.xNegLists[i], this.yNegLists[i])
                }
            )
        }

        return series
    }
    protected getPosNeg() {
        this.setxPosLists()
        this.setyPosLists()
        this.setxNegLists()
        this.setyNegLists()
    }
    protected setxPosLists() {
        for(const res of this.responses) {
            this.xPosLists.push(res.xPosList as number[])
        }
    }
    protected setyPosLists() {
        for(const res of this.responses) {
            this.yPosLists.push(res.yPosList as number[])
        }
    }
    protected setxNegLists() {
        for(const res of this.responses) {
            this.xNegLists.push(res.xNegList as number[])
        }
    }
    protected setyNegLists() {
        for(const res of this.responses) {
            this.yNegLists.push(res.yNegList as number[])
        }
    }

    getXRDSeries() {
        const series: {[key: string]: string|boolean|number[][]|number}[] = []

        for(let i=0; i<this.dataNames.length; i++) {
            series.push(
                {
                    type: 'line',
                    showSymbol: false,
                    name: this.dataNames[i],
                    data: this.getSeriesData(this.xLists[i], this.yLists[i]),

                    xAxisIndex: i,
                    yAxisIndex: i,
                }
            )
        }
        return series
    }

    getIPCESeries() {
        const series: {[key: string]: string|boolean|number[][]|number|number[]}[] = []
        for(let i=0; i<this.dataNames.length; i++) {
            series.push(
                {
                    type: 'line',
                    showSymbol: false,
                    name: this.dataNames[i] + '-' + this.yAxisName,
                    data: this.getSeriesData(this.xLists[i], this.yLists[i]),
                },
                {
                    type: 'line',
                    showSymbol: false,
                    name: this.dataNames[i] + '-' + this.y2AxisName,
                    data: this.getSeriesData(this.xLists[i], this.y2Lists[i]),
                    yAxisIndex: 1
                }
            )
        }

        return series
    }

    getPLSeries() {
        const series: {[key: string]: string|boolean|number[][]|number|number[]}[] = []
        for(let i=0; i<this.dataNames.length; i++) {
            series.push(
                {
                    type: 'line',
                    showSymbol: false,
                    name: this.dataNames[i],
                    data: this.getSeriesData(this.xLists[i], this.uniformYList(this.yLists[i])),

                    xAxisIndex: 0,
                    yAxisIndex: 0,
                }
            )
        }
        // 添加一个折线图
        series.push(
            {
                type: 'line',
                name: '峰值折线图',
                symbolSize: 18,
                smooth: true,
                colorBy: 'data',

                data: this.getMaxX(),

                xAxisIndex: 1,
                yAxisIndex: 1,
            }
        )

        return series
    }
    protected uniformYList(yList: number[]) {
        const uniYList = []
        const maxY = Math.max(...yList)
      
        for(const y of yList) {
            uniYList.push(y / maxY)
        }
      
        return uniYList
    }
    protected getMaxX() {
        // Y最大时的X值坐标
        const X = []
        for(let i = 0; i < this.dataNames.length; i++) {
            let maxY = this.yLists[i][0]
            let index = 0
            for(let j = 0; j < this.yLists[i].length; j++) {
                if(this.yLists[i][j] > maxY) {
                    maxY = this.yLists[i][j]
                    index = j
                }
            }
            X.push(this.xLists[i][index])
          
        }
        return X
    }
}

export default Series;