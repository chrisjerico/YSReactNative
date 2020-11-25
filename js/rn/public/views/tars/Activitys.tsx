import React, { memo } from 'react'
import ActivityComponent from '../../components/tars/ActivityComponent'
import PushHelper from '../../define/PushHelper'
import { ROULETTE_LOGO } from '../../define/Res'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import { getActivityPosition, goToUserCenterType } from '../../tools/tars'

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

const Activitys = ({ refreshing, isTest, redBagLogo, uid, redBag, roulette, floatAds, goldenEggs, scratchs }: ActivitysProps) => {
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
        show={uid && roulette && !isTest}
        logo={ROULETTE_LOGO}
        onPress={() => {
          PushHelper.pushWheel(roulette)
        }}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(450), right: 0 }}
        enableFastImage={false}
        show={uid && goldenEggs && !isTest}
        logo={'https://i.ibb.co/BTQ52Zg/egg.png'}
        onPress={goToUserCenterType.砸金蛋}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(570), right: 0 }}
        enableFastImage={false}
        show={uid && scratchs && !isTest}
        logo={'https://i.ibb.co/0J51pH9/scratch.png'}
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
