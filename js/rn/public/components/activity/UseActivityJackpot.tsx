import { useEffect, useState } from 'react'
import APIRouter from '../../network/APIRouter'

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
    requestData()
  },[])

  /**
   * 请求数据
   */
  const requestData = () => {
    APIRouter.activity_winApplyList("0").then(({ data: res }) => {
      setListData(res?.data)
    })
  }

  return {
    listData,
    categoryData,
  }
}

export default UseActivityJackpot
