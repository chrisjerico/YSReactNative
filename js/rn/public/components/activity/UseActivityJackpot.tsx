import { useEffect, useState } from 'react'
import APIRouter from '../../network/APIRouter'
import { ugLog } from '../../tools/UgLog'
import { anyEmpty } from '../../tools/Ext'

/**
 * 申请彩金
 * @constructor
 */
const UseActivityJackpot = () => {

  const [listData, setListData] = useState(null)
  const [categoryData, setCategoryData] = useState(null)

  /**
   * 初始化1次数据
   */
  useEffect(() => {
    requestJackpotData("0")
    requestLogData("0")
  },[])

  /**
   * 请求申请彩金数据
   * @param category 分类
   */
  const requestJackpotData = (category: string) => {
    APIRouter.activity_winApplyList(category).then(({ data: res }) => {
      setListData(res?.data)

      //第一次才初始化
      if (anyEmpty(categoryData)) {
        let cats = {}
        res?.data?.list?.map((item) => {
          cats[item.categoryName] = ""
        })
        let catNames = Object.keys(cats)
        ugLog('cat name=', catNames)
        setCategoryData(catNames)
      }
    })
  }

  /**
   * 请求申请彩金数据
   * @param category 分类
   */
  const requestLogData = (category: string) => {
    APIRouter.activity_applyWinLog(category).then(({ data: res }) => {
      setListData(res?.data)
    })
  }

  return {
    listData,
    categoryData,
    requestJackpotData,
    requestLogData
  }
}

export default UseActivityJackpot
