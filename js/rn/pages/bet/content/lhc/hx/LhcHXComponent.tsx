import { ScrollView, StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../../../public/tools/Scale'
import { Skin1 } from '../../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../../base/CommStyles'
import { UGColor } from '../../../../../public/theme/UGThemeColor'
import UseLhcHX from './UseLhcHX'
import { PlayGroupData, ZodiacNum } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength, dicNull } from '../../../../../public/tools/Ext'
import PXLineEBall from '../../../widget/PXLineEBall'
import { BALL_CONTENT_HEIGHT } from '../../../const/LotteryConst'
import { findZodiacByName } from '../../../util/LotteryUtil'
import { ugLog } from '../../../../../public/tools/UgLog'
import { array } from 'prop-types'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'
import { UGText } from '../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

/**
 * 六合彩 合肖 等等
 *
 * @param navigation
 * @constructor
 */
const LhcHXComponent = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcHX()

  //当前这一页的数据
  const currentPageData = playOddData?.pageData?.groupTri[tabIndex]

  useEffect(() => {
    setPlayOddData(playOddData)
  }, [])
  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 生肖和球
   * @param item
   * @param zodiac
   * @param index
   */
  const renderEBall = (item?: PlayGroupData, zodiac?: ZodiacNum, index?: number) => <PXLineEBall
    key={key + 'renderEBall' + zodiac?.id}
    item={{
      id: zodiac?.id,
      name: zodiac?.name,
      zodiacItem: zodiac,
    }}
    selectedBalls={selectedBalls}
    callback={() => addOrRemoveBall(zodiac, item?.enable)}/>
  /**
   * 绘制 一行球
   * @param groupData
   */
  const renderLineBall = (groupData?: PlayGroupData) =>
    !dicNull(groupData) && <View key={key + groupData?.id}
                                 style={CommStyles.flex}>

      <View key={key + 'renderLineBall' + groupData?.id}
            style={_styles.sub_title_container}>
        <UGText key={key + 'renderLineBall text' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{
          groupData?.alias + (
            arrayLength(selectedBalls) <= 1 ? '' :
              `（赔率: ${groupData?.plays[arrayLength(selectedBalls) - 2]?.odds}）`
          )
        }</UGText>
      </View>

      <View key={key + 'renderLineBall sub' + groupData?.id}
            style={_styles.ball_parent_container}>
        {playOddData?.pageData?.zodiacNums?.map((item, index) => renderEBall(groupData, item, index))}
      </View>
    </View>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {arrayLength(currentPageData) > 0 && renderLineBall(currentPageData[0])}
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
    padding: scale(4),
  },
  rect_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
    flex: 1,
  },
})

export default LhcHXComponent
