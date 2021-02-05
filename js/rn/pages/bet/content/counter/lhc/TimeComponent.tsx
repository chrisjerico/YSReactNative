import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import FastImage from 'react-native-fast-image'
import UseTime from './UseTime'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import { scale } from '../../../../../public/tools/Scale'
import { Res } from '../../../../../Res/icon/Res'

interface IRouteParams {

}

/**
 * 开奖时间显示
 *
 * @param navigation
 * @constructor
 */
const TimeComponent = ({  }: IRouteParams) => {

  const key = 'TimeComponent'

  const {
    displayCloseTime,
    displayOpenTime,
    nextIssueData,
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
    nextIssueData?.isInstant != '1' && <View key={key}
          style={_styles.container}>
      <View key={key + 'time sub container'}
            style={_styles.time_container}>
        <Text key={key + 'time container 1' + nextIssueData?.displayNumber}
              style={_styles.issue_text}>{`${nextIssueData?.displayNumber ?? '无 '}期`}</Text>
        <Text key={key + 'time container close'}
              style={_styles.close_text}>{'封盘:'}</Text>
        <Text key={key + 'time container 2' + displayCloseTime}
              style={_styles.close_time}>{displayCloseTime}</Text>
        <Text key={key + 'time container open'}
              style={_styles.close_text}>{'开盘:'}</Text>
        <Text key={key + 'time container 3' + displayOpenTime}
              style={_styles.open_time}>{displayOpenTime}</Text>
      </View>
      <View key={key + 'time sub2 container'}
            style={_styles.fc_container}>
        {
          showTv() && <TouchableWithoutFeedback key={key + 'time sub show tv'}
                                        onPress={gotoLive}>
            <FastImage key={key + 'time sub show tv'}
                       source={{ uri: Res.tv1 }}
                       style={_styles.tv_img}/>
          </TouchableWithoutFeedback>
        }
        {
          showLong() && <TouchableWithoutFeedback key={key + 'time sub show long'}>
            <FastImage key={key + 'time sub show long'}
                       source={{ uri: Res.tv_long }}
                       style={_styles.tv_img}/>
          </TouchableWithoutFeedback>
        }
        {
          showTrophy() && <TouchableWithoutFeedback key={key + 'time sub show net'}
                                            onPress={gotoOpenNet}>
            <FastImage key={'time sub show net'}
                       source={{ uri: Res.tv_trophy }}
                       style={_styles.tv_img}/>
          </TouchableWithoutFeedback>
        }
      </View>
    </View>

  )
}

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: scale(14),
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
    fontSize: scale(20),
    paddingLeft: scale(8),
  },
  close_text: {
    color: UGColor.TextColor3,
    fontSize: scale(18),
    paddingHorizontal: scale(4),
  },
  close_time: {
    color: UGColor.RedColor2,
    fontSize: scale(20),
  },
  open_time: {
    color: UGColor.WarnningColor1,
    fontSize: scale(20),
  },
  tv_img: {
    width: scale(32),
    marginHorizontal: scale(6),
    aspectRatio: 1,
  },

})

export default TimeComponent
