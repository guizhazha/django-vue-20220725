class EchartShowData {
    public id = 0
    public card = ''
    protected name = ''
    protected testTime = ''
    protected createdAt = ''
    public processId = ''
    protected sampleId = ''
    protected rank = 0
    protected data = ''
    public file = ''
    protected isPublic = false
    protected isShow = true
    protected hasPrivilege = false
    protected isEdit = false

    protected dataName = '';
    protected xAxisName = '';
    protected yAxisName = '';
    protected x2AxisName = '';
    protected y2AxisName = '';
    protected xList: number[] = [];
    protected yList: number[] = [];
    protected x2List: number[] = [];
    protected y2List: number[] = [];

    protected columnNumber = 0;

    constructor(response: EchartShowData) {
        this.id = response.id as number
        this.card = response.card as string
        this.name = response.name as string

        const testTime = response.testTime  as string
        this.testTime = '20' + testTime.slice(0, 2) + '-' + testTime.slice(2, 4) + '-' + testTime.slice(4, 6)

        const createdAt = response.createdAt as string
        this.createdAt = '20' + createdAt.slice(0, 2) + '-' + createdAt.slice(2, 4) + '-' + createdAt.slice(4, 6)

        this.processId = response.processId as string
        this.sampleId = response.sampleId as string

        this.rank = response.rank as number
        this.data = response.data as string
        this.file = response.file as string

        this.isPublic = response.isPublic as boolean
        this.isShow = response.isShow as boolean
        this.hasPrivilege = response.hasPrivilege as boolean

        this.dataName = response.dataName as string
        this.getAxisName(response)
    }

    protected getAxisName(response: EchartShowData) {
        
        const lineList = response.data

        const separator = ','
        
        this.columnNumber = lineList[0].split(separator).length
        if( this.columnNumber > 2) {
            this.xAxisName = lineList[0].split(separator)[0].trim();
            this.yAxisName = lineList[0].split(separator)[1].trim();
            this.y2AxisName = lineList[0].split(separator)[2].trim();
            
            for (let i=1; i<lineList.length; i++) {
                if (lineList[i].length !== 0) {
                    this.xList.push(Number(lineList[i].split(separator)[0].trim()))
                    this.yList.push(Number(lineList[i].split(separator)[1].trim()))
                    this.y2List.push(Number(lineList[i].split(separator)[2].trim()))
                }
            }
        } else {
            this.xAxisName = lineList[0].split(separator)[0].trim();
            this.yAxisName = lineList[0].split(separator)[1].trim();
            
            for (let i=1; i<lineList.length; i++) {
                if (lineList[i].length !== 0) {
                    this.xList.push(Number(lineList[i].split(separator)[0].trim()))
                    this.yList.push(Number(lineList[i].split(separator)[1].trim()))
                }
            }
        }
    }
    
}

export default EchartShowData;
