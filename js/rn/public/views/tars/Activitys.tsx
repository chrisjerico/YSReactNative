import React, { memo, useEffect, useState } from 'react'
import ActivityComponent from '../../components/tars/ActivityComponent'
import PushHelper from '../../define/PushHelper'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import { icon_任务弹窗, icon_利息宝, icon_刮刮乐, icon_砸金蛋, icon_大转盘, Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import { getActivityPosition, goToUserCenterType } from '../../tools/tars'
import { img_images } from '../../../Res/icon'
import { appConfig } from '../../../../../config'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import { anyEmpty, anyString } from '../../tools/Ext'
import settings from '../../network/NetworkRequest1/model/activity/settings'
import { ActivitySettingModel } from '../../network/Model/ActivitySettingModel'
import RedBagModal from '../../components/RedBagModal'
import { ugLog } from '../../tools/UgLog'

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
  activitySetting?: ActivitySettingModel
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

const Activitys = ({ refreshing, uid, redBag, roulette, floatAds, goldenEggs, scratchs }: ActivitysProps) => {
  const { missionPopUpSwitch } = UGStore.globalProps.sysConf

  const [activitySettings, setActivitySettings] = useState<settings>()
  const { goldenEggLogo, redBagLogo, redBagSkin, scratchOffLogo, turntableLogo } = activitySettings ?? {}
  if (!activitySettings) {
    api.activity.settings().useSuccess((res) => {
      setActivitySettings(res?.data)
    })
  }

  const [redDialog, setRedDialog] = useState(false)

  return (
    <>
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(235), right: 0 }}
        show={redBag?.data}
        logo={redBagLogo?.length>0 ?redBagLogo : Res.pig}
        type={0}
        onPress={() => {
          // 红包
          setRedDialog(!redDialog)
        }}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(355), right: 0 }}
        enableFastImage={false}
        show={uid && roulette}
        logo={anyString(turntableLogo) ?? icon_大转盘}
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
        logo={anyString(goldenEggLogo) ?? icon_砸金蛋}
        onPress={goToUserCenterType.砸金蛋}
      />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(590), right: 0 }}
        enableFastImage={false}
        show={uid && scratchs}
        logo={anyString(scratchOffLogo) ?? icon_刮刮乐}
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
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(590), right: 0 }}
        enableFastImage={false}
        show={appConfig.isHomeShowLXB()}
        logo={icon_利息宝()}
        onPress={goToUserCenterType.利息宝}
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
      { redDialog
        ? <RedBagModal
            onPress={() => {
              setRedDialog(!redDialog)
            }}
            redBag={redBag}
            bagSkin={activitySettings?.redBagSkin}
            activitySetting={{data: activitySettings} as ActivitySettingModel}
          />
        : null }
    </>
  )
}

export default memo(Activitys)
