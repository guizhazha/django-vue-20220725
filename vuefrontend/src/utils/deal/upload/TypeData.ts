import EchartData from '@/utils/deal/echart/EchartData'

import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { getCard } from "@/utils/cookies/cookies";

import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'
import type { UploadFile } from 'element-plus'
import { getToday } from '@/utils/component/date'

class TypeData extends EchartData{
    protected separator = '';
    protected startNumber = 0;

    public testTime = '';
    public processId = '';
    public sampleId = '';
    public isSuccess = true
    public message = '未知'
    public rank = '0'

    constructor(uploadData: UploadFile) {
        super(uploadData);  //继承父类属性

        this.getNameSplit(uploadData.name)
        this.getBackMessage()
        if(this.isSuccess) {
            this.check()
        }
    }

    protected getNameSplit(name: string) {
        this.testTime = name.split('-')[0]
        this.processId = name.split('-')[1]
        this.sampleId = name.split('-')[2]
    }

    protected getBackMessage() {
        if (this.dataName.split('-').length <= 3) {
            this.isSuccess = false
            this.message = '请用“-”分割测试时间、工艺号、样品号'
            return
        }
        if (this.testTime.length !== 6) {
            this.isSuccess = false
            this.message = '测试时间为6位数字,XX(年份)XX(月份)XX(日期)'
            return
        }
        if (this.processId.length !== 3) {
            this.isSuccess = false
            this.message = '工艺号为3位数字,XXX(例:007)'
            return
        }
        if (this.sampleId.length !== 3) {
            this.isSuccess = false
            this.message = '样品号为3位数字,XXX(例:012)'
            return
        }
    }

    protected check() {
        const route = changeRoute()
        const { dataType } = storeToRefs(route)

        axios.post(
            'ExperiData/check/',
            {
                userInfo: getCard(),
                dataType: dataType.value,
                dataName: this.dataName,
            }
        ).then(
            (response: AxiosResponse) => {
                // 表示有个重名的
                this.isSuccess = false
                this.message = '该文件之前已上传，不可重复上传！！！'
                console.log('response', response)
            }
        ).catch(
            (error: AxiosError) => {
                this.isSuccess = true
                this.message = '可以上传'
                console.log('error', error)
                return this.uploadData()
            }
        )
    }

    protected uploadData() {
        const route = changeRoute()
        const { dataType } = storeToRefs(route)

        let text = '';
        if(this.y2AxisName !== '') {
            text = this.xAxisName + ',' + this.yAxisName + ',' + this.y2AxisName + '\r\n'
            for(let i=0; i<this.xList.length; i++) {
                text += this.xList[i] + ',' + this.yList[i] + ',' + this.y2List[i] + '\r\n'
            }
        } else {
            text = this.xAxisName + ',' + this.yAxisName + '\r\n'
            for(let i=0; i<this.xList.length; i++) {
                text += this.xList[i] + ',' + this.yList[i] + '\r\n'
            }
        }

        const blob = new Blob([text], {type: 'text/csv'})
        const file = new File([blob], this.dataName.split('.')[0] + '.csv', {type: 'text/csv'})

        const formData: FormData = new FormData()

        formData.append('dataType', dataType.value)
        formData.append('testTime', this.testTime)
        formData.append('createdAt', getToday())
        formData.append('processId', this.processId)
        formData.append('sampleId', this.sampleId)
        formData.append('dataName', this.dataName)
        formData.append('data', file)
        formData.append('rank', this.rank || '')
        formData.append('userInfo', getCard() || '')

        axios.post(
            'ExperiData/upload/',
            formData
        ).then(
            (response: AxiosResponse) => {
                console.log('promiseReader')
            }
        ).catch(
            (error: AxiosError) => {
                console.log('promiseReader')
            }
        )
    }
}

export default TypeData;
