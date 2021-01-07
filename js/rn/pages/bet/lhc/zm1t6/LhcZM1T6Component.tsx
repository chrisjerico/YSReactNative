import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import CommStyles from '../../../base/CommStyles'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcZM1T6 from './UseLhcZM1T6'
import LotteryBall from '../../../../public/components/view/LotteryBall'
import { BallStyles } from '../../../hall/new/games/HallGameListComponent'
import ERect from '../../../../public/components/view/lottery/ERect'
import { PlayData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryERect from '../../widget/LotteryERect'

interface IRouteParams {
}

/**
 * 正码1t6
 *
 * @param navigation
 * @constructor
 */
const LhcZM1T6Component = ({}: IRouteParams) => {


  // const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const {
    dataZM1T6,
    setDataZM1T6,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLhcZM1T6()


  /**
   * 绘制 方格式
   * @param item
   */
  const renderERect = (item?: PlayData) => <LotteryERect key={item?.id}
                                                         item={item}
                                                         selectedBalls={selectedBalls}
                                                         callback={() => addOrRemoveBall(item?.id)}/>

  /**
   * 绘制全部的球
   */
  const renderAllBall = () => <View>
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        dataZM1T6?.map((groupData) => {
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

})

export default LhcZM1T6Component
