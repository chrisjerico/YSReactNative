import {
  FlatList,
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
import UseOnlinePay from './UseOnlinePay'
import { ManageBankCardData } from '../../../../../../public/network/Model/bank/ManageBankCardModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../../../../public/views/tars/Button'
import { Skin1 } from '../../../../../../public/theme/UGSkinManagers'
import { BaseScreen } from '../../../../../乐橙/component/BaseScreen'
import { ugLog } from '../../../../../../public/tools/UgLog'
import UGDropDownPicker from '../../../../../bank/add/view/UGDropdownPicker'
import { useEffect, useState } from 'react'
import { getBankIcon } from '../../../../../bank/list/UseManageBankList'
import { clearAllHtml } from '../../../../../../public/tools/ui/UIUtil'

interface IRouteParams {
  payData?: PayAisleListData, //当前的条目数据
  payBigData?: PayAisleData, //总数据
  refreshTabPage?: (pageName: string) => void, //刷新哪个界面
}

/**
 * 在线支付
 * @param navigation
 * @constructor
 */
const OnlinePayPage = ({ navigation, route }) => {

  const { payData, payBigData, refreshTabPage }: IRouteParams = route?.params

  let bankController //银行选择

  const {
    setPayData,
    setPayBigData,
    curSelBank,
    setCurSelBank,
    accountItems,
    setAccountItems,
    moneyOption,
    setMoneyOption,
    inputMoney,
    setInputMoney,
    selPayChannel,
    setSelPayChannel,
    requestPayData,
  } = UseOnlinePay()

  useEffect(()=>{
    setPayBigData(payBigData)
    setPayData(payData)
  }, [])

  useEffect(() => {
    //重新绘制银行选择界面
    bankController?.close()
  }, [selPayChannel])

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
          <Text style={_styles.choose_channel_item_text}>{item + '元'}</Text>
        </View>
      </TouchableOpacity>)
    }
  </View>

  /**
   * 已选择的渠道
   */
  const renderSelectedChannel = () => {
    let showTitle: string
    if (!anyEmpty(payData.channel[selPayChannel]?.fcomment)) {
      showTitle = payData.channel[selPayChannel]?.fcomment
    } else if (payData.prompt) {
      showTitle = payData.prompt
    } else {
      showTitle = payData.channel[selPayChannel]?.payeeName
    }

    return <View>
      <Text style={_styles.choose_channel_title}>{clearAllHtml(showTitle)}</Text>
      <Text style={_styles.choose_channel_hint}>{payBigData?.transferPrompt}</Text>
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


  return (
    <BaseScreen screenName={payData.name}>
      <ScrollView showsVerticalScrollIndicator={false}
                  style={_styles.container}>
        {
          [
            renderInputMoney(),
            renderChoiceMoney(),
            renderSelectedChannel(),
            renderAllChannel(),
            !anyEmpty(curSelBank) && <UGDropDownPicker
              items={accountItems}
              controller={instance => bankController = instance}
              defaultValue={curSelBank}
              dropDownMaxHeight={scale(320)}
              onChangeItem={item => {
                setCurSelBank(item.value)
              }
              }/>,
          ]
        }

        <Button title={'开始充值'}
                titleStyle={_styles.submit_text}
                containerStyle={[_styles.submit_bt,
                  { backgroundColor: Skin1.themeColor }]}
                onPress={() => {
                  requestPayData({
                    money: inputMoney,
                    payId: payData?.channel[selPayChannel]?.id,
                    gateway: curSelBank,
                  })

                }}/>
        <View style={{ height: scale(300) }}/>
      </ScrollView>
    </BaseScreen>

  )
}

const _styles = StyleSheet.create({
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
  choose_channel_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
  },
  choose_channel_hint: {
    color: UGColor.RedColor2,
    fontSize: scale(20),
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
  submit_text: {
    fontSize: scale(22),
    color: 'white',
  },
  submit_bt: {
    width: '100%',
    height: scale(66),
    borderRadius: scale(8),
    marginTop: scale(48),
  },

})

export default OnlinePayPage
