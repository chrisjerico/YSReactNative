import { StyleSheet } from 'react-native'
import * as React from 'react'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../../Res/icon/Res'
import UseInstantLottery from './UseInstantLottery'

interface IRouteParams {

}

/**
 * 秒秒彩背影显示
 */
const InstantLotteryComponent = ({}: IRouteParams) => {

  const key = 'InstantLotteryComponent'

  const {
  } = UseInstantLottery()

  return (
    <FastImage source={{ uri: Res.mmcbg2_2 }}
               style={_styles.mmc_image}/>
  )
}

const _styles = StyleSheet.create({
  mmc_image: {
    width: '100%',
    aspectRatio: 750 / 172,
  },
})

export default InstantLotteryComponent
