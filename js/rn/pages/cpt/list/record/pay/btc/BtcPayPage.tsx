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
import { anyEmpty, arrayLength } from '../../../../../../public/tools/Ext'
import { scale } from '../../../../../../public/tools/Scale'
import { UGColor } from '../../../../../../public/theme/UGThemeColor'
import EmptyView from '../../../../../../public/components/view/empty/EmptyView'
import CommStyles from '../../../../../base/CommStyles'
import { PayAisleData, PayAisleListData } from '../../../../../../public/network/Model/wd/PayAisleModel'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../../../../Res/icon/Res'
import WebView from 'react-native-webview'
import UseBtcPay from './UseBtcPay'
import { ManageBankCardData } from '../../../../../../public/network/Model/bank/ManageBankCardModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../../../../public/views/tars/Button'
import { Skin1 } from '../../../../../../public/theme/UGSkinManagers'
import { BaseScreen } from '../../../../../乐橙/component/BaseScreen'
import { ugLog } from '../../../../../../public/tools/UgLog'
import { ANHelper } from '../../../../../../public/define/ANHelper/ANHelper'
import { CMD } from '../../../../../../public/define/ANHelper/hp/CmdDefine'
import PushHelper from '../../../../../../public/define/PushHelper'
import TouchableImage from '../../../../../../public/views/tars/TouchableImage'
import Modal from 'react-native-modal'
import { useEffect, useState } from 'react'
import { Toast } from '../../../../../../public/tools/ToastUtils'
import AppDefine from '../../../../../../public/define/AppDefine'
import { pop } from '../../../../../../public/navigation/RootNavigation'
import { CapitalConst } from '../../../../const/CapitalConst'
import { OCHelper } from '../../../../../../public/define/OCHelper/OCHelper'

interface IRouteParams {
  payData?: PayAisleListData, //当前的条目数据
  payBigData?: PayAisleData, //总数据
  refreshTabPage?: (pageName: string) => void, //刷新哪个界面
}

/**
 * BTC支付
 * @param navigation
 * @constructor
 */
const BtcPayPage = ({ navigation, route }) => {

  const intentData: IRouteParams = route?.params
  const [bigPic, setBigPic] = useState(null) //是否有大图片
  const [smallPic, setSmallPic] = useState(null) //当前小图
  const [goPage, setGoPage] = useState(null) //跳转哪个界面

  const {
    newRate,
    newUsd,
    moneyOption,
    inputMoney,
    setInputMoney,
    btcMoney,
    setBtcMoney,
    inputRemark,
    setInputRemark,
    selPayChannel,
    setSelPayChannel,
    payData,
    setPayData,
    payBigData,
    setPayBigData,
    requestPayData,
  } = UseBtcPay()

  useEffect(()=>{
    if (!anyEmpty(goPage)) {
      intentData?.refreshTabPage(goPage)
      pop()
    }
  }, [goPage])

  useEffect(()=>{
    setPayBigData(intentData?.payBigData)
    setPayData(intentData?.payData)
  }, [])

  useEffect(() => {
    setSmallPic(AppDefine?.host + '/lib/phpqrcode/image.php?url=' + payData?.channel[selPayChannel]?.account)
  }, [selPayChannel, payData])

  /**
   * 输入金额
   */
  const renderInputMoney = () => <View style={_styles.btc_input_info_container}>
    <TextInput style={_styles.input_money}
               value={inputMoney}
               keyboardType={'numeric'}
               onChangeText={(text) => setInputMoney(text)}
               placeholder={'请填写存款金额'}/>
    <View style={_styles.btc_hint_container}>
      <Text style={_styles.choose_result_title}>{`虚拟币金额: ${btcMoney}`}</Text>
      <Text style={_styles.btc_type}>{payData?.channel[selPayChannel]?.domain}</Text>
      <TouchableOpacity onPress={() => {
        switch (Platform.OS) {
          case 'ios':
            OCHelper.call('UIPasteboard.generalPasteboard.setString:', [btcMoney])
            break
          case 'android':
            ANHelper.callAsync(CMD.COPY_TO_CLIPBOARD, { value: btcMoney })
            break
        }
        Toast('复制成功')
      }}>
        <Text style={_styles.choose_result_copy}>复制</Text>
      </TouchableOpacity>
    </View>
    <View style={_styles.btc_hint_container}>
      <Text style={_styles.btc_type}>{`1${payData?.channel[selPayChannel]?.domain} = ${newUsd}CNY`}</Text>
    </View>
  </View>

  /**
   * 选择金额
   */
  const renderChoiceMoney = () => <View style={_styles.choose_channel_container}>
    {
      !anyEmpty(moneyOption) && moneyOption.map((item) => <TouchableOpacity onPress={() => setInputMoney(item)}>
        <View style={_styles.choose_channel_item_container}>
          <Text style={_styles.choose_channel_item_text}>{item + '元'}</Text>
        </View>
      </TouchableOpacity>)
    }
  </View>

  /**
   * 已选择的渠道单个条目
   */
  const renderSelectedChannelItem = (title: string, copyText: string) => <View style={_styles.choose_result_title_item}>
    <Text style={_styles.choose_result_title}>{title + copyText}</Text>
    <TouchableOpacity onPress={() => {
      switch (Platform.OS) {
        case 'ios':
          OCHelper.call('UIPasteboard.generalPasteboard.setString:', [copyText])
          break
        case 'android':
          ANHelper.callAsync(CMD.COPY_TO_CLIPBOARD, { value: copyText })
          break
      }
      Toast('复制成功')
    }}>
      <Text style={_styles.choose_result_copy}>复制</Text>
    </TouchableOpacity>
  </View>

  /**
   * 已选择的渠道
   */
  const renderSelectedChannel = () => {
    const payChannelBean = payData?.channel[selPayChannel]
    return <View>
      <Text style={_styles.choose_result_hint}>{intentData?.payBigData?.depositPrompt}</Text>
      <View style={_styles.choose_result_container}>
        <View style={[_styles.choose_result_title_item, { borderTopWidth: 0 }]}>
          <Text style={_styles.choose_result_title}>{'币种: ' + payChannelBean?.domain}</Text>
        </View>
        {
          [
            renderSelectedChannelItem('链名称: ', payChannelBean?.address),
            renderSelectedChannelItem('充值地址: ', payChannelBean?.account),
            anyEmpty(smallPic) ?
              null :
              <TouchableImage
                pic={smallPic}
                containerStyle={{ aspectRatio: 1, width: scale(240) }}
                resizeMode={'contain'}
                onPress={() => {
                  setBigPic(smallPic)
                }}
              />,
          ]
        }
      </View>
    </View>
  }

  /**
   * 选择渠道
   */
  const renderAllChannel = () => <View style={_styles.select_channel_container}>
    {
      payData?.channel?.map((item, index) => <TouchableOpacity
        onPress={() => setSelPayChannel(index)}>
        <View style={[_styles.select_channel_item,
          index != 0 ? null : { borderTopWidth: 0 }]}>
          {
            index == selPayChannel ?
              <Icon size={scale(32)} name={'check'}/> :
              <Icon size={scale(32)} name={'circle-o'}/>
          }
          <Text style={_styles.select_channel_text}>{item?.payeeName}</Text>
        </View>
      </TouchableOpacity>)
    }
  </View>

  /**
   * 输入转账信息
   */
  const renderInputInfo = () => {

    return <View style={_styles.input_info_container}>
      <View style={_styles.date_info_container}>
        <Text style={_styles.date_info}>{new Date().format('yyyy年MM月dd日 hh时mm分')}</Text>
        <Icon size={scale(20)} name={'calendar'}/>
      </View>
      <TextInput style={_styles.input_info}
                 value={inputRemark}
                 onChangeText={(text) => setInputRemark(text)}
                 placeholder={'请填写备注信息'}/>
    </View>
  }


  return (
    <BaseScreen screenName={payData?.name}>
      <ScrollView showsVerticalScrollIndicator={false}
                  style={_styles.container}>
        {
          [
            renderAllChannel(),
            renderSelectedChannel(),
            renderInputMoney(),
            renderChoiceMoney(),
          ]
        }

        <Text style={_styles.select_channel_hint}>
          {payData?.prompt}
        </Text>

        {
          renderInputInfo()
        }

        <Button title={'开始充值'}
                titleStyle={_styles.submit_text}
                containerStyle={[_styles.submit_bt,
                  { backgroundColor: Skin1.themeColor }]}
                onPress={() => {
                  requestPayData({
                    amount: inputMoney,
                    channel: payData?.channel[selPayChannel]?.id,
                    payee: payData?.channel[selPayChannel]?.account,
                    payer: `${btcMoney}${payData?.channel[selPayChannel]?.domain}`,
                    remark: inputRemark,
                    depositTime: new Date().format('yyyy-MM-dd hh:mm:ss'),
                  }).then(res => {
                    if (res == 0) {
                      setGoPage(CapitalConst.DEPOSIT_RECORD)
                    }
                  })

                }}/>
        <View style={{ height: scale(200) }}/>
      </ScrollView>

      <Modal isVisible={!anyEmpty(bigPic)}
             style={_styles.modal_content}
             onBackdropPress={() => setBigPic(null)}
             onBackButtonPress={() => setBigPic(null)}
             animationIn={'fadeIn'}
             animationOut={'fadeOut'}
             backdropOpacity={0.3}>
        <FastImage source={{ uri: bigPic }}
                   style={{ aspectRatio: 1, width: scale(500) }}
                   resizeMode={'contain'}/>
      </Modal>
    </BaseScreen>

  )
}

const _styles = StyleSheet.create({
  modal_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: scale(16),
    backgroundColor: UGColor.BackgroundColor1,
    flex: 1,
  },
  input_money: {
    width: '100%',
    padding: scale(12),
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: UGColor.LineColor4,
    fontSize: scale(22),
  },
  choose_channel_container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: scale(16),
  },
  choose_result_container: {
    flex: 1,
    marginBottom: scale(16),
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
    paddingVertical: scale(8),
  },
  choose_result_title_item: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(24),
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    // borderTopWidth: scale(1),
    // borderTopColor: UGColor.LineColor4,
  },
  btc_input_info_container: {
    flex: 1,
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: UGColor.LineColor4,
  },
  btc_hint_container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    justifyContent: 'center',
    // borderTopWidth: scale(1),
    // borderTopColor: UGColor.LineColor4,
  },
  choose_result_title: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  btc_type: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  choose_result_copy: {
    color: UGColor.RedColor2,
    fontSize: scale(24),
    paddingLeft: scale(16),
  },
  choose_result_hint: {
    color: 'white',
    backgroundColor: UGColor.RedColor2,
    fontSize: scale(20),
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
  },
  choose_channel_item_container: {
    width: scale(168),
    justifyContent: 'center',
    alignItems: 'center',
  },
  choose_channel_item_text: {
    width: '90%',
    color: UGColor.TextColor2,
    fontSize: scale(22),
    textAlign: 'center',
    marginTop: scale(8),
    padding: scale(8),
    borderColor: UGColor.LineColor4,
    borderWidth: scale(1),
    borderRadius: scale(8),
    backgroundColor: UGColor.BackgroundColor4,
  },
  select_channel_container: {
    flex: 1,
    marginTop: scale(16),
    marginBottom: scale(16),
    borderRadius: scale(8),
    borderWidth: scale(1),
    borderColor: UGColor.LineColor4,
  },
  select_channel_item: {
    flex: 1,
    borderTopWidth: scale(1),
    borderTopColor: UGColor.LineColor4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
  },
  select_channel_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingHorizontal: scale(16),
  },
  select_channel_hint: {
    color: UGColor.TextColor3,
    fontSize: scale(20),
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
  },
  input_info_container: {
    flex: 1,
    paddingVertical: scale(12),
    marginBottom: scale(32),
  },
  input_info: {
    flex: 1,
    padding: scale(12),
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: UGColor.LineColor4,
    fontSize: scale(22),
    color: UGColor.TextColor2,
  },
  date_info_container: {
    flexDirection: 'row',
    padding: scale(12),
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: UGColor.LineColor4,
    alignItems: 'center',
  },
  date_info: {
    flex: 1,
    fontSize: scale(22),
    color: UGColor.TextColor2,
  },
  submit_text: {
    fontSize: scale(22),
    color: 'white',
  },
  submit_bt: {
    width: '100%',
    height: scale(66),
    borderRadius: scale(8),
  },

})

export default BtcPayPage
