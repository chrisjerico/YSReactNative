import { useEffect, useState } from 'react'
import APIRouter from '../../network/APIRouter'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { httpClient } from '../../network/httpClient'
import { TurntableListModel } from '../../network/Model/TurntableListModel'

const routers = [
  'activity_turntableList',
  'activity_redBagDetail',
  'system_floatAds'
]

const useActivity = (uid: string) => {

  const [roulette, setRoulette] = useState()
  const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
  const [floatAd, setFloatAd] = useState<any[]>()


  const apis = routers.map(async (router) => {
    try {
      return await APIRouter[router]()
    } catch (error) {
      // console.log(error)
    }
  })

  const callApis = async () => {
    try {
      const response = await Promise.all(apis)
      response[0] && setRoulette(response[0]?.data?.data)
      response[1] && setRedBag(response[1]?.data)
      response[2] && setFloatAd(response[2]?.data?.data)
    } catch (error) {
      console.log("--------useActivity error--------", error)
    }
  }

  const refreshActivity = callApis

  useEffect(() => {
    if (uid) {
      callApis()
    } else {
      setRoulette(null)
      setRedBag(null)
      setFloatAd(null)
      console.log('---no uid so no activity---')
    }
  }, [uid])

  return {
    roulette,
    redBag,
    floatAd,
    refreshActivity
  }
}

export default useActivity