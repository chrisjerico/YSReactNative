import { StyleSheet, TextInput, View } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import { BaseScreen } from '../../乐橙/component/BaseScreen'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import Button from '../../../public/views/tars/Button'
import { pop } from '../../../public/navigation/RootNavigation'
import UseSetPassword from './UseSetPassword'

interface IRouteParams {
  onCallback?: () => any, //设置密码成功
}

/**
 * 设置密码
 * @param navigation
 * @constructor
 */
const SetPasswordPage = ({ navigation, route }) => {

  const [loginPwd, setLoginPwd] = useState(null) //登录密码
  const [fundPwd, setFundPwd] = useState(null) //取款密码
  const [fundPwd2, setFundPwd2] = useState(null) //取款密码

  const { onCallback }: IRouteParams = route?.params

  const {
    userInfo,
    systemInfo,
    bindPassword,
  } = UseSetPassword()

  /**
   * 绘制绑定密码
   */
  const renderBindPwd = () => <View style={_styles.item_pwd_container}>
    <View style={_styles.item_pwd_content}>
      <View style={[_styles.bank_bank_name_2nd_container, { borderTopWidth: 0 }]}>
        <TextInput style={_styles.input_name}
                   secureTextEntry={true}
                   onChangeText={text => setLoginPwd(text)}
                   placeholder={'请输入当前登录密码'}/>
      </View>
      <View style={_styles.bank_bank_name_2nd_container}>
        <TextInput style={_styles.input_name}
                   maxLength={4}
                   secureTextEntry={true}
                   onChangeText={text => setFundPwd(text)}
                   placeholder={'请输入您的4位数字提款密码'}/>
      </View>
      <View style={_styles.bank_bank_name_2nd_container}>
        <TextInput style={_styles.input_name}
                   maxLength={4}
                   secureTextEntry={true}
                   onChangeText={text => setFundPwd2(text)}
                   placeholder={'请确认您的提款密码'}/>
      </View>
    </View>

    <Button title={'提交'}
            titleStyle={_styles.submit_text}
            containerStyle={[_styles.submit_bt,
              { backgroundColor: Skin1.themeColor }]}
            onPress={() => {
              bindPassword({
                login_pwd: loginPwd,
                fund_pwd: fundPwd,
                fund_pwd2: fundPwd2,
                callBack: () => {
                  onCallback && onCallback()
                  pop()
                },
              })

            }}/>
  </View>

  return (
    <BaseScreen style={_styles.container} screenName={'设置密码'}>
      {
        renderBindPwd()
      }
    </BaseScreen>
  )
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: UGColor.BackgroundColor1
  },
  item_pwd_container: {
    padding: scale(32),
    flex: 1,
  },
  item_pwd_content: {
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
    marginBottom: scale(64),
  },
  item_bank_container: {
    paddingHorizontal: scale(32),
    paddingTop: scale(32),
    flex: 1,
  },
  item_bank_2nd_content: {
    borderWidth: scale(1),
    borderTopWidth: 0,
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  item_bank_2nd_content_wx: {
    borderWidth: scale(1),
    borderColor: UGColor.LineColor1,
    borderRadius: scale(8),
  },
  bank_bank_name_2nd_container: {
    flexDirection: 'row',
    color: UGColor.TextColor1,
    alignItems: 'center',
    height: scale(70),
    borderTopWidth: scale(1),
    borderColor: UGColor.LineColor1,
  },
  bank_name: {
    flex: 1,
    color: UGColor.TextColor1,
    fontSize: scale(24),
    marginLeft: scale(16),
  },
  input_name: {
    flex: 1,
    color: UGColor.TextColor1,
    fontSize: scale(22),
    marginHorizontal: scale(16),
  },
  real_name: {
    color: UGColor.TextColor2,
    paddingVertical: scale(32),
    fontSize: scale(22),
  },
  right_icon: {
    marginRight: scale(16),
  },
  bank_picker: {
    backgroundColor: UGColor.BackgroundColor1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
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
  bank_name_icon: {
    width: scale(32),
    height: scale(32),
  },

})

export const GRID_LEFT_HEADER_WIDTH = scale(150) //左侧头宽
export const GRID_ITEM_WIDTH = scale(66) //一个格子宽
export const GRID_ITEM_HEIGHT = scale(46) //一个格子高

export default SetPasswordPage
