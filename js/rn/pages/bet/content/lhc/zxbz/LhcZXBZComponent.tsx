import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseLhcZXBZ from './UseLhcZXBZ'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import LotteryEBall from '../../../widget/LotteryEBall'
import { BALL_CONTENT_HEIGHT } from '../../../const/LotteryConst'
import { ugLog } from '../../../../../public/tools/UgLog'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'


/**
 * 六合彩 自选不中
 *
 * @param navigation
 * @constructor
 */
const LhcZXBZComponent = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcZXBZ()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 球
   * @param item
   * @param ballInfo 手动生成的数据
   */
  const renderEBall = (item?: PlayGroupData, ballInfo?: PlayData) =>
    <LotteryEBall key={key + 'renderEBall' + ballInfo?.id}
                  item={ballInfo}
                  selectedBalls={selectedBalls}
                  containerStyle={{ width: scale(78) }}
                  callback={() => addOrRemoveBall(ballInfo, item?.enable)}/>

  /**
   * 绘制 自选不中
   * @param groupData
   */
  const renderLMA = (groupData?: PlayGroupData) => {

    return (
      <View key={key + 'renderLMA' + groupData?.id}
            style={CommStyles.flex}>

        <View key={key + 'render LMA sub' + groupData?.id}
              style={_styles.sub_title_container}>
          <UGText key={key + 'render LMA text' + groupData?.id}
                style={[
                  _styles.sub_title_text,
                  { color: Skin1.themeColor },
                ]}>{
            groupData?.alias + (
              arrayLength(selectedBalls) <= 4 ? '' :
                `（赔率: ${groupData?.plays[arrayLength(selectedBalls) - 5]?.odds}）`
            )

          }</UGText>
        </View>

        <View key={key + 'render LMA sub2' + groupData?.id}
              style={_styles.ball_parent_container}>
          {
            currentPageData[0]?.exPlays?.map((item, index) => renderEBall(groupData, item))
          }
        </View>
      </View>
    )
  }

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'render all ball'}
                                    style={_styles.content_container}>
    {!anyEmpty(currentPageData) && renderLMA(currentPageData[0])}
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
  ball_parent_container: {
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


})

export default LhcZXBZComponent
