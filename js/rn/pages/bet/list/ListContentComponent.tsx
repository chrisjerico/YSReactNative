/**
 * 彩票内容
 * @constructor
 */
import UseListContent from './UseListContent'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import { BALL_CONTENT_HEIGHT, CqsscCode, LCode, LEFT_ITEM_HEIGHT, LhcCode } from '../const/LotteryConst'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import LhcTMComponent from '../lhc/tm/LhcTMComponent'
import LhcZTComponent from '../lhc/zt/LhcZTComponent'
import LhcLMAComponent from '../lhc/lma/LhcLMAComponent'
import LhcSBComponent from '../lhc/sb/LhcSBComponent'
import LhcPTYXComponent from '../lhc/ptyx/LhcPTYXComponent'
import LhcHXComponent from '../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../lhc/zxbz/LhcZXBZComponent'
import { ugLog } from '../../../public/tools/UgLog'
import { UGStore } from '../../../redux/store/UGStore'
import CqsscDWDComponent from '../cqssc/dwd/CqsscDWDComponent'
import parseSBData from '../util/parse/lhc/ParseSBDataUtil'
import parseYZDWData from '../util/parse/cqssc/ParseYZDWDataUtil'
import CqsscYZDWComponent from '../cqssc/yzdw/CqsscYZDWComponent'
import Cqssc1T5Component from '../cqssc/1t5/Cqssc1T5Component'
import CqsscWXComponent from '../cqssc/wx/CqsscWXComponent'
import CommStyles from '../../base/CommStyles'
import { PlayOddData } from '../../../public/network/Model/lottery/PlayOddDetailModel'

const ListContentComponent = () => {

  const {
    leftColumnIndex,
    setLeftColumnIndex,
    ballSelected,
    playOddDetailData, //彩票数据
  } = UseListContent()


  /**
   * 绘制左边列表 特码 双面 正码 等等
   */
  const renderLeftColumn = () => <View style={_styles.left_column_container}>
    <ScrollView nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
      <View style={_styles.left_column_content}>
        {
          playOddDetailData?.playOdds?.map((item, index) => {
            return <TouchableWithoutFeedback key={'renderLeftColumn' + item?.code}
                                             onPress={() => {
                                               setLeftColumnIndex(index)
                                             }}>
              <View key={'renderLeftColumn' + item?.code}
                    style={[
                      _styles.left_column_item,
                      {
                        borderWidth: leftColumnIndex == index ? scale(3) : scale(1),
                        borderColor: leftColumnIndex == index ? Skin1.themeColor : UGColor.LineColor4,
                      },
                    ]}>
                <View style={[
                  _styles.left_column_text_flag,
                  ballSelected[item?.code] ? { backgroundColor: UGColor.WarnningColor1 } : null,
                ]}>
                </View>
                <Text key={'renderLeftColumn' + item?.code}
                      numberOfLines={1}
                      style={_styles.left_column_text}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          })
        }
      </View>
    </ScrollView>
  </View>

  /**
   * 加载彩票对象
   * @param targetPlayOdds
   */
  const renderLotteryComponent = (targetPlayOdds?: PlayOddData) => {

    let gameType = playOddDetailData?.lotteryLimit?.gameType // 六合彩 秒秒秒彩 等等

    const targetLotteryCode = targetPlayOdds?.code // 特码code 连码code 等等
    const currentPlayOdds = playOddDetailData?.playOdds[leftColumnIndex] // 特码 连码 等等
    const currentLotteryCode = currentPlayOdds?.code // 特码code 连码code 等等
    const isEqual = currentLotteryCode == targetLotteryCode //加载的彩票和选中的彩票是否相同

    ugLog('------------------lotteryCode---------------------------------', isEqual, targetLotteryCode, currentLotteryCode)

    switch (targetLotteryCode) {
      case LhcCode.TM:  //特码
        return <LhcTMComponent key={targetLotteryCode}
                               playOddData={targetPlayOdds}
                               style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
        return <LhcZTComponent key={targetLotteryCode}
                               playOddData={targetPlayOdds}
                               style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case LhcCode.LMA:  //连码
        return <LhcLMAComponent key={targetLotteryCode}
                                playOddData={targetPlayOdds}
                                style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case LhcCode.LM: //两面
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case CqsscCode.QZH:  //前中后
      case CqsscCode.DN:  //斗牛
      case CqsscCode.SH:  //梭哈
      case CqsscCode.LHD:  //龙虎斗
        return <LhcSBComponent key={targetLotteryCode}
                               playOddData={targetPlayOdds}
                               style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case CqsscCode.ALL:  //1-5球
      case CqsscCode.Q1:  //第1球
      case CqsscCode.Q2:  //第2球
      case CqsscCode.Q3:  //第3球
      case CqsscCode.Q4:  //第4球
      case CqsscCode.Q5:  //第5球
        return <Cqssc1T5Component key={targetLotteryCode}
                                  playOddData={targetPlayOdds}
                                  style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case CqsscCode.YZDW:  //一字定位
      case CqsscCode.EZDW:  //二字定位
      case CqsscCode.SZDW:  //三字定位
      case CqsscCode.BDW:  //不定位
        return <CqsscYZDWComponent key={targetLotteryCode}
                                   playOddData={targetPlayOdds}
                                   style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case CqsscCode.DWD:  //定位胆
        // ugLog('playOdds = ', JSON.stringify(playOdds))
        return <CqsscDWDComponent key={targetLotteryCode}
                                  playOddData={targetPlayOdds}
                                  style={isEqual ? CommStyles.flex : { display: 'none' }}/>


      case LhcCode.WX:
        if (gameType == LCode.lhc) { //五行
          return <LhcSBComponent key={targetLotteryCode}
                                 playOddData={targetPlayOdds}
                                 style={isEqual ? CommStyles.flex : { display: 'none' }}/>
        } else if (gameType == LCode.cqssc) { //五星
          return <CqsscWXComponent key={targetLotteryCode}
                                   playOddData={targetPlayOdds}
                                   style={isEqual ? CommStyles.flex : { display: 'none' }}/>
        }
        break

      case LhcCode.YX: //平特一肖
      case LhcCode.WS: //平特尾数
      case LhcCode.TWS: //头尾数
      case LhcCode.TX: //特肖
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      case LhcCode.ZX:  //正肖
        return <LhcPTYXComponent key={targetLotteryCode}
                                 playOddData={targetPlayOdds}
                                 style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case LhcCode.HX:  //合肖
        return <LhcHXComponent key={targetLotteryCode}
                               playOddData={targetPlayOdds}
                               style={isEqual ? CommStyles.flex : { display: 'none' }}/>

      case LhcCode.ZXBZ:  //自选不中
        return <LhcZXBZComponent key={targetLotteryCode}
                                 playOddData={targetPlayOdds}
                                 style={isEqual ? CommStyles.flex : { display: 'none' }}/>

    }

    return null
  }

  /**
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContent = () => {
    // return <View style={CommStyles.flex}>
    //   {
    //     playOddDetailData?.playOdds?.map((playOddData) => renderLotteryComponent(playOddData))
    //   }
    // </View>

    const playOdds = playOddDetailData?.playOdds[leftColumnIndex]
    let gameType = playOddDetailData?.lotteryLimit?.gameType // 六合彩 秒秒秒彩 等等
    let lotteryCode = playOdds?.code // 特码 连码 等等
    ugLog('------------------lotteryCode---------------------------------', lotteryCode)

    switch (lotteryCode) {
      case LhcCode.TM:  //特码
        return <LhcTMComponent key={lotteryCode}
                               playOddData={playOdds}/>

      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
        return <LhcZTComponent key={lotteryCode}
                               playOddData={playOdds}/>

      case LhcCode.LMA:  //连码
        return <LhcLMAComponent key={lotteryCode}
                                playOddData={playOdds}/>

      case LhcCode.LM: //两面
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case CqsscCode.QZH:  //前中后
      case CqsscCode.DN:  //斗牛
      case CqsscCode.SH:  //梭哈
      case CqsscCode.LHD:  //龙虎斗
        return <LhcSBComponent key={lotteryCode}
                               playOddData={playOdds}/>

      case CqsscCode.ALL:  //1-5球
      case CqsscCode.Q1:  //第1球
      case CqsscCode.Q2:  //第2球
      case CqsscCode.Q3:  //第3球
      case CqsscCode.Q4:  //第4球
      case CqsscCode.Q5:  //第5球
        return <Cqssc1T5Component key={lotteryCode}
                                  playOddData={playOdds}/>

      case CqsscCode.YZDW:  //一字定位
      case CqsscCode.EZDW:  //二字定位
      case CqsscCode.SZDW:  //三字定位
      case CqsscCode.BDW:  //不定位
        return <CqsscYZDWComponent key={lotteryCode}
                                   playOddData={playOdds}/>

      case CqsscCode.DWD:  //定位胆
        // ugLog('playOdds = ', JSON.stringify(playOdds))
        return <CqsscDWDComponent key={lotteryCode}
                                  playOddData={playOdds}/>


      case LhcCode.WX:
        if (gameType == LCode.lhc) { //五行
          return <LhcSBComponent key={lotteryCode}
                                 playOddData={playOdds}/>
        } else if (gameType == LCode.cqssc) { //五星
          return <CqsscWXComponent key={lotteryCode}
                                   playOddData={playOdds}/>
        }
        break

      case LhcCode.YX: //平特一肖
      case LhcCode.WS: //平特尾数
      case LhcCode.TWS: //头尾数
      case LhcCode.TX: //特肖
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      case LhcCode.ZX:  //正肖
        return <LhcPTYXComponent key={lotteryCode}
                                 playOddData={playOdds}/>

      case LhcCode.HX:  //合肖
        return <LhcHXComponent key={lotteryCode}
                               playOddData={playOdds}/>

      case LhcCode.ZXBZ:  //自选不中
        return <LhcZXBZComponent key={lotteryCode}
                                 playOddData={playOdds}/>

    }

    return null
  }

  return (
    <View key={'lottery bet content'}
          style={_styles.middle_content_container}>
      {renderLeftColumn()}
      {renderRightContent()}
    </View>
  )

}

const _styles = StyleSheet.create({
  middle_content_container: {
    flexDirection: 'row',
    // height: BALL_CONTENT_HEIGHT,
    paddingBottom: scale(120),
  },
  left_column_container: {
    height: BALL_CONTENT_HEIGHT,
  },
  right_content_list: {
    height: BALL_CONTENT_HEIGHT,
  },
  left_column_content: {
    paddingBottom: scale(120),
  },
  left_column_text: {
    color: UGColor.TextColor7,
    fontSize: scale(22),
    flex: 1,
  },
  left_column_item: {
    width: scale(140),
    flexDirection: 'row',
    alignItems: 'center',
    height: LEFT_ITEM_HEIGHT,
    borderRadius: scale(4),
  },
  left_column_text_flag: {
    backgroundColor: UGColor.LineColor2,
    borderRadius: scale(16),
    width: scale(16),
    aspectRatio: 1,
    marginLeft: scale(8),
    marginRight: scale(6),
  },

})

export default ListContentComponent
