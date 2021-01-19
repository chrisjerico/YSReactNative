/**
 * 彩票内容
 * @constructor
 */
import UseListContent from './UseListContent'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import LotteryConst, { BALL_CONTENT_HEIGHT, LEFT_ITEM_HEIGHT } from '../const/LotteryConst'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import LhcTMComponent from '../lhc/tm/LhcTMComponent'
import CommStyles from '../../base/CommStyles'
import LhcZTComponent from '../lhc/zt/LhcZTComponent'
import LhcLMAComponent from '../lhc/lma/LhcLMAComponent'
import LhcSBComponent from '../lhc/sb/LhcSBComponent'
import LhcPTYXComponent from '../lhc/ptyx/LhcPTYXComponent'
import LhcHXComponent from '../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../lhc/zxbz/LhcZXBZComponent'
import { ugLog } from '../../../public/tools/UgLog'
import { useState } from 'react'
import LotteryListContext from './LotteryListContext'

const ListContentComponent = () => {

  const {
    playOddDetailData, //彩票数据
  } = UseListContent()

  const [leftColumnIndex, setLeftColumnIndex] = useState(0) // 左边大类选择了哪个，特码 正码 双面

  /**
   * 绘制左边列表 特码 双面 正码 等等
   */
  const renderLeftColumn = () => <View style={_styles.left_column_container}>
    <ScrollView nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
      <View style={_styles.left_column_content}>
        {
          playOddDetailData()?.playOdds?.map((item, index) => {
            return <TouchableOpacity key={'renderLeftColumn' + item?.code}
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

  // /**
  //  * 加载彩票对象
  //  * @param targetLotteryCode 目标彩票
  //  * @param currentLotteryCode 当前选中的彩票
  //  * @constructor
  //  */
  // const LotteryComponent = (targetLotteryCode?: string, currentLotteryCode?: string) => {
  //
  //   // <LhcTMComponent key={LotteryConst.TM + (LotteryConst.TM == targetLotteryCode)}
  //   //                 style={targetLotteryCode == LotteryConst.TM ? null : { display: 'none' }}
  //   //                 targetLotteryCode={LotteryConst.TM}/>
  //
  //   const isEqual = targetLotteryCode == currentLotteryCode //加载的彩票和选中的彩票是否相同
  //   // const key = targetLotteryCode + isEqual
  //   // ugLog('current key key={key} =', targetLotteryCode, currentLotteryCode, key)
  //   switch (targetLotteryCode) {
  //     case LotteryConst.TM: { //特码
  //       return <LhcTMComponent key={targetLotteryCode}
  //                              lotteryCode={targetLotteryCode}
  //                              style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
  //       />
  //     }
  //     case LotteryConst.ZM: //正码
  //     case LotteryConst.ZT: { //正特
  //       return <LhcZTComponent key={targetLotteryCode}
  //                              lotteryCode={targetLotteryCode}
  //                              style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
  //       />
  //     }
  //     case LotteryConst.LMA: { //连码
  //       return <LhcLMAComponent key={targetLotteryCode}
  //                               lotteryCode={targetLotteryCode}
  //                               style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
  //       />
  //     }
  //     case LotteryConst.LM: //两面
  //     case LotteryConst.ZM1_6: //正码1T6
  //     case LotteryConst.SB: //色波
  //     case LotteryConst.ZOX://总肖
  //     case LotteryConst.WX: { //五行
  //       return <LhcSBComponent key={targetLotteryCode}
  //                              lotteryCode={targetLotteryCode}
  //                              style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
  //       />
  //     }
  //     case LotteryConst.YX: //平特一肖
  //     case LotteryConst.WS: //平特尾数
  //     case LotteryConst.TWS: //头尾数
  //     case LotteryConst.TX: //特肖
  //     case LotteryConst.LX: //连肖
  //     case LotteryConst.LW: //连尾
  //     case LotteryConst.ZX: { //正肖
  //       return <LhcPTYXComponent key={targetLotteryCode}
  //                                lotteryCode={targetLotteryCode}
  //                                style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
  //       />
  //     }
  //     case LotteryConst.HX: { //合肖
  //       return <LhcHXComponent key={targetLotteryCode}
  //                              lotteryCode={targetLotteryCode}
  //                              style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
  //       />
  //     }
  //     case LotteryConst.ZXBZ: { //自选不中
  //       return <LhcZXBZComponent key={targetLotteryCode}
  //                                lotteryCode={targetLotteryCode}
  //                                style={isEqual ? CommStyles.flex : { width: 0, height: 0, opacity: 0 }}
  //       />
  //     }
  //
  //   }
  //
  //   return null
  // }

  /**
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContent = () => {
    // ugLog('playOddDetailData?.playOdds[leftColumnIndex]=', playOddDetailData?.playOdds[leftColumnIndex])

    let lotteryCode = playOddDetailData()?.playOdds[leftColumnIndex]?.code
    ugLog('------------------lotteryCode---------------------------------', lotteryCode)
    // return <View style={CommStyles.flex}>
    //   {
    //     Object.values(LotteryConst)?.map((item) => LotteryComponent(item, lotteryCode))
    //   }
    // </View>


    switch (lotteryCode) {
      case LotteryConst.TM: { //特码
        return <LhcTMComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.ZM: //正码
      case LotteryConst.ZT: { //正特
        return <LhcZTComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.LMA: { //连码
        return <LhcLMAComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.LM: //两面
      case LotteryConst.ZM1_6: //正码1T6
      case LotteryConst.SB: //色波
      case LotteryConst.ZOX://总肖
      case LotteryConst.WX: { //五行
        return <LhcSBComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.YX: //平特一肖
      case LotteryConst.WS: //平特尾数
      case LotteryConst.TWS: //头尾数
      case LotteryConst.TX: //特肖
      case LotteryConst.LX: //连肖
      case LotteryConst.LW: //连尾
      case LotteryConst.ZX: { //正肖
        return <LhcPTYXComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.HX: { //合肖
        return <LhcHXComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }
      case LotteryConst.ZXBZ: { //自选不中
        return <LhcZXBZComponent key={lotteryCode}
                               lotteryCode={lotteryCode}/>
      }

    }

    return null
  }

  return (
    <LotteryListContext.Provider value={{
      playOddData: () => playOddDetailData()?.playOdds[leftColumnIndex],
    }}>
      <View key={'lottery bet content'}
            style={_styles.middle_content_container}>
        {renderLeftColumn()}
        {renderRightContent()}
      </View>
    </LotteryListContext.Provider>
  )

}

const _styles = StyleSheet.create({
  middle_content_container: {
    flexDirection: 'row',
    // height: BALL_CONTENT_HEIGHT,
  },
  left_column_container: {
    height: BALL_CONTENT_HEIGHT,
  },
  right_content_list: {
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

export default ListContentComponent
