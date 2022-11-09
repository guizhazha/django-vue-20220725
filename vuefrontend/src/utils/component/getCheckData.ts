import { storeToRefs } from 'pinia'
import { changeRoute } from '@/pinia/route'

export function getCheckData() {
    const route = changeRoute()
    const { dataType, routeEchart, routeCheck } = storeToRefs(route)

    const checkName: string[] = routeCheck.value[dataType.value].checkName as string[]

    const checkData = []
    for(const echart of routeEchart.value[dataType.value]) {
        for(const name of checkName) {
            if(name === echart.dataName) {
                checkData.push(echart)
            }
        }
    }

    return checkData
}