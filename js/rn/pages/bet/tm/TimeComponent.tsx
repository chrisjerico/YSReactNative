import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useContext } from 'react'
import FastImage from 'react-native-fast-image'
import UseTime from './UseTime'
import BetLotteryContext from '../BetLotteryContext'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import { Res } from '../../../Res/icon/Res'

interface IRouteParams {
}

/**
 * 开奖时间显示
 *
 * @param navigation
 * @constructor
 */
const TimeComponent = ({}: IRouteParams) => {

  const { nextIssueData, playOddDetailData, curPlayOddData } = useContext(BetLotteryContext)

  const {
    displayCloseTime,
    displayOpenTime,
    gotoOpenNet,
    gotoLive,
  } = UseTime()

  /**
   * 哪些站点需要在线直播
   */
  const showTv = () => {
    return true
  }

  /**
   * 哪些站点需要显示长龙助手
   */
  const showLong = () => {
    return true
  }

  /**
   * 哪些站点需要显示开奖记录
   */
  const showTrophy = () => {
    return true
  }

  return (
    <View key={'time container'}
          style={_styles.container}>
      <View key={'time sub container'}
            style={_styles.time_container}>
        <Text key={'time container 1' + nextIssueData()?.displayNumber}
              style={_styles.issue_text}>{`${nextIssueData()?.displayNumber}期`}</Text>
        <Text key={'time container close'}
              style={_styles.close_text}>{'封盘:'}</Text>
        <Text key={'time container 2' + displayCloseTime} style={_styles.close_time}>{displayCloseTime}</Text>
        <Text key={'time container open'}
              style={_styles.close_text}>{'开盘:'}</Text>
        <Text key={'time container 3' + displayOpenTime}
              style={_styles.open_time}>{displayOpenTime}</Text>
      </View>
      <View key={'time sub2 container'}
            style={_styles.fc_container}>
        {
          showTv() && <TouchableOpacity key={'time sub show tv'}
                                        onPress={gotoLive}>
            <FastImage key={'time sub show tv'}
                       source={{ uri: Res.tv1 }}
                       style={_styles.tv_img}/>
          </TouchableOpacity>
        }
        {
          showLong() && <TouchableOpacity key={'time sub show long'}>
            <FastImage key={'time sub show long'}
                       source={{ uri: Res.tv_long }}
                       style={_styles.tv_img}/>
          </TouchableOpacity>
        }
        {
          showTrophy() && <TouchableOpacity key={'time sub show net'}
                                            onPress={gotoOpenNet}>
            <FastImage key={'time sub show net'}
                       source={{ uri: Res.tv_trophy }}
                       style={_styles.tv_img}/>
          </TouchableOpacity>
        }
      </View>
    </View>

  )
}

const _styles = StyleSheet.create({
  container: {
    paddingVertical: scale(8),
    backgroundColor: UGColor.LineColor3,
  },
  time_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fc_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    paddingHorizontal: scale(8),
    justifyContent: 'flex-end',
  },
  issue_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(8),
  },
  close_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingHorizontal: scale(4),
  },
  close_time: {
    color: UGColor.RedColor2,
    fontSize: scale(24),
  },
  open_time: {
    color: UGColor.WarnningColor1,
    fontSize: scale(24),
  },
  tv_img: {
    width: scale(36),
    marginHorizontal: scale(8),
    aspectRatio: 1,
  },

})

export default TimeComponent
