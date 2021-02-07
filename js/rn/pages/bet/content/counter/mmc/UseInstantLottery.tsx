import * as React from 'react'
import { useEffect } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import APIRouter from '../../../../../public/network/APIRouter'
import { UGStore } from '../../../../../redux/store/UGStore'
import { ugLog } from '../../../../../public/tools/UgLog'

/**
 * 秒秒彩背影显示
 * @constructor
 */
const UseInstantLottery = () => {

  useEffect(()=>{
    requestNextData(UGStore.globalProps?.lotteryId)
  }, [])

  /**
   * 下一期的数据
   */
  const requestNextData = async (id?: string) => {
    if (anyEmpty(id)) return null

    const res = await APIRouter.game_nextIssue(id)
      .then(({ data: res }) => res)

    ugLog('requestNextData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      UGStore.dispatch({type: 'merge', nextIssueData: res?.data})
    }

    return res?.code
  }

  return {
  }
}

const SECOND_1 = 1000
const MINUTE_1 = 60 * SECOND_1
const HOUR_1 = 60 * MINUTE_1

export default UseInstantLottery

