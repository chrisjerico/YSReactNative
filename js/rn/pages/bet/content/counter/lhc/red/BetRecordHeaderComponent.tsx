import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { anyEmpty } from '../../../../../../public/tools/Ext'
import { scale } from '../../../../../../public/tools/Scale'
import { UGColor } from '../../../../../../public/theme/UGThemeColor'
import { Skin1 } from '../../../../../../public/theme/UGSkinManagers'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NextIssueData } from '../../../../../../public/network/Model/lottery/NextIssueModel'
import BetRecordListComponent from './BetRecordListComponent'
import TimeComponent from '../TimeComponent'
import UseBetRecordHeader from './UseBetRecordHeader'
import LotteryZodiacAndBall from '../../../../widget/LotteryZodiacAndBall'
import { UGText } from '../../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import { CqsscCode, FC3d, GD11x5, HoChiMin, K3Code, LCode, LhcCode, Pk10Code } from '../../../../const/LotteryConst'
import HoChiMinBLComponent from '../../../hcm/bl/HoChiMinBLComponent'
import LhcTMComponent from '../../../lhc/tm/LhcTMComponent'
import LhcZTComponent from '../../../lhc/zt/LhcZTComponent'
import K3SJComponent from '../../../k3/sj/K3SJComponent'
import LhcLMAComponent from '../../../lhc/lma/LhcLMAComponent'
import CqsscWXComponent from '../../../cqssc/wx/CqsscWXComponent'
import Cqssc1T5Component from '../../../cqssc/1t5/Cqssc1T5Component'
import CqsscYZDWComponent from '../../../cqssc/yzdw/CqsscYZDWComponent'
import PK10GFWFComponent from '../../../pk10/gfwf/PK10GFWFComponent'
import CqsscDWDComponent from '../../../cqssc/dwd/CqsscDWDComponent'
import LhcPTYXComponent from '../../../lhc/ptyx/LhcPTYXComponent'
import LhcHXComponent from '../../../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../../../lhc/zxbz/LhcZXBZComponent'
import LhcSBComponent from '../../../lhc/sb/LhcSBComponent'
import { UGStore } from '../../../../../../redux/store/UGStore'
import DialogRecordComponent from '../../越南彩开奖记录/DialogRecordComponent'
import { ugLog } from '../../../../../../public/tools/UgLog'

interface IHallGameList {
}

/**
 * 彩票开奖头部
 * @param navigation
 * @constructor
 */
const BetRecordHeaderComponent = ({}: IHallGameList) => {

  const {
    showHistory,
    setShowHistory,
    historyData,
    setHistoryData,
    systemInfo,
    userInfo,
    nextIssueData,
    playOddDetailData,
    toggleHistory,
  } = UseBetRecordHeader()

  let gameType = playOddDetailData?.game?.gameType // 六合彩 秒秒秒彩 等等

  /**
   * 绘制历史开奖记录
   */
  const renderHistoryList = () => {
    switch (true) {
      case gameType == LCode.ofclvn_hochiminhvip:  //胡志明
      case gameType == LCode.ofclvn_haboivip:  //河内
        return (
          !showHistory
            ? null :
            <DialogRecordComponent nextIssueData={UGStore.globalProps?.nextIssueData}
                                   onClosingDialog={() => toggleHistory()}/>
        )

    }


    return (
      !showHistory
        ? null :
        <View key={'BetRecordListComponent container'}
              style={_styles.history_list_container}>
          <BetRecordListComponent key={'BetRecordListComponent container' + historyData}
                                  historyData={historyData}/>
        </View>
    )
  }

  /**
   * 绘制当前开奖记录
   * @param item
   */
  const renderItemContent = (item: NextIssueData) => {
    return (
      <View key={'bet record renderItemContent' + item?.preDisplayNumber}
            style={_styles.ball_item_container}>
        <View key={'renderItemContent issue_container'}
              style={_styles.issue_container}>
          {
            anyEmpty(item?.preDisplayNumber)
              ? null :
              <UGText key={'renderItemContent issue_container' + item.preDisplayNumber}
                      style={_styles.text_content_issue}
                      numberOfLines={1}>{item.preDisplayNumber + '期'}</UGText>
          }
          <Icon key={'renderItemContent issue_container' + showHistory}
                size={scale(48)}
                onPress={() => toggleHistory()}
                style={_styles.issue_arrow}
                color={Skin1.themeColor}
                name={showHistory ? 'angle-double-up' : 'angle-double-down'}/>
        </View>
        <LotteryZodiacAndBall gameType={item?.gameType}
                              zodiacStr={item?.preResult}
                              ballStr={item?.preNum}/>
      </View>
    )
  }

  return (
    <View key={'bet record header'}
          style={_styles.container}>
      {renderItemContent(nextIssueData)}
      {renderHistoryList()}
      <TimeComponent/>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  ball_item_container: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: UGColor.BackgroundColor3,
  },
  issue_container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  issue_arrow: {
    paddingHorizontal: scale(12),
  },
  text_content_issue: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    textAlign: 'center',
  },
  ball_item: {
    margin: scale(4),
  },
  history_list_container: {
    width: scale(540),
    aspectRatio: 2,
  },

})

export default BetRecordHeaderComponent
