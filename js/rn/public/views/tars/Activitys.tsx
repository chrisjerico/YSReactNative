import ActivityComponent from '../../components/tars/ActivityComponent'
import PushHelper from '../../define/PushHelper'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import { getActivityPosition } from '../../tools/tars'
import React from 'react'

interface ActivitysProps {
  refreshing: boolean
  isTest: boolean
  uid: string | undefined
  redBagLogo: string
  floatAds: any[]
  roulette: any[]
  redBag: RedBagDetailActivityModel
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
            show={uid && !isTest}
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

export default Activitys
