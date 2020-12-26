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
import { anyEmpty } from '../../../../../../public/tools/Ext'
import { scale } from '../../../../../../public/tools/Scale'
import { UGColor } from '../../../../../../public/theme/UGThemeColor'
import EmptyView from '../../../../../../public/components/view/empty/EmptyView'
import CommStyles from '../../../../../base/CommStyles'
import { PayAisleData, PayAisleListData } from '../../../../../../public/network/Model/wd/PayAisleModel'
import FastImage from 'react-native-fast-image'
import { Res } from '../../../../../../Res/icon/Res'
import WebView from 'react-native-webview'
import UseTransferPay from './UseTransferPay'
import { ManageBankCardData } from '../../../../../../public/network/Model/bank/ManageBankCardModel'
import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../../../../../../public/views/tars/Button'
import { Skin1 } from '../../../../../../public/theme/UGSkinManagers'
import { BaseScreen } from '../../../../../乐橙/component/BaseScreen'
import { ugLog } from '../../../../../../public/tools/UgLog'
import { ANHelper } from '../../../../../../public/define/ANHelper/ANHelper'
import { CMD } from '../../../../../../public/define/ANHelper/hp/CmdDefine'

interface IRouteParams {
  payData?: PayAisleListData, //当前的账户数据
}

/**
 * 支付通道记录
 * @param navigation
 * @constructor
 */
const TransferPayPage = ({ navigation, route }) => {

  const { payData }: IRouteParams = route?.params

  const {
    moneyOption,
    inputMoney,
    setInputMoney,
    inputName,
    setInputName,
    inputRemark,
    setInputRemark,
    selPayChannel,
    setSelPayChannel,
  } = UseTransferPay()

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
      moneyOption.map((item) => <TouchableOpacity onPress={() => setInputMoney(item)}>
        <View style={_styles.choose_channel_item_container}>
          <Text style={_styles.choose_channel_item_text}>{item + '元'}</Text>
        </View>
      </TouchableOpacity>)
    }
  </View>

  /**
   * 已选择的渠道单个条目
   */
  const renderSelectedChannelItem = (title: string) => <View style={_styles.choose_result_title_item}>
    <Text style={_styles.choose_result_title}>{title}</Text>
    <TouchableOpacity onPress={() => {
      switch (Platform.OS) {
        case 'ios':
          //TODO iOS 复制 title 到粘贴板
          break
        case 'android':
          ANHelper.callAsync(CMD.COPY_TO_CLIPBOARD, { value: title })
          break
      }
    }}>
      <Text style={_styles.choose_result_copy}>复制</Text>
    </TouchableOpacity>
  </View>

  /**
   * 已选择的渠道
   */
  const renderSelectedChannel = () => <View>
    <Text style={_styles.choose_result_hint}>请先转账成功后再点下一步提交存款</Text>
    <View style={_styles.choose_result_container}>
      <View style={[_styles.choose_result_title_item, { borderTopWidth: 0 }]}>
        <Text style={_styles.choose_result_title}>{payData.channel[selPayChannel]?.address}</Text>
      </View>
      {
        renderSelectedChannelItem(payData.channel[selPayChannel]?.domain)
      }
      {
        renderSelectedChannelItem(payData.channel[selPayChannel]?.account)
      }
      {
        renderSelectedChannelItem(payData.channel[selPayChannel]?.branchAddress)
      }
    </View>
  </View>

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
  const renderInputInfo = () => <View style={_styles.input_info_container}>
    <TextInput style={_styles.input_info}
               value={inputName}
               onChangeText={(text) => setInputName(text)}
               placeholder={'请填写实际转账人姓名'}/>
    <Text style={_styles.input_info}>{new Date().format('yyyy年MM月dd日 hh时mm分')}</Text>
    <TextInput style={_styles.input_info}
               value={inputRemark}
               onChangeText={(text) => setInputRemark(text)}
               placeholder={'请填写备注信息'}/>
  </View>


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

        <Text style={_styles.select_channel_hint}>
          {payData.prompt}
        </Text>

        {
          renderInputInfo()
        }

        <Button title={'开始充值'}
                titleStyle={_styles.submit_text}
                containerStyle={[_styles.submit_bt,
                  { backgroundColor: Skin1.themeColor }]}
                onPress={() => {
                  // bindPassword({
                  //   login_pwd: loginPwd,
                  //   fund_pwd: fundPwd,
                  //   fund_pwd2: fundPwd2,
                  //   callBack: () => {
                  //     setLoginPwd(null)
                  //   },
                  // })

                }}/>
        <View style={{ height: scale(200) }}/>
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
  choose_result_container: {
    flex: 1,
    alignItems: 'center',
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

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default TransferPayPage
