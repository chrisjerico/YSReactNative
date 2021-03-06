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
import { PayAisleData, PayAisleListData, PayChannelBean } from '../../../../../../public/network/Model/wd/PayAisleModel'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../../../../Res/icon/Res'
import WebView from 'react-native-webview'
import UseTransferPay, { ITransName } from './UseTransferPay'
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
import { useContext, useEffect, useState } from 'react'
import { Toast } from '../../../../../../public/tools/ToastUtils'
import { CapitalConst } from '../../../../const/CapitalConst'
import CapitalContext from '../../../CapitalContext'
import { pop } from '../../../../../../public/navigation/RootNavigation'
import { OCHelper } from '../../../../../../public/define/OCHelper/OCHelper'
import { clearAllHtml } from '../../../../../../public/tools/StringUtil'
import { UGText } from '../../../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface IRouteParams {
  payData?: PayAisleListData, //当前的条目数据
  payBigData?: PayAisleData, //总数据
  refreshTabPage?: (pageName: string) => void, //刷新哪个界面
}

/**
 * 转账支付
 * @param navigation
 * @constructor
 */
const TransferPayPage = ({ navigation, route }) => {

  const { payData, payBigData, refreshTabPage }: IRouteParams = route?.params
  const [bigPic, setBigPic] = useState(null) //是否有大图片
  const [goPage, setGoPage] = useState(null) //跳转哪个界面

  const {
    setPayData,
    setPayBigData,
    moneyOption,
    inputMoney,
    setInputMoney,
    inputName,
    setInputName,
    inputRemark,
    setInputRemark,
    selPayChannel,
    setSelPayChannel,
    transName,
    requestPayData,
  } = UseTransferPay()

  useEffect(()=>{
    setPayBigData(payBigData)
    setPayData(payData)
  }, [])

  useEffect(()=>{
    if (!anyEmpty(goPage)) {
      refreshTabPage(goPage)
      pop()
    }
  }, [goPage])

  /**
   * 输入金额
   */
  const renderInputMoney = () => <TextInput style={_styles.input_money}
                                            value={inputMoney}
                                            keyboardType={'numeric'}
                                            onChangeText={(text) => setInputMoney(text)}
                                            placeholder={'请填写存款金额'}/>
  /**
   * 选择金额
   */
  const renderChoiceMoney = () => <View style={_styles.choose_channel_container}>
    {
      !anyEmpty(moneyOption) && moneyOption.map((item) => <TouchableOpacity onPress={() => setInputMoney(item)}>
        <View style={_styles.choose_channel_item_container}>
          <UGText style={_styles.choose_channel_item_text}>{item + '元'}</UGText>
        </View>
      </TouchableOpacity>)
    }
  </View>

  /**
   * 已选择的渠道单个条目
   */
  const renderSelectedChannelItem = (title: string,
                                     copyText: string) => <View style={_styles.choose_result_title_item}>
    <UGText style={_styles.choose_result_title}>{title + copyText}</UGText>
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
      <UGText style={_styles.choose_result_copy}>复制</UGText>
    </TouchableOpacity>
  </View>

  /**
   * 已选择的渠道
   */
  const renderSelectedChannel = () => {
    const payChannelBean = payData?.channel[selPayChannel]
    let nameHint: ITransName = transName(payData, payChannelBean)

    return <View>
      <UGText style={_styles.choose_result_hint}>{payBigData?.depositPrompt}</UGText>
      <View style={_styles.choose_result_container}>
        <View style={[_styles.choose_result_title_item, { borderTopWidth: 0 }]}>
          <UGText style={_styles.choose_result_title}>{nameHint?.bank_name + nameHint?.bank_name_des}</UGText>
        </View>
        {
          [
            !anyEmpty(nameHint?.payee) && !anyEmpty(nameHint?.payee_des) && renderSelectedChannelItem(nameHint?.payee, nameHint?.payee_des),
            !anyEmpty(nameHint?.bank_account) && !anyEmpty(nameHint?.bank_account_des) && renderSelectedChannelItem(nameHint?.bank_account, nameHint?.bank_account_des),
            !anyEmpty((nameHint?.account_address)) && !anyEmpty((nameHint?.account_address_des)) && renderSelectedChannelItem(nameHint?.account_address, nameHint?.account_address_des),
            !anyEmpty(payChannelBean?.qrcode) && <TouchableImage
              pic={payChannelBean?.qrcode}
              containerStyle={{ aspectRatio: 1, width: scale(240) }}
              resizeMode={'contain'}
              onPress={() => {
                setBigPic(payChannelBean?.qrcode)
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
          <UGText style={_styles.select_channel_text}>{item?.payeeName}</UGText>
        </View>
      </TouchableOpacity>)
    }
  </View>

  /**
   * 输入转账信息
   */
  const renderInputInfo = () => {
    let nameHint: ITransName = transName(payData)

    return <View style={_styles.input_info_container}>
      <TextInput style={_styles.input_info}
                 value={inputName}
                 onChangeText={(text) => setInputName(text)}
                 placeholder={nameHint?.trans_hint}/>
      <View style={_styles.date_info_container}>
        <UGText style={_styles.date_info}>{new Date().format('yyyy年MM月dd日 hh时mm分')}</UGText>
        <Icon size={scale(20)} name={'calendar'}/>
      </View>
      <TextInput style={_styles.input_info}
                 value={inputRemark}
                 onChangeText={(text) => setInputRemark(text)}
                 placeholder={'请填写备注信息'}/>
    </View>
  }

  return (
    <BaseScreen screenName={payData.name}>
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

        <UGText style={_styles.select_channel_hint}>
          {clearAllHtml(payData.prompt)}
        </UGText>

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
                    payer: inputName,
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
  choose_result_title: {
    flex: 1,
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  choose_result_copy: {
    color: UGColor.RedColor2,
    fontSize: scale(24),
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
    width: '100%',
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

export default TransferPayPage
