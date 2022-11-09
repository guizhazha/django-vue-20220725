class Legend {
    protected dataNames
    protected yAxisName
    protected y2AxisName

    constructor(dataNames: string[], yAxisName: string, y2AxisName: string) {
        this.dataNames = dataNames
        this.yAxisName = yAxisName
        this.y2AxisName = y2AxisName
    }

    protected other={
        type: 'scroll',
        itemGap: 4,
        top: '10%',
        left: '60%',
        height: '80%',
        fontFamily: 'sans-serif',
        fontWeight: 400,
        fontSize: 10
    }
    getLegendOther() {
        return {
            show: true,
            // 可滚动
            type: this.other.type,

            orient: 'vertical',
            align: 'left',
            itemGap: this.other.itemGap,

            top: this.other.top,
            left: this.other.left,
            height: this.other.height,

            textStyle: {
                fontFamily: this.other.fontFamily,
                fontWeight: this.other.fontWeight,
                fontSize: this.other.fontSize,
                color: 'black'
            }
        }
    }

    getLegendData() {
        const legendData = []
        for(const name of this.dataNames) {
            legendData.push(
                {
                    name: name,
                    icon: 'path:// M928 480v32H96v-32z',
                }
            )
        }
        return legendData
    }

    getLegendJVData() {
        const legendData = []
        for(const name of this.dataNames) {
            legendData.push(
                {
                    name: name + '-正扫',
                    icon: 'path:// M928 480v32H96v-32z',
                },
                {
                    name: name + '-反扫',
                    icon: 'path:// M928 480v32H96v-32z',
                }
            )
        }
        return legendData
    }

    getLegendXRDOther() {
        this.other.type = 'plain'
        this.other.itemGap = 200
        this.other.top = '50px'
        this.other.left = '60%'
        this.other.height = 'auto'

        return {
            ...this.getLegendOther()
        }
    }

    getLegendIPCEOther() {
        this.other.left = '20%'

        return {
            ...this.getLegendOther()
        }
    }

    getLegendIPCEData() {
        const legendData = []
        for(const name of this.dataNames) {
            legendData.push(
                {
                    name: name + '-' + this.yAxisName,
                    icon: 'path:// M928 480v32H96v-32z',
                },
                {
                    name: name + '-' + this.y2AxisName,
                    icon: 'path:// M928 480v32H96v-32z',
                }
            )
        }
        return legendData
    }

    getLegendPLData() {
        const legendData = []
        for(const name of this.dataNames) {
            legendData.push(
                {
                    name: name,
                    icon: 'path:// M928 480v32H96v-32z',
                }
            )
        }
        // 添加一个折线图
        legendData.push(
            {
                name: '峰值折线图',
                icon: 'path:// M928 96v832h-832v-832h832z m-89.6 89.6H185.6v652.8h652.8V185.6z m-151.424 157.696l69.76 56.064-172.8 212.8L457.344 506.24l-123.136 151.424-69.76-56.128 180.672-222.272 126.848 105.984 115.008-142.016z',
            }
        )
        return legendData
    }
    
}

export default Legend;