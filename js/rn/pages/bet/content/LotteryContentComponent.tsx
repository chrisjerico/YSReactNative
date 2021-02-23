/**
 * 彩票内容
 * @constructor
 */
import UseLotteryContent from './UseLotteryContent'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import {
  BALL_CONTENT_HEIGHT,
  CqsscCode, FC3d, GD11x5, HoChiMin,
  K3Code,
  LCode,
  LEFT_ITEM_HEIGHT,
  LhcCode,
  Pk10Code,
} from '../const/LotteryConst'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import LhcTMComponent from './lhc/tm/LhcTMComponent'
import LhcZTComponent from './lhc/zt/LhcZTComponent'
import LhcLMAComponent from './lhc/lma/LhcLMAComponent'
import LhcSBComponent from './lhc/sb/LhcSBComponent'
import LhcPTYXComponent from './lhc/ptyx/LhcPTYXComponent'
import LhcHXComponent from './lhc/hx/LhcHXComponent'
import LhcZXBZComponent from './lhc/zxbz/LhcZXBZComponent'
import { ugLog } from '../../../public/tools/UgLog'
import { UGStore } from '../../../redux/store/UGStore'
import CqsscDWDComponent from './cqssc/dwd/CqsscDWDComponent'
import parseSBData from '../util/parse/lhc/ParseSBDataUtil'
import parseYZDWData from '../util/parse/cqssc/ParseYZDWDataUtil'
import CqsscYZDWComponent from './cqssc/yzdw/CqsscYZDWComponent'
import Cqssc1T5Component from './cqssc/1t5/Cqssc1T5Component'
import CqsscWXComponent from './cqssc/wx/CqsscWXComponent'
import CommStyles from '../../base/CommStyles'
import { PlayOddData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import PK10GFWFComponent from './pk10/gfwf/PK10GFWFComponent'
import K3SJComponent from './k3/sj/K3SJComponent'
import HoChiMinBLComponent from './hcm/bl/HoChiMinBLComponent'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const LotteryContentComponent = () => {

  const {
    leftColumnIndex,
    setLeftColumnIndex,
    ballSelected,
    playOddDetailData, //彩票数据
  } = UseLotteryContent()


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
                <UGText key={'renderLeftColumn' + item?.code}
                      numberOfLines={1}
                      style={_styles.left_column_text}>{item.name}</UGText>
              </View>
            </TouchableWithoutFeedback>
          })
        }
      </View>
    </ScrollView>
  </View>

  /**
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContent = () => {

    const playOdds = playOddDetailData?.playOdds[leftColumnIndex]
    let gameType = playOddDetailData?.game?.gameType // 六合彩 秒秒秒彩 等等
    let gameCode = playOdds?.code // 特码 连码 等等
    ugLog('------------------gameCode---------------------------------', gameCode)

    switch (true) {
      case gameCode == HoChiMin.BL:  //宝路
      case gameCode == HoChiMin.DDQX:  //地段倾斜
        return <HoChiMinBLComponent key={gameCode}
                               playOddData={playOdds}/>

      case gameCode == LhcCode.TM && gameType == LCode.lhc:  //六合彩特码
        return <LhcTMComponent key={gameCode}
                               playOddData={playOdds}/>

      case gameCode == LhcCode.ZM: //正码
      case gameCode == LhcCode.ZT:  //正特
      case gameCode == LhcCode.TM && gameType == LCode.pcdd:  //蛋蛋特码
        return <LhcZTComponent key={gameCode}
                               playOddData={playOdds}/>

      case gameCode != K3Code.DS && gameType == LCode.jsk3:  //快三系列
        return <K3SJComponent key={gameCode}
                               playOddData={playOdds}/>

      case gameCode == LhcCode.LMA:  //连码
        return <LhcLMAComponent key={gameCode}
                                playOddData={playOdds}/>

      case gameCode == LhcCode.WX && gameType == LCode.cqssc:// 五星
        return <CqsscWXComponent key={gameCode}
                                 playOddData={playOdds}/>

      case gameCode == CqsscCode.ALL:  //1-5球
      case gameCode == CqsscCode.Q1:  //第1球/名
      case gameCode == CqsscCode.Q2:  //第2球/名
      case gameCode == CqsscCode.Q3:  //第3球/名
      case gameCode == CqsscCode.Q4:  //第4球/名
      case gameCode == CqsscCode.Q5:  //第5球/名
      case gameCode == CqsscCode.Q6:  //第6球/名
      case gameCode == CqsscCode.Q7:  //第7球/名
      case gameCode == CqsscCode.Q8:  //第8球/名
      case gameCode == CqsscCode.Q9:  //第8球/名
      case gameCode == CqsscCode.Q10:  //第10球/名
      case gameCode == FC3d.QIU1:  //第1球/名
      case gameCode == FC3d.QIU2:  //第2球/名
      case gameCode == FC3d.QIU3:  //第3球/名
      case gameCode == Pk10Code.HE:  //冠亚和
      case gameCode == Pk10Code.P1_5:  //1-5名
      case gameCode == Pk10Code.P6_10:  //6-10名
      case gameCode == GD11x5.G1Z1:  //1中1
      case gameCode == GD11x5.KD:  //跨度
      case gameCode == GD11x5.DD:  //独胆
      case gameCode == GD11x5.HS:  //和数
      case gameCode == GD11x5.HSWS:  //和数尾数
        return <Cqssc1T5Component key={gameCode}
                                  playOddData={playOdds}/>

      case gameCode == CqsscCode.YZDW:  //一字定位
      case gameCode == CqsscCode.EZDW:  //二字定位
      case gameCode == CqsscCode.SZDW:  //三字定位
      case gameCode == FC3d.EZ:  //二字
      case gameCode == FC3d.DWD && gameType == LCode.fc3d:  //福彩3D里面的定位胆
      case gameCode == LhcCode.ZX && gameType == LCode.gd11x5:  //广东11x5直选
      case gameCode == CqsscCode.BDW:  //不定位
        return <CqsscYZDWComponent key={gameCode}
                                   playOddData={playOdds}/>

      case gameCode == Pk10Code.GFWF:  //官方玩法
        return <PK10GFWFComponent key={gameCode}
                                  playOddData={playOdds}/>

      case gameCode == CqsscCode.DWD:  //定位胆
        return <CqsscDWDComponent key={gameCode}
                                  playOddData={playOdds}/>

      case gameCode == LhcCode.YX: //平特一肖
      case gameCode == LhcCode.WS: //平特尾数
      case gameCode == LhcCode.TWS: //头尾数
      case gameCode == LhcCode.TX: //特肖
      case gameCode == LhcCode.LX: //连肖
      case gameCode == LhcCode.LW: //连尾
      case gameCode == LhcCode.ZX:  //正肖
        return <LhcPTYXComponent key={gameCode}
                                 playOddData={playOdds}/>

      case gameCode == LhcCode.HX:  //合肖
        return <LhcHXComponent key={gameCode}
                               playOddData={playOdds}/>

      case gameCode == LhcCode.ZXBZ:  //自选不中
        return <LhcZXBZComponent key={gameCode}
                                 playOddData={playOdds}/>

      default:
        return <LhcSBComponent key={gameCode}
                               playOddData={playOdds}/>

    }
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

export default LotteryContentComponent
