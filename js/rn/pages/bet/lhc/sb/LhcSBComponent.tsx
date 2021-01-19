import { ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcSB from './UseLhcSB'
import LotteryBall from '../../../../public/components/view/LotteryBall'
import { BallStyles } from '../../../hall/new/games/HallGameListComponent'
import ERect from '../../../../public/components/view/lottery/ERect'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryERect from '../../widget/LotteryERect'
import { BALL_CONTENT_HEIGHT, ILotteryRouteParams, LEFT_ITEM_HEIGHT } from '../../const/LotteryConst'
import { PlayGroup } from '../../../../public/network/Model/PlayOddDataModel'
import { ugLog } from '../../../../public/tools/UgLog'

/**
 * 色波, 两面, 正码1-6, 总肖, 五行
 *
 * @param navigation
 * @constructor
 */
const LhcSBComponent = ({ playOddData, style }: ILotteryRouteParams) => {

  const {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcSB()

  useEffect(() => {
    setPlayOddData(playOddData)
    setCurData(playOddData?.pageData?.groupTri[0])
  }, [])

  const key = 'lottery page' + playOddData?.code

  /**
   * 绘制 方格式
   * @param item
   * @param index
   */
  const renderERect = (item?: PlayData, index?: number) => <LotteryERect key={key + 'renderERect' + item?.id + index}
                                                                         item={item}
                                                                         selectedBalls={selectedBalls}
                                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制 一组格子
   * @param groupData
   * @param index
   */
  const renderGroupERect = (groupData?: PlayGroupData, index?: number) => <View
    key={key + 'renderAllBall' + groupData?.id + index}
    style={CommStyles.flex}>

    <View key={key + 'renderAllBall sub' + groupData?.id + index}
          style={_styles.sub_title_container}>
      <Text key={key + 'renderAllBall text' + groupData?.id + index}
            style={[
              _styles.sub_title_text,
              { color: Skin1.themeColor },
            ]}>{groupData?.alias}</Text>
    </View>

    <View key={key + ' sub2 renderAllBall' + groupData?.id + index}
          style={_styles.rect_container}>
      {
        groupData?.plays?.map(renderERect)
      }
    </View>

  </View>

  /**
   * 绘制全部的格子
   */
  const renderAllBall = () => <View key={key + 'renderAllBall'}
                                    style={_styles.content_container}>
    {
      curData?.map(renderGroupERect)
    }
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
    paddingBottom: scale(240),
  },
  sub_title_container: {
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
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

})

export default LhcSBComponent
