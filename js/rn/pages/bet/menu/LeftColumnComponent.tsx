import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import UseLeftComponent from './UseLeftComponent'
import { BALL_CONTENT_HEIGHT, ILotteryRouteParams, LEFT_ITEM_HEIGHT } from '../const/LotteryConst'
import { useEffect } from 'react'
import { UGStore } from '../../../redux/store/UGStore'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 *
 * @param navigation
 * @constructor
 */
const LeftColumnComponent = ({ style }: ILotteryRouteParams) => {

  const {
    leftColumnIndex,
    setLeftColumnIndex,
    playOddDetailData,
  } = UseLeftComponent()

  useEffect(() => {
    UGStore.dispatch({ type: 'reset', lotteryColumnIndex: leftColumnIndex })
  }, [leftColumnIndex])

  /**
   * 绘制左边列表 特码 双面 正码 等等
   */
  const renderLeftColumn = () => <View style={_styles.left_column_container}>
    <ScrollView nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
      <View style={_styles.left_column_content}>
        {
          playOddDetailData()?.playOdds?.map((item, index) => {
            return <TouchableOpacity key={'renderLeftColumn=' + item?.code}
                                     onPress={() => setLeftColumnIndex(index)}>
              <View key={'renderLeftColumn' + item?.code}
                    style={[
                      _styles.left_column_item,
                      {
                        borderWidth: leftColumnIndex == index ? scale(3) : scale(1),
                        borderColor: leftColumnIndex == index ? Skin1.themeColor : UGColor.LineColor4,
                      },
                    ]}>
                <Text key={'renderLeftColumn' + item?.code}
                      style={_styles.left_column_text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          })
        }
      </View>
    </ScrollView>
  </View>

  return (<View style={style}>
      {renderLeftColumn()}
    </View>)
}

const _styles = StyleSheet.create({
  left_column_container: {
    height: BALL_CONTENT_HEIGHT,
  },
  left_column_content: {
    paddingBottom: scale(240),
  },
  left_column_text: {
    color: UGColor.TextColor7,
    fontSize: scale(22),
  },
  left_column_item: {
    width: scale(140),
    alignItems: 'center',
    justifyContent: 'center',
    height: LEFT_ITEM_HEIGHT,
    borderRadius: scale(8),
  },
})

export default LeftColumnComponent
