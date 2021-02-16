import React, { memo, useState } from 'react'
import ActivityComponent from '../../components/tars/ActivityComponent'
import PushHelper from '../../define/PushHelper'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import { icon_任务弹窗, icon_刮刮乐, icon_砸金蛋, Res, ROULETTE_LOGO } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import { getActivityPosition, goToUserCenterType } from '../../tools/tars'
import { ActivitySettingModel } from '../../network/Model/ActivitySettingModel'
import RedBagModal from '../../components/RedBagModal'
import { ugLog } from '../../tools/UgLog'
import { Data, ScratchList } from '../../network/Model/ScratchListModel'

interface ActivitysProps {
  refreshing: boolean
  isTest: boolean
  uid: string | undefined
  redBagLogo: string
  floatAds: FloatAd[]
  roulette: Roulette[]
  redBag: RedBagDetailActivityModel
  goldenEggs: GoldenEgg[]
  scratchs: Data
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

const Activitys = ({ refreshing, redBagLogo, uid, redBag, roulette, floatAds, goldenEggs, scratchs, activitySetting }: ActivitysProps) => {
  const { missionPopUpSwitch } = UGStore.globalProps.sysConf
  const [redDialog, setRedDialog] = useState(false)
  
  ugLog("goldenEggs= ", goldenEggs)
  ugLog("roulette= ", roulette)
  ugLog("scratchs= ", scratchs?.scratchList[0])
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
        show={roulette && (roulette[0]?.param?.visitor_show == "0" || uid)}
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
        show={goldenEggs && (goldenEggs[0]?.param?.visitor_show == "0" || uid)}
        logo={icon_砸金蛋}
        onPress={goToUserCenterType.砸金蛋}
        />
      <ActivityComponent
        refreshing={refreshing}
        containerStyle={{ top: scale(590), right: 0 }}
        enableFastImage={false}
        show={scratchs && (scratchs?.scratchList[0]?.param?.visitor_show == "0" || uid)}
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
      { redDialog 
        ? <RedBagModal
            onPress={() => {
              setRedDialog(!redDialog)
            }}
            redBag={redBag}
            bagSkin={activitySetting?.data?.redBagSkin}
            activitySetting={activitySetting}
          /> 
        : null }
    </>
  )
}

export default memo(Activitys)
