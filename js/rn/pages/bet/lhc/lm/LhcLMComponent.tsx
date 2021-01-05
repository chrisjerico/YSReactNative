import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcLM from './UseLhcLM'
import LotteryBall from '../../../../public/components/view/LotteryBall'
import { BallStyles } from '../../../hall/new/games/HallGameListComponent'
import ERect from '../../../../public/components/view/lottery/ERect'
import LCF from '../../config/LCF'
import { PlayData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'

interface IRouteParams {
}

/**
 * 六合彩特码
 *
 * @param navigation
 * @constructor
 */
const LhcLMComponent = ({}: IRouteParams) => {


  // const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const {
    dataLM,
    setDataLM,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcLM()


  /**
   * 绘制 方格式
   * @param item
   */
  const renderERect = (item?: PlayData) => <TouchableOpacity key={item?.name}
                                                             onPress={() => addOrRemoveBall(item?.name)}>
    <View style={[
      _styles.ball_item_lm,
      {
        backgroundColor:
          selectedBalls?.includes(item?.name) ? LCF.pressedColor : null,
      },
    ]}>
      <ERect title={item?.name}
             titleStyle={{ color: selectedBalls?.includes(item?.name) ? LCF.pressedTextColor : LCF.unpressedTextColor }}
             odds={item?.odds}
             oddsStyle={{ color: selectedBalls?.includes(item?.name) ? LCF.pressedTextColor : LCF.unpressedTextColor }}/>
    </View>
  </TouchableOpacity>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View>
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        dataLM?.map((groupData) => {
          return <View key={groupData?.id}
                       style={CommStyles.flex}>

            <View style={_styles.sub_title_container}>
              <Text style={_styles.sub_title_text}>{groupData?.alias}</Text>
            </View>

            <View style={_styles.ball_container}>
              {
                groupData?.plays?.map((item) => renderERect(item))
              }
            </View>

          </View>
        })
      }
    </ScrollView>
  </View>

  return (
    <View style={CommStyles.flex}>
      {renderAllBall()}
    </View>

  )
}

const _styles = StyleSheet.create({
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
  ball_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
    flex: 1,
  },
  ball_item_lm: {
    width: scale(196),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(16),
    borderBottomRightRadius: scale(32),
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(16),
    borderBottomLeftRadius: scale(16),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(0.5),
  },

})

export default LhcLMComponent
