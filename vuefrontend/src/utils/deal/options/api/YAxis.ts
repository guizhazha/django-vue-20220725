class YAxis {
    protected number;
    protected dataNames;
    protected yAxisName;
    protected y2AxisName;
    protected xLists;
    protected yLists;

    constructor( dataNames: string[], yAxisName: string, y2AxisName: string, xLists: number[][], yLists: number[][]){
        this.number = dataNames.length
        this.dataNames = dataNames
        this.yAxisName = yAxisName
        this.y2AxisName = y2AxisName
        this.xLists = xLists
        this.yLists = yLists
    }

    protected yAxis={
        isShow: true,
        nameGap: 36,
        min: 0,
        isShowTick: true,
        isShowLabel: true,
        labelMargin: 8,
        fontFamily: 'sans-serif',
        fontWeight: 400,
        fontSize: 10
    }
    getyAxis() {
        return {
            show: this.yAxis.isShow,
            position: 'bottom',
            name: this.yAxisName,
            nameLocation: 'middle',
            nameGap: this.yAxis.nameGap,

            min: this.yAxis.min,

            splitLine: { 
                // 网格线
                show: false
            },

            axisTick: {
                show: this.yAxis.isShowTick,
                // y轴刻度向下延展
                length: 4,
                // 刻度方向朝内
                inside: true,
            },

            axisLabel: {
                show: this.yAxis.isShowLabel,
                rotate: 0,
                margin: this.yAxis.labelMargin,
                showMinLabel: true,
                showMaxLabel: true,
            },

            nameTextStyle: {
                fontFamily: this.yAxis.fontFamily,
                fontWeight: this.yAxis.fontWeight,
                fontSize: this.yAxis.fontSize,
                color: 'black'
            }
        }
    }

    getXRDyAxis() {
        const yAxis = []
        this.yAxis.isShowTick = false
        this.yAxis.isShowLabel = false
        for(let i=0; i < this.number; i++) {
            yAxis.push(
                {
                    gridIndex: i,
                    ...this.getyAxis()
                },
            )
        }
        return yAxis
    }

    getIPCEyAxis() {
        const yAxis = []
        yAxis.push(
            {
                ...this.getyAxis(),
                position: 'left',
            }
        )
        this.yAxis.nameGap = 50
        yAxis.push(
            {
                ...this.getyAxis(),
                position: 'right',
                name: this.y2AxisName,
            }
        )
        return yAxis
    }

    getPLyAxis() {
        const yAxis = []
        this.yAxis.isShowTick = false
        this.yAxis.isShowLabel = false
        yAxis.push(this.getyAxis())

        this.yAxis.isShowTick = true
        this.yAxis.isShowLabel = true
        this.yAxis.min =  Math.min(...this.getMaxX()),
        yAxis.push(
            {
                gridIndex: 1,
                ...this.getyAxis(),

                type: 'value',
                max: Math.max(...this.getMaxX()),
            },
        )
        return yAxis
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

export default YAxis;