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
import UseBetLottery from './UseBetLottery'
import Modal from 'react-native-modal'
import { useEffect, useState } from 'react'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import * as Animatable from 'react-native-animatable'
import { scale } from '../../public/tools/Scale'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { pop } from '../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import CommStyles from '../base/CommStyles'
import { ugLog } from '../../public/tools/UgLog'
import { UGColor } from '../../public/theme/UGThemeColor'

interface IRouteParams {
  lotteryId: string //当前彩票 id
}

/**
 * 彩票下注
 * @param navigation
 * @constructor
 */
const BetLotteryPage = ({ navigation, route }) => {

  const { lotteryId } = route?.params
  // const [bigPic, setBigPic] = useState(null) //是否有大图片
  // const [smallPic, setSmallPic] = useState(null) //当前小图
  // const [goPage, setGoPage] = useState(null) //跳转哪个界面

  const {
    // newRate,
    // newUsd,
    // moneyOption,
    // inputMoney,
    // setInputMoney,
    // btcMoney,
    // setBtcMoney,
    // inputRemark,
    // setInputRemark,
    // selPayChannel,
    // setSelPayChannel,
    // payData,
    // setPayData,
    // requestPayData,
    setLotteryId,
    nextIssueData,
    playOddDetailData,
    requestNextData,
    requestLotteryData,
  } = UseBetLottery()

  useEffect(() => {
    setLotteryId(lotteryId)
  }, [lotteryId])

  // useEffect(()=>{
  //   if (!anyEmpty(goPage)) {
  //     intentData?.refreshTabPage(goPage)
  //     pop()
  //   }
  // }, [goPage])
  //
  // useEffect(()=>{
  //   setPayData(intentData?.payData)
  // }, [])
  //
  // useEffect(() => {
  //   setSmallPic(AppDefine?.host + '/lib/phpqrcode/image.php?url=' + payData?.channel[selPayChannel]?.account)
  // }, [selPayChannel, payData])
  //
  // /**
  //  * 输入金额
  //  */
  // const renderInputMoney = () => <View style={_styles.btc_input_info_container}>
  //   <TextInput style={_styles.input_money}
  //              value={inputMoney}
  //              keyboardType={'numeric'}
  //              onChangeText={(text) => setInputMoney(text)}
  //              placeholder={'请填写存款金额'}/>
  //   <View style={_styles.btc_hint_container}>
  //     <Text style={_styles.choose_result_title}>{`虚拟币金额: ${btcMoney}`}</Text>
  //     <Text style={_styles.btc_type}>{payData?.channel[selPayChannel]?.domain}</Text>
  //     <TouchableOpacity onPress={() => {
  //       switch (Platform.OS) {
  //         case 'ios':
  //           //TODO iOS 复制 title 到粘贴板
  //           break
  //         case 'android':
  //           ANHelper.callAsync(CMD.COPY_TO_CLIPBOARD, { value: btcMoney })
  //           break
  //       }
  //       Toast('复制成功')
  //     }}>
  //       <Text style={_styles.choose_result_copy}>复制</Text>
  //     </TouchableOpacity>
  //   </View>
  //   <View style={_styles.btc_hint_container}>
  //     <Text style={_styles.btc_type}>{`1${payData?.channel[selPayChannel]?.domain} = ${newUsd}CNY`}</Text>
  //   </View>
  // </View>
  //
  // /**
  //  * 选择金额
  //  */
  // const renderChoiceMoney = () => <View style={_styles.choose_channel_container}>
  //   {
  //     moneyOption.map((item) => <TouchableOpacity onPress={() => setInputMoney(item)}>
  //       <View style={_styles.choose_channel_item_container}>
  //         <Text style={_styles.choose_channel_item_text}>{item + '元'}</Text>
  //       </View>
  //     </TouchableOpacity>)
  //   }
  // </View>
  //
  // /**
  //  * 已选择的渠道单个条目
  //  */
  // const renderSelectedChannelItem = (title: string, copyText: string) => <View style={_styles.choose_result_title_item}>
  //   <Text style={_styles.choose_result_title}>{title + copyText}</Text>
  //   <TouchableOpacity onPress={() => {
  //     switch (Platform.OS) {
  //       case 'ios':
  //         //TODO iOS 复制 title 到粘贴板
  //         break
  //       case 'android':
  //         ANHelper.callAsync(CMD.COPY_TO_CLIPBOARD, { value: copyText })
  //         break
  //     }
  //     Toast('复制成功')
  //   }}>
  //     <Text style={_styles.choose_result_copy}>复制</Text>
  //   </TouchableOpacity>
  // </View>
  //
  // /**
  //  * 已选择的渠道
  //  */
  // const renderSelectedChannel = () => {
  //   const payChannelBean = payData?.channel[selPayChannel]
  //   return <View>
  //     <Text style={_styles.choose_result_hint}>请先转账成功后再点下一步提交存款</Text>
  //     <View style={_styles.choose_result_container}>
  //       <View style={[_styles.choose_result_title_item, { borderTopWidth: 0 }]}>
  //         <Text style={_styles.choose_result_title}>{'币种: ' + payChannelBean?.domain}</Text>
  //       </View>
  //       {
  //         [
  //           renderSelectedChannelItem('链名称: ', payChannelBean?.address),
  //           renderSelectedChannelItem('充值地址: ', payChannelBean?.account),
  //           anyEmpty(smallPic) ?
  //             null :
  //             <TouchableImage
  //               pic={smallPic}
  //               containerStyle={{ aspectRatio: 1, width: scale(240) }}
  //               resizeMode={'contain'}
  //               onPress={() => {
  //                 setBigPic(smallPic)
  //               }}
  //             />,
  //         ]
  //       }
  //     </View>
  //   </View>
  // }
  //
  // /**
  //  * 选择渠道
  //  */
  // const renderAllChannel = () => <View style={_styles.select_channel_container}>
  //   {
  //     payData?.channel?.map((item, index) => <TouchableOpacity
  //       onPress={() => setSelPayChannel(index)}>
  //       <View style={[_styles.select_channel_item,
  //         index != 0 ? null : { borderTopWidth: 0 }]}>
  //         {
  //           index == selPayChannel ?
  //             <Icon size={scale(32)} name={'check'}/> :
  //             <Icon size={scale(32)} name={'circle-o'}/>
  //         }
  //         <Text style={_styles.select_channel_text}>{item?.payeeName}</Text>
  //       </View>
  //     </TouchableOpacity>)
  //   }
  // </View>
  //
  // /**
  //  * 输入转账信息
  //  */
  // const renderInputInfo = () => {
  //
  //   return <View style={_styles.input_info_container}>
  //     <View style={_styles.date_info_container}>
  //       <Text style={_styles.date_info}>{new Date().format('yyyy年MM月dd日 hh时mm分')}</Text>
  //       <Icon size={scale(20)} name={'calendar'}/>
  //     </View>
  //     <TextInput style={_styles.input_info}
  //                value={inputRemark}
  //                onChangeText={(text) => setInputRemark(text)}
  //                placeholder={'请填写备注信息'}/>
  //   </View>
  // }

  const [textSize, setTextSize] = useState(scale(22))
  const [tabIndex, setTabIndex] = useState(0) //当前选中哪个tab，投注0 还是游戏1
  const [leftColumnIndex, setLeftColumnIndex] = useState(0) // 左边大类选择了哪个，特码 正码 双面


  /**
   * 绘制顶部的标题栏
   */
  const renderTopBar = () => <View style={[_styles.top_bar_container,
    { backgroundColor: Skin1.themeColor }]}>
    <TouchableOpacity onPress={() => pop()}>
      <View style={_styles.back_bt_container}>
        <Icon size={scale(32)}
              name={'angle-left'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableOpacity>
    <Text style={[_styles.top_game_name,
      { color: Skin1.navBarTitleColor }]}>{'彩票'}</Text>
    <Icon size={scale(28)}
          name={'caret-down'}
          color={Skin1.navBarTitleColor}/>
    <View style={CommStyles.flex}/>
    <Text style={[_styles.top_money,
      { color: Skin1.navBarTitleColor }]}>{'1002'}</Text>
    <Icon size={scale(24)}
          name={'undo'}
          color={Skin1.navBarTitleColor}/>
    <TouchableOpacity onPress={() => pop()}>
      <View style={_styles.back_bt_container}>
        <Icon size={scale(32)}
              name={'bars'}
              color={Skin1.navBarTitleColor}/>
      </View>
    </TouchableOpacity>

  </View>

  /**
   * 绘制左边列表 特码 双面 正码 等等
   */
  const renderLeftColumn = () => <View
    >
    <ScrollView showsVerticalScrollIndicator={false}>
      {
        playOddDetailData?.playOdds?.map((item, index) => {
          return <TouchableOpacity onPress={() => setLeftColumnIndex(index)}>
            <View style={[
              {
                width: scale(140),
                alignItems: 'center',
                justifyContent: 'center',
                height: scale(52),
                borderRadius: scale(8),
                borderWidth: leftColumnIndex == index ? scale(3) : scale(1)
              },
              {
                borderColor: leftColumnIndex == index ? Skin1.themeColor : UGColor.LineColor4
              }
            ]}>
              <Text style={{
                color: UGColor.TextColor7,
                fontSize: scale(22),
              }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        })
      }
    </ScrollView>
  </View>

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

  /**
   * 绘制游戏聊天切换tab
   */
  const renderGameTab = () => <View style={[_styles.game_tab_container,
    { backgroundColor: `${Skin1.themeColor}cc` }]}>

    <View style={[_styles.game_tab, _styles.game_tab_left, { backgroundColor: '#ffffff44' }]}>
      <Text style={_styles.tab_text}>{'投注区'}</Text>
    </View>
    <View style={[_styles.game_tab, _styles.game_tab_right]}>
      <Text style={_styles.tab_text}>{'主房间'}</Text>
    </View>

  </View>

  return (
    <BaseScreen screenName={''}
                style={{ backgroundColor: UGColor.BackgroundColor1 }}
                hideBar={true}>

      {/*<Text>{lotteryId}</Text>*/}
      {/*<Animatable.Text animation="pulse" easing="linear" iterationDelay={1000} iterationCount="infinite" style={{ textAlign: 'center', backgroundColor: 'yellow' }}>{new Date().format('yyyy年MM月dd日 hh时mm分')}️</Animatable.Text>*/}

      {/*<Animatable.Text style={{backgroundColor: 'red'}} animation="slideInDown" iterationCount="infinite" direction="alternate">Up and down you go</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="zoomInUp" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeIn" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInDown" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInDownBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInUp" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInUpBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInLeft" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInLeftBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInRight" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}
      {/*<Animatable.Text style={{backgroundColor: 'blue'}} animation="fadeInRightBig" iterationCount="infinite">Zoom me up, Scotty</Animatable.Text>*/}

      {/*<TouchableOpacity onPress={() => setTextSize(textSize + 5)}>*/}
      {/*  <Animatable.Text transition="fontSize" style={{fontSize: textSize}}>Size me up, Scotty</Animatable.Text>*/}
      {/*</TouchableOpacity>*/}

      {/*<Modal isVisible={!anyEmpty(bigPic)}*/}
      {/*       style={_styles.modal_content}*/}
      {/*       onBackdropPress={() => setBigPic(null)}*/}
      {/*       onBackButtonPress={() => setBigPic(null)}*/}
      {/*       animationIn={'fadeIn'}*/}
      {/*       animationOut={'fadeOut'}*/}
      {/*       backdropOpacity={0.3}>*/}
      {/*  <FastImage source={{ uri: bigPic }}*/}
      {/*             style={{ aspectRatio: 1, width: scale(500) }}*/}
      {/*             resizeMode={'contain'}/>*/}
      {/*</Modal>*/}

      {
        [
          renderTopBar(),
          renderGameTab(),
          <View style={{ flexDirection: 'row', flex: 1, }}>
            {renderLeftColumn()}
            {renderRightContent()}
          </View>,
        ]
      }
    </BaseScreen>

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

export default BetLotteryPage
