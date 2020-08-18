import { useEffect, useState } from 'react'
import APIRouter from '../../network/APIRouter'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'

const useActivity = (uid: string) => {

  const [roulette, setRoulette] = useState()
  const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
  const [floatAd, setFloatAd] = useState<any[]>()

  const callApis = () => {
    Promise.all([
      APIRouter.activity_turntableList(),
      APIRouter.activity_redBagDetail(),
      APIRouter.system_floatAds()
    ]).then(response => {
      setRoulette(response[0]?.data?.data)
      setRedBag(response[1]?.data)
      setFloatAd(response[2]?.data?.data)
    }).catch(error => {
      console.log("--------useHome error--------", error)
    }).finally(() => {
    })
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