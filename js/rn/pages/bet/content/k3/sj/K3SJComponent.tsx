import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseK3SJ from './UseK3SJ'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import LotteryERect from '../../../widget/LotteryERect'
import { BALL_CONTENT_HEIGHT, K3Code } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import K3LineEBall from '../../../widget/K3LineEBall'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

/**
 * 快三 等等
 *
 * @param navigation
 * @constructor
 */
const K3SJComponent = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseK3SJ()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 方格式
   * @param item
   * @param ballInfo
   */
  const renderERect = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryERect key={key + 'renderERect' + ballInfo?.id}
                  item={ballInfo}
                  selectedBalls={selectedBalls}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 球
   * @param item
   * @param ballInfo
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData) => {

    return <K3LineEBall key={key + 'renderEBall' + ballInfo?.id}
                        item={ballInfo}
                        selectedBalls={selectedBalls}
                        containerStyle={playOddData?.code == K3Code.SJ ? { flexDirection: 'row' } : null}
                        callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>
  }


  /**
   * 绘制 三军
   * @param groupData
   */
  const renderSJ1 = (groupData?: PlayGroupData) => <View key={key + 'renderSJ1' + groupData?.id}
                                                         style={CommStyles.flex}>

    <View key={key + ' sub renderSJ1' + groupData?.id}
          style={_styles.sub_title_container}>
      <UGText key={key + ' sub renderSJ1 text' + groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</UGText>
    </View>

    <View key={key + ' sub2 renderSJ1' + groupData?.id}
          style={_styles.ball_parent_container}>
      {groupData?.plays?.map((item) => renderEBall(groupData, item))}
    </View>
  </View>


  /**
   * 绘制 三军
   * @param groupData
   */
  const renderSJ2 = (groupData?: PlayGroupData) => <View key={key + 'renderSJ2' + groupData?.id}
                                                         style={CommStyles.flex}>

    <View key={key + ' sub renderSJ2' + groupData?.id}
          style={_styles.sub_title_container}>
      <UGText key={key + ' sub renderSJ2' + +groupData?.id}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</UGText>
    </View>

    <View key={key + ' sub2 renderSJ2' + groupData?.id}
          style={_styles.ball_parent_container}>
      {groupData?.plays?.map((item) => renderERect(groupData, item))}
    </View>
  </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {arrayLength(currentPageData) > 0 && renderSJ1(currentPageData[0])}
    {arrayLength(currentPageData) > 1 && renderSJ2(currentPageData[1])}
  </View>

  return (
    <ScrollView key={key}
                showsVerticalScrollIndicator={false}
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
  ball_parent_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
  ball_odds: {
    fontSize: scale(20),
  },


})

export default K3SJComponent
