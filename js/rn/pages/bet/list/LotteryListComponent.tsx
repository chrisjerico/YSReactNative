import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import UseLotteryListComponent from './UseLotteryListComponent'
import { BALL_CONTENT_HEIGHT, ILotteryRouteParams, LEFT_ITEM_HEIGHT } from '../const/LotteryConst'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import { ItemType, LotteryListData } from '../../../redux/model/game/LotteryListModel'
import LotteryBallComponent from '../util/widget/LotteryBallComponent'
import LotteryLabelComponent from '../util/widget/LotteryLabelComponent'
import LotteryLatticeComponent from '../util/widget/LotteryLatticeComponent'
import { arrayLength } from '../../../public/tools/Ext'
import { PlayGroupData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryTab2Component from '../util/widget/LotteryTab2Component'
import LotteryTab3Component from '../util/widget/LotteryTab3Component'
import LotteryLabelAndBallComponent from '../util/widget/LotteryLabelAndBallComponent'
import LotteryZodiacComponent from '../util/widget/LotteryZodiacComponent'
import { ugLog } from '../../../public/tools/UgLog'
import CommStyles from '../../base/CommStyles'

/**
 * 六合彩 彩球 列表内容
 *
 * @param navigation
 * @constructor
 */
const LotteryListComponent = ({ style }: ILotteryRouteParams, ref: any) => {

  const {
    // lotteryColumnIndex,
    lotteryModel,
    playOddDetailData,
  } = UseLotteryListComponent()

  const refListController = useRef<FlatList>()// 列表

  useImperativeHandle(ref, () => ({
    scrollTo: (index?: number) => {
      refListController?.current?.scrollToIndex({ animated: true, index: index })
    },
  }))

//   useEffect(() => {
// ugLog(' lotteryColumnIndex lotteryColumnIndex =', lotteryColumnIndex)
//   }, [lotteryColumnIndex])

  /**
   * 绘制右边彩票区域，彩球 等等
   *
   * @param listData
   * @param isLastIndex 是否最后一个
   */
  const renderRightContent = (listData?: LotteryListData, isLastIndex?: boolean) => {
    const lastStyle = isLastIndex ? { paddingBottom: scale(240) } : null
    // ugLog('renderRightContent=', JSON.stringify(listData))
    switch (listData?.type) {
      case ItemType.BALLS:
        return <LotteryBallComponent listData={listData}
                                     style={lastStyle}/>
      case ItemType.LABEL:
        return <LotteryLabelComponent listData={listData}
                                      style={lastStyle}/>
      case ItemType.LATTICE:
        return <LotteryLatticeComponent listData={listData}
                                        style={lastStyle}/>
      case ItemType.TAB:
        return arrayLength(listData?.data as Array<PlayGroupData>) == 2 ?
          <LotteryTab2Component listData={listData}
                                style={lastStyle}/> :
          <LotteryTab3Component listData={listData}
                                style={lastStyle}/>
      case ItemType.LABEL_AND_BALL:
        return <LotteryLabelAndBallComponent listData={listData}
                                             style={lastStyle}/>
      case ItemType.ZODIAC:
        return <LotteryZodiacComponent listData={listData}
                                       style={lastStyle}/>
    }

  }

  /**
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContentList = () => {
    ugLog('---------------------------------------------------')

    return (
      <FlatList key={'page balls renderRightContentList'}
                ref={refListController}
                style={_styles.right_content_list}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                keyExtractor={(item, index) => `${item?.code}-${index}`}
                data={lotteryModel?.data}
                renderItem={({ item, index }) =>
                  (renderRightContent(item, index == arrayLength(lotteryModel?.data) - 1))}/>
    )
  }

  return (<View style={[CommStyles.flex, style]}>
      {renderRightContentList()}
    </View>)
}

const _styles = StyleSheet.create({
  right_content_list: {
    flex: 1,
    height: BALL_CONTENT_HEIGHT,
  },
})

export default forwardRef(LotteryListComponent)
