import ActivityComponent from '../../components/tars/ActivityComponent'
import PushHelper from '../../define/PushHelper'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import { getActivityPosition } from '../../tools/tars'
import React, { memo } from 'react'

interface ActivitysProps {
  refreshing: boolean
  isTest: boolean
  uid: string | undefined
  redBagLogo: string
  floatAds: FloatAd[]
  roulette: Roulette[]
  redBag: RedBagDetailActivityModel
}

export interface FloatAd {
  image: string
  position: number
  linkCategory: number | string
  linkPosition: number | string
}

export interface Roulette {
  end: string
  id: string
  param: any
  start: string
  type: string
}

const Activitys = ({ refreshing, isTest, redBagLogo, uid, redBag, roulette, floatAds }: ActivitysProps) => {
  return (
    <>
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(250), right: 0 }}
        show={uid && redBagLogo && !isTest}
        logo={redBagLogo}
        onPress={() => {
          PushHelper.pushRedBag(redBag)
        }}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(400), right: 0 }}
        enableFastImage={false}
        show={uid && roulette && !isTest}
        logo={'dzp_btn'}
        onPress={() => {
          PushHelper.pushWheel(roulette)
        }}
      />
      {floatAds?.map((item: any, index) => {
        const { image, position, linkCategory, linkPosition } = item
        return (
          <ActivityComponent
            key={index}
            refreshing={refreshing}
            containerStyle={getActivityPosition(position)}
            enableFastImage={true}
            show={true} // uid && !isTest
            logo={image}
            onPress={() => {
              PushHelper.pushCategory(linkCategory, linkPosition)
            }}
          />
        )
      })}
    </>
  )
}

export default memo(Activitys)
