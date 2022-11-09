class XAxis {
    protected number;
    protected dataNames;
    protected xAxisName;
    protected xLists;

    constructor( dataNames: string[], xAxisName: string, xLists: number[][]){
        this.number = dataNames.length
        this.dataNames = dataNames
        this.xAxisName = xAxisName
        this.xLists = xLists
    }

    protected xAxis={
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
    getJVxAxis() {
        return {
            show: this.xAxis.isShow,
            position: 'bottom',
            name: this.xAxisName,
            nameLocation: 'middle',
            nameGap: this.xAxis.nameGap,

            min: this.xAxis.min,

            splitLine: { 
                // 网格线
                show: false
            },

            axisTick: {
                show: this.xAxis.isShowTick,
                // y轴刻度向下延展
                length: 4,
                // 刻度方向朝内
                inside: true,
            },

            axisLabel: {
                show: this.xAxis.isShowLabel,
                rotate: 0,
                margin: this.xAxis.labelMargin,
                showMinLabel: true,
                showMaxLabel: true,
            },

            nameTextStyle: {
                fontFamily: this.xAxis.fontFamily,
                fontWeight: this.xAxis.fontWeight,
                fontSize: this.xAxis.fontSize,
                color: 'black'
            }
        }
    }

    getxAxis() {
        this.xAxis.min = this.getXMin()
        return {
            ...this.getJVxAxis()
        }
    }
    protected getXMin() {
        const min: number[] = []
        for(const xList of this.xLists) {
            min.push(Math.min(...xList))
        }
        return Math.floor(Math.min(...min))
    }

    getXRDxAxis() {
        const xAxis = []

        this.xAxis.isShow = false
        for(let i=0; i < this.number-1; i++) {
            xAxis.push(
                {
                    gridIndex: i,
                    ...this.getxAxis()
                },
            )
        }
        this.xAxis.isShow = true
        xAxis.push(
            {
                gridIndex: this.number-1,
                ...this.getxAxis()
            },
        )

        return xAxis
    }

    getPLxAxis() {
        const xAxis = []
        xAxis.push(this.getxAxis())

        xAxis.push(
            {
                gridIndex: 1,

                splitLine: { 
                    // 网格线
                    show: false
                },
            
                axisLabel: {
                    show: false
                },
                
                type: 'category',
                boundaryGap: true,
                data: this.getPLxList(),
            },
        )
        return xAxis
    }
    protected getPLxList() {
        const xlist: string[] = []
        for(const name of this.dataNames) {
            xlist.push(name)
        }
        return xlist
    }
}

export default XAxis;