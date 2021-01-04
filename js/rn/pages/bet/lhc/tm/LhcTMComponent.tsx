import {
  FlatList, Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback, TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import * as React from 'react'
import FastImage from 'react-native-fast-image'
import WebView from 'react-native-webview'
import Modal from 'react-native-modal'
import { useEffect, useState } from 'react'
import { BaseScreen } from '../../../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { pop } from '../../../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../../../base/CommStyles'
import { ugLog } from '../../../../public/tools/UgLog'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import UseLhcTM from './UseLhcTM'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import { PlayOddData, PlayOddDetailData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'

interface IRouteParams {
  nextIssueData?: NextIssueData //下期数据
  playOddDetailData?: PlayOddDetailData //当前彩种信息
  playOddData?: PlayOddData //当前数据列表
}

/**
 * 六合彩特码
 *
 * @param navigation
 * @constructor
 */
const LhcTMComponent = ({
                          nextIssueData,
                          playOddDetailData,
                          playOddData,
                        }: IRouteParams) => {


  const {
    setNextIssueData,
    setPlayOddDetailData,
    setPlayOddData,
    playGroupData,
    setPlayGroupData,
  } = UseLhcTM()

  useEffect(() => {
    setNextIssueData(nextIssueData)
    setPlayOddDetailData(playOddDetailData)
    setPlayOddData(playOddData)
  }, [])

  /**
   * 绘制右边彩票区域，彩球 等等
   */
  const renderRightContent = () => <View style={{ flex: 1 }}>
    <ScrollView showsVerticalScrollIndicator={false}
    >
      {
        playOddDetailData?.playOdds[0]?.playGroups[0]?.plays?.map((item) => {
          return <View>
            <Text>{item.name}</Text>
          </View>
        })
      }
    </ScrollView>
  </View>

  return (
    <View style={CommStyles.flex}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            playOddDetailData?.playOdds[0]?.playGroups[0]?.plays?.map((item) => {
              return <View>
                <Text>{item.name}</Text>
              </View>
            })
          }
        </View>
      </ScrollView>
    </View>

  )
}

const _styles = StyleSheet.create({
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_bt_container: {
    height: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // container: {
  //   padding: scale(16),
  //   backgroundColor: UGColor.BackgroundColor1,
  //   flex: 1,
  // },
  // input_money: {
  //   width: '100%',
  //   padding: scale(12),
  //   borderWidth: scale(1),
  //   borderRadius: scale(8),
  //   borderColor: UGColor.LineColor4,
  //   fontSize: scale(22),
  // },
  // choose_channel_container: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   marginBottom: scale(16),
  // },
  // choose_result_container: {
  //   flex: 1,
  //   marginBottom: scale(16),
  //   borderBottomLeftRadius: scale(8),
  //   borderBottomRightRadius: scale(8),
  //   borderWidth: scale(1),
  //   borderColor: UGColor.LineColor4,
  //   paddingVertical: scale(8),
  // },
  // choose_result_title_item: {
  //   flex: 1,
  //   color: UGColor.TextColor2,
  //   fontSize: scale(24),
  //   flexDirection: 'row',
  //   paddingHorizontal: scale(16),
  //   paddingVertical: scale(8),
  //   // borderTopWidth: scale(1),
  //   // borderTopColor: UGColor.LineColor4,
  // },
  // btc_input_info_container: {
  //   flex: 1,
  //   borderWidth: scale(1),
  //   borderRadius: scale(8),
  //   borderColor: UGColor.LineColor4,
  // },
  // btc_hint_container: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   paddingHorizontal: scale(16),
  //   paddingVertical: scale(8),
  //   justifyContent: 'center',
  //   // borderTopWidth: scale(1),
  //   // borderTopColor: UGColor.LineColor4,
  // },
  // choose_result_title: {
  //   flex: 1,
  //   color: UGColor.TextColor2,
  //   fontSize: scale(24),
  // },
  // btc_type: {
  //   color: UGColor.TextColor2,
  //   fontSize: scale(24),
  //   fontStyle: 'italic',
  // },
  // choose_result_copy: {
  //   color: UGColor.RedColor2,
  //   fontSize: scale(24),
  //   paddingLeft: scale(16),
  // },
  // choose_result_hint: {
  //   color: 'white',
  //   backgroundColor: UGColor.RedColor2,
  //   fontSize: scale(20),
  //   paddingVertical: scale(4),
  //   paddingHorizontal: scale(8),
  //   borderTopLeftRadius: scale(8),
  //   borderTopRightRadius: scale(8),
  // },
  // choose_channel_item_container: {
  //   width: scale(168),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // choose_channel_item_text: {
  //   width: '90%',
  //   color: UGColor.TextColor2,
  //   fontSize: scale(22),
  //   textAlign: 'center',
  //   marginTop: scale(8),
  //   padding: scale(8),
  //   borderColor: UGColor.LineColor4,
  //   borderWidth: scale(1),
  //   borderRadius: scale(8),
  //   backgroundColor: UGColor.BackgroundColor4,
  // },
  // select_channel_container: {
  //   flex: 1,
  //   marginTop: scale(16),
  //   marginBottom: scale(16),
  //   borderRadius: scale(8),
  //   borderWidth: scale(1),
  //   borderColor: UGColor.LineColor4,
  // },
  // select_channel_item: {
  //   flex: 1,
  //   borderTopWidth: scale(1),
  //   borderTopColor: UGColor.LineColor4,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: scale(16),
  // },
  // select_channel_text: {
  //   color: UGColor.TextColor3,
  //   fontSize: scale(22),
  //   paddingHorizontal: scale(16),
  // },
  // select_channel_hint: {
  //   color: UGColor.TextColor3,
  //   fontSize: scale(20),
  //   paddingVertical: scale(4),
  //   paddingHorizontal: scale(8),
  // },
  // input_info_container: {
  //   flex: 1,
  //   paddingVertical: scale(12),
  //   marginBottom: scale(32),
  // },
  // input_info: {
  //   flex: 1,
  //   padding: scale(12),
  //   borderWidth: scale(1),
  //   borderRadius: scale(8),
  //   borderColor: UGColor.LineColor4,
  //   fontSize: scale(22),
  //   color: UGColor.TextColor2,
  // },
  // date_info_container: {
  //   flexDirection: 'row',
  //   padding: scale(12),
  //   borderWidth: scale(1),
  //   borderRadius: scale(8),
  //   borderColor: UGColor.LineColor4,
  //   alignItems: 'center',
  // },
  // date_info: {
  //   flex: 1,
  //   fontSize: scale(22),
  //   color: UGColor.TextColor2,
  // },
  // submit_text: {
  //   fontSize: scale(22),
  //   color: 'white',
  // },
  // submit_bt: {
  //   width: '100%',
  //   height: scale(66),
  //   borderRadius: scale(8),
  // },
  top_bar_container: {
    width: scale(540),
    height: scale(72),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  top_game_name: {
    textAlign: 'center',
    fontSize: scale(24),
    color: Skin1.navBarTitleColor,
    paddingHorizontal: scale(8),
  },
  top_money: {
    textAlign: 'center',
    fontSize: scale(24),
    color: Skin1.navBarTitleColor,
    paddingHorizontal: scale(8),
  },
  game_tab_container: {
    width: scale(540),
    height: scale(58),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  game_tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  game_tab_left: {
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(12),
  },
  game_tab_right: {},
  tab_text: {
    fontSize: scale(22),
    color: 'white',
  },


})

export default LhcTMComponent
