import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseCqsscDWD from './UseCqsscDWD'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import LotteryEBall, { ILotteryEBallItem } from '../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT } from '../../const/LotteryConst'
import { ILotteryRouteParams } from '../../const/ILotteryRouteParams'


/**
 * 定位胆
 *
 * @param navigation
 * @constructor
 */
const CqsscDWDComponent = ({ playOddData, style }: ILotteryRouteParams) => {


  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addAndRemoveBallList,
    addOrRemoveBall,
    currentPageData,
  } = UseCqsscDWD()

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 球
   * @param item
   * @param ballInfo 手动生成的数据
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: ILotteryEBallItem) => {

    return (
      <LotteryEBall key={key + 'renderEBall' + ballInfo?.id + ballInfo?.name}
                    item={{
                      // ...item?.plays[0],
                      ...ballInfo,
                    }}
                    selectedBalls={selectedBalls}
                    ballType={{ size: scale(50) }}
                    ballStyle={{ flexDirection: 'column' }}
                    callback={() => addOrRemoveBall(ballInfo?.id)}/>
    )
  }

  /**
   * 绘制 所有 大 小 栏目
   * @param plays 当前栏目的所有球
   */
  const renderRowBar = (plays: Array<PlayData>) => <View style={_styles.bar_container}>
    <TouchableOpacity onPress={() => addAndRemoveBallList(plays?.map((play) => play?.id))}>
      <Text style={_styles.bar_text}>{'所有'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      addAndRemoveBallList(plays?.filter((play) =>
        Number(play?.name) > 4).map((play) => play?.id), plays?.map((play) => play?.id))
    }}>
      <Text style={_styles.bar_text}>{'大'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      addAndRemoveBallList(plays?.filter((play) =>
        Number(play?.name) < 5).map((play) => play?.id), plays?.map((play) => play?.id))
    }}>
      <Text style={_styles.bar_text}>{'小'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      addAndRemoveBallList(plays?.filter((play) =>
        Number(play?.name) % 2 == 1).map((play) => play?.id), plays?.map((play) => play?.id))
    }}>
      <Text style={_styles.bar_text}>{'奇'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {
      addAndRemoveBallList(plays?.filter((play) =>
        Number(play?.name) % 2 == 0).map((play) => play?.id), plays?.map((play) => play?.id))
    }}>
      <Text style={_styles.bar_text}>{'偶'}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => addAndRemoveBallList(null, plays?.map((play) => play?.id))}>
      <Text style={_styles.bar_text}>{'移除'}</Text>
    </TouchableOpacity>
  </View>

  /**
   * 绘制 连码
   * @param groupData
   */
  const renderDWD = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + ' renderDWD' + groupData?.id + groupData?.exPlays[0]?.alias}
          style={CommStyles.flex}>
      <View key={key + ' sub renderDWD 2=' + groupData?.id + groupData?.alias}
            style={_styles.sub_title_container}>
        <Text key={key + ' text renderDWD' + groupData?.id} style={[
          _styles.sub_title_text,
          { color: Skin1.themeColor },
        ]}>{groupData?.exPlays[0]?.alias}</Text>
      </View>

      {renderRowBar(groupData?.exPlays)}

      <View key={key + ' ball renderDWD 3=' + groupData?.id + groupData?.alias}
            style={_styles.ball_container}>
        {
          groupData?.exPlays.map((item, index) => renderEBall(groupData, item))
        }
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View style={_styles.content_container}>
    {playOddData?.pageData?.groupTri?.map((item, index) => renderDWD(item[0], index))}
  </View>

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                style={[_styles.sv_container, style]}>
      {renderAllBall()}
    </ScrollView>

  )
}

const _styles = StyleSheet.create({
  sv_container: {
    flex: 1,
    height: BALL_CONTENT_HEIGHT,
  },
  content_container: {
    flex: 1,
    paddingBottom: scale(120),
  },
  sub_big_title_container: {
    alignItems: 'center',
    borderRadius: scale(4),
    padding: scale(6),
  },
  sub_big_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    paddingHorizontal: scale(1),
  },
  sub_title_container: {
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(4),
    padding: scale(6),
  },
  sub_title_text: {
    color: UGColor.TextColor2,
    fontSize: scale(22),
    paddingHorizontal: scale(1),
  },
  ball_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
  ball_odds: {
    width: scale(76),
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
  },
  tab_title_tb: {
    width: '100%',
    alignItems: 'center',
  },
  tab_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    padding: scale(6),
  },
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  sv_tab_container: {
    flex: 1,
  },
  tab_title_content: {
    flexDirection: 'row',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
  bar_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bar_text: {
    fontSize: scale(22),
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.LineColor4,
  },


})

export default CqsscDWDComponent
