import { defineStore } from "pinia"

import axios from '@/utils/axios/axios'
import type { AxiosResponse, AxiosError } from 'axios'

import EchartData from '@/utils/deal/echart/EchartData'
import TypeData from '@/utils/deal/upload/TypeData'
import EchartShowData from '@/utils/show/echart/EchartShowData'
import JVechart from '@/utils/show/echart/JVechart'
import IPCEechart from '@/utils/show/echart/IPCEechart'
import ABSechart from '@/utils/show/echart/ABSechart'
import { getCard } from "@/utils/cookies/cookies"

export interface routeState {
    curRoute: string;
    curName: string;
    dataType: string;

    // deal
    routeEchart: {[dataType:string]: EchartData[]};
    routeData: {[dataType:string]: TypeData[]};
    routeCheck:{[dataType:string]: {[key: string]: boolean | string | string[]}};

    // show
    responseData: {[item:string]: EchartShowData[]};
    notions: {[item:string]: Set<string>};
}  

export const changeRoute = defineStore({
    id: 'route', 
    state: ():routeState => ({
        curRoute: '/',
        curName: '系统首页',
        dataType: '',

        routeEchart: {},
        routeData: {},
        routeCheck: {},

        responseData: {},
        notions: {},
    }),
    getters: {
    },
    actions: {
        setRoute(route: string) {
            this.curRoute = route;
            this.dataType = this.curRoute.split('/').length >= 3 ? 
                            this.curRoute.split('/').pop() as string : 
                            ''

            for(const item of ['JV', 'XRD', 'IPCE', 'PL', 'ABS']) {
                if(this.routeEchart[item] === undefined){
                    this.routeEchart[item] = []
                }

                if(this.routeData[item] === undefined){
                    this.routeData[item] = []
                }

                if(this.routeCheck[item] === undefined){
                    this.routeCheck[item] = {
                        isCheck: false,
                        isInde: false,
                        checkName: [],
                    }
                }

                if(this.notions[item] === undefined) {
                    this.notions[item] = new Set()
                }

                if(this.responseData[item] === undefined || this.responseData[item].length === 0) {
                    this.responseData[item] = []

                    axios.post(
                        'ExperiData/getData/',
                        {
                            dataType: item,
                            card: getCard()
                        }
                    ).then(
                        (response: AxiosResponse) => {
                            const responses = response.data as EchartShowData[]
                            
                            for(const response of responses) {
                                let echart: EchartShowData
            
                                if(item === 'JV') {
                                    echart = new JVechart(response)
                                } else if(item === 'IPCE') {
                                    echart = new IPCEechart(response)
                                } else if (item === 'ABS') {
                                    echart = new ABSechart(response)
                                } else {
                                    echart = new EchartShowData(response)
                                }
            
                                if(echart.file === '请上传对应的工艺文件' && echart.card === getCard()) {
                                    this.notions[item].add(echart.processId)
                                }
                                this.responseData[item].push(echart)
                            }
                        }
                    ).catch(
                        (error: AxiosError) => {
                            console.log(error, 'error')
                        }
                    )
                }
            }
        },

        setRouteName(routeName: string) {
            this.curName = routeName;
        },

        setRouteEchart(echartData: EchartData) {
            this.routeEchart[this.dataType].push(echartData)
        },
        setRouteData(uploadData: TypeData) {
            this.routeData[this.dataType].push(uploadData)
        },
        setRouteCheck(checkInfo: {[key:string]: string|boolean|string[]}) {
            this.routeCheck[this.dataType] = checkInfo
        },
        setRouteCheckBoolean(isCheck: boolean, isInde: boolean) {
            this.routeCheck[this.dataType].isCheck = isCheck
            this.routeCheck[this.dataType].isInde = isInde
        },

        initRoute(){
            this.dataType = ''
            this.routeEchart = {}
            this.routeData = {}
            this.routeCheck = {}
            this.responseData = {}
            this.notions = {}
        }
    }
})
