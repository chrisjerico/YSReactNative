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
   * 绘制全部的球
   */
  const renderBall = () => <View>
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
                groupData?.plays?.map((item) =>
                  <TouchableOpacity key={item?.name}
                                    onPress={() => addOrRemoveBall(item?.name)}>
                    <View style={[
                      _styles.ball_item,
                      {
                        backgroundColor:
                          selectedBalls?.includes(item?.name) ? `${Skin1.themeColor}aa` : null,
                      },
                    ]}>
                      <ERect title={item?.name}
                             titleStyle={selectedBalls?.includes(item?.name) ? { color: `white` } : null}
                             odds={item?.odds}
                             oddsStyle={selectedBalls?.includes(item?.name) ? { color: UGColor.TextColor8 } : null}/>
                    </View>
                  </TouchableOpacity>)
              }
            </View>

          </View>
        })
      }
    </ScrollView>
  </View>

  return (
    <View style={CommStyles.flex}>
      {renderBall()}
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
  ball_item: {
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
