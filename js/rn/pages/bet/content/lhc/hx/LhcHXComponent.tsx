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
import LotteryLineEBall from '../../../widget/LotteryLineEBall'
import { BALL_CONTENT_HEIGHT} from '../../../const/LotteryConst'
import { findZodiacByName } from '../../../util/LotteryUtil'
import { ugLog } from '../../../../../public/tools/UgLog'
import { array } from 'prop-types'
import { ILotteryRouteParams } from '../../../const/ILotteryRouteParams'

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
   * @param index
   */
  const renderEBall = (item?: ZodiacNum, index?: number) => <LotteryLineEBall key={key + 'renderEBall' + item?.id}
                                                                              item={{
                                                                                id: item?.id,
                                                                                name: item?.name,
                                                                                zodiacItem: item,
                                                                              }}
                                                                              selectedBalls={selectedBalls}
                                                                              callback={() => addOrRemoveBall(item?.id)}/>
  /**
   * 绘制 一行球
   * @param groupData
   */
  const renderLineBall = (groupData?: PlayGroupData) =>
    !dicNull(groupData) && <View key={key + groupData?.id}
                                  style={CommStyles.flex}>

      <View key={key + 'renderLineBall' + groupData?.id}
            style={_styles.sub_title_container}>
        <Text key={key + 'renderLineBall text' + groupData?.id}
              style={[
                _styles.sub_title_text,
                { color: Skin1.themeColor },
              ]}>{
          groupData?.alias + (arrayLength(selectedBalls) > 1 ?
            `（赔率: ${groupData?.plays[arrayLength(selectedBalls) - 2]?.odds}）` :
            '')
        }</Text>
      </View>

      <View key={key + 'renderLineBall sub' + groupData?.id}
            style={_styles.ball_container}>
        { playOddData?.pageData?.zodiacNums?.map(renderEBall) }
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
  ball_container: {
    padding: scale(4),
  },
  rect_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
    flex: 1,
  },
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
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
})

export default LhcHXComponent
