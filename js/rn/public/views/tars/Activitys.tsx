import React, { memo } from 'react'
import ActivityComponent from '../../components/tars/ActivityComponent'
import PushHelper from '../../define/PushHelper'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import { getActivityPosition, goToUserCenterType } from '../../tools/tars'
import { icon_任务弹窗, icon_刮刮乐, icon_砸金蛋, ROULETTE_LOGO } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'

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
  const { missionPopUpSwitch } = UGStore.globalProps.sysConf
  return (
    <>
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(235), right: 0 }}
        show={redBag?.data}
        logo={redBagLogo}
        onPress={() => {
          // 红包
          PushHelper.pushRedBag(redBag)
        }}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(355), right: 0 }}
        enableFastImage={false}
        show={uid && roulette}
        logo={ROULETTE_LOGO}
        onPress={() => {
          // 大转盘
          PushHelper.pushWheel(roulette)
        }}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(465), right: 0 }}
        enableFastImage={false}
        show={uid && goldenEggs}
        logo={icon_砸金蛋}
        onPress={goToUserCenterType.砸金蛋}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(590), right: 0 }}
        enableFastImage={false}
        show={uid && scratchs}
        logo={icon_刮刮乐}
        onPress={goToUserCenterType.刮刮乐}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(590), left: 0 }}
        enableFastImage={false}
        show={uid && missionPopUpSwitch == '1'}
        logo={icon_任务弹窗}
        onPress={goToUserCenterType.任务弹窗}
      />
      {floatAds?.map((item: any, index) => {
        // 左上、右上、左下、右下浮窗
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
