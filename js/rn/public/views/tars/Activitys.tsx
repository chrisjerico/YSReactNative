import React, { memo } from 'react'
import ActivityComponent from '../../components/tars/ActivityComponent'
import PushHelper from '../../define/PushHelper'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import { getActivityPosition, goToUserCenterType } from '../../tools/tars'
import { icon_刮刮乐, icon_砸金蛋, ROULETTE_LOGO } from '../../../Res/icon/Res'

interface ActivitysProps {
  refreshing: boolean
  isTest: boolean
  uid: string | undefined
  redBagLogo: string
  floatAds: FloatAd[]
  roulette: Roulette[]
  redBag: RedBagDetailActivityModel
  goldenEggs: GoldenEgg[]
  scratchs: unknown
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

export interface GoldenEgg {
  end: string
  id: string
  integral: number
  param: any
  start: string
  type: string
}

const Activitys = ({ refreshing, redBagLogo, uid, redBag, roulette, floatAds, goldenEggs, scratchs }: ActivitysProps) => {
  return (
    <>
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(220), right: 0 }}
        show={redBag?.data}
        logo={redBagLogo}
        onPress={() => {
          PushHelper.pushRedBag(redBag)
        }}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(340), right: 0 }}
        enableFastImage={false}
        show={uid && roulette}
        logo={ROULETTE_LOGO}
        onPress={() => {
          PushHelper.pushWheel(roulette)
        }}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(450), right: 0 }}
        enableFastImage={false}
        show={uid && goldenEggs}
        logo={icon_砸金蛋}
        onPress={goToUserCenterType.砸金蛋}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(570), right: 0 }}
        enableFastImage={false}
        show={uid && scratchs}
        logo={icon_刮刮乐}
        onPress={goToUserCenterType.刮刮乐}
      />
      {floatAds?.map((item: any, index) => {
        const { image, position, linkCategory, linkPosition } = item
        return (
          <ActivityComponent
            key={index}
            refreshing={refreshing}
            containerStyle={getActivityPosition(position)}
            enableFastImage={true}
            show={true}
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
