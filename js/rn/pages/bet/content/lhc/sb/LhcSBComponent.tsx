import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseLhcSB from './UseLhcSB'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryERect from '../../../widget/LotteryERect'
import { BALL_CONTENT_HEIGHT, LCode } from '../../../const/LotteryConst'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

/**
 * 色波, 两面, 正码1-6, 总肖, 五行
 *
 * @param navigation
 * @constructor
 */
const LhcSBComponent = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    playOddDetailData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcSB()

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
   * @param index
   */
  const renderERect = (item?: PlayGroupData, ballInfo?: PlayData, index?: number) => {
    let gameType = playOddDetailData?.game?.gameType // 六合彩 秒秒秒彩 等等

    return <LotteryERect key={key + 'renderERect' + ballInfo?.id + index}
                         item={ballInfo}
                         containerStyle={gameType == LCode.dlt ? _styles.dlt_rect : null}
                         selectedBalls={selectedBalls}
                         callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>
  }


  /**
   * 绘制 一组格子
   * @param groupData
   * @param index
   */
  const renderGroupERect = (groupData?: PlayGroupData, index?: number) =>
    <View key={key + 'renderAllBall' + groupData?.id + index}
          style={CommStyles.flex}>

      <View key={key + 'renderAllBall sub' + groupData?.id + index}
            style={_styles.sub_title_container}>
        <UGText key={key + 'renderAllBall text' + groupData?.id + index}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{groupData?.alias}</UGText>
      </View>

      <View key={key + ' sub2 renderAllBall' + groupData?.id + index}
            style={_styles.rect_container}>
        {
          groupData?.plays?.map((item) => renderERect(groupData, item))
        }
      </View>

    </View>

  /**
   * 绘制全部的格子
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {currentPageData?.map(renderGroupERect)}
  </View>

  return (
    <ScrollView key={key}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
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
  rect_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
    flex: 1,
  },
  dlt_rect: {
    flexDirection: 'column',
  },


})

export default LhcSBComponent
