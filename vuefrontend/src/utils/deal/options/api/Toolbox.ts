class Toolbox {
    protected toolbox={
        left: '12%', 
        top: '3%',
    }
    getToolbox() {
        return {
            show: true,
            orient: 'horizontal',

            left: this.toolbox.left,
            top: this.toolbox.top,

            itemSize: 16,
            itemGap: 4,

            showTitle: true,

            feature: {
                saveAsImage: {
                show: true,
                excludeComponents: ['toolbox'],
                pixelRatio: 15
                },
                dataZoom: {
                    show: true,
                    yAxisIndex: "none"
                }
            }
        }
    }

    getXRDToolbox() {
        this.toolbox.top = '4px'
        return {
            ...this.getToolbox()
        }
    }
}

export default Toolbox;