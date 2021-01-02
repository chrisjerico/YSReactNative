import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as React from 'react'
import { useState } from 'react'
import { BaseScreen } from '../../../乐橙/component/BaseScreen'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../../public/theme/UGThemeColor'
import Button from '../../../../public/views/tars/Button'
import { pop } from '../../../../public/navigation/RootNavigation'
import UseForgetPassword from './UseForgetPassword'
import Icon from 'react-native-vector-icons/Entypo'
import { ANHelper } from '../../../../public/define/ANHelper/ANHelper'
import { CMD } from '../../../../public/define/ANHelper/hp/CmdDefine'
import { NA_DATA } from '../../../../public/define/ANHelper/hp/DataDefine'
import { ugLog } from '../../../../public/tools/UgLog'
import FastImage from 'react-native-fast-image'
import { anyEmpty } from '../../../../public/tools/Ext'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { hideLoading, showLoading, showSuccess } from '../../../../public/widget/UGLoadingCP'
import { UGStore } from '../../../../redux/store/UGStore'
import APIRouter from '../../../../public/network/APIRouter'

interface IRouteParams {
  onCallback?: () => any, //设置密码成功
}

/**
 * 忘记密码
 * @param navigation
 * @constructor
 */
const ForgetPasswordPage = ({ navigation, route }) => {

  const { onCallback }: IRouteParams = route?.params

  const {
    userInfo,
    systemInfo,
    bankCard,
    setBankCard,
    phoneNumber,
    setPhoneNumber,
    fundPassword,
    setFundPassword,
    firstImage,
    setFirstImage,
    secondImage,
    setSecondImage,
    bindPassword,
  } = UseForgetPassword()

  /**
   * 绘制提交身份证
   */
  const renderIdCard = () => {
    return <View style={_styles.add_img_container}>
      <Text style={_styles.add_img_text}>{'身份证正反面: '}</Text>
      <View style={_styles.add_img_bt_container}>
        <TouchableOpacity onPress={() => {
          ANHelper.callAsync(CMD.ASK_IMAGES,
            { value: '1' }).then((res) => {
              ugLog('res 2 =', JSON.stringify(res))
              if(res == null) return

            showLoading()
            api.user.uploadIdentity(JSON.parse(res)[0]?.compressPath).setCompletionBlock(
              ({ data, msg }) => {
                hideLoading()
                setFirstImage(data?.url)
              }, () => {
                hideLoading()
              })
          })
        }}>
          <View style={_styles.add_img}>
            {
              anyEmpty(firstImage) ?
                <Icon size={scale(72)}
                      color={Skin1.themeColor}
                      name={'plus'}/> :
                <Image source={{ uri: firstImage }}
                       style={_styles.id_image}
                       resizeMode={'stretch'}/>
            }
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          ANHelper.callAsync(CMD.ASK_IMAGES,
            { value: '1' }).then((res) => {
            ugLog('res 22 =', JSON.stringify(res))

            if(res == null) return

            showLoading()
            api.user.uploadIdentity(JSON.parse(res)[0]?.compressPath).setCompletionBlock(
              ({ data, msg }) => {
                hideLoading()
                setSecondImage(data?.url)
              }, () => {
                hideLoading()
              })
          })          }}>
          <View style={_styles.add_img}>
            {
              anyEmpty(secondImage) ?
                <Icon size={scale(72)}
                      color={Skin1.themeColor}
                      name={'plus'}/> :
                <Image source={{ uri: secondImage }}
                       style={_styles.id_image}
                       resizeMode={'stretch'}/>
            }
          </View>
        </TouchableOpacity>
      </View>
    </View>
  }

  /**
   * 绘制绑定密码
   */
  const renderBindPwd = () => <View style={_styles.item_pwd_container}>
    <View style={_styles.item_pwd_content}>
      {
        systemInfo?.coinPwdAuditOptionAry?.includes('bank') ?
          <View style={_styles.bank_bank_name_2nd_container}>
            <TextInput style={_styles.input_name}
                       onChangeText={text => setBankCard(text)}
                       placeholder={'输入提款银行卡号'}/>
          </View> :
          null
      }
      {
        systemInfo?.coinPwdAuditOptionAry?.includes('mobile') ?
          <View style={_styles.bank_bank_name_2nd_container}>
            <TextInput style={_styles.input_name}
                       onChangeText={text => setPhoneNumber(text)}
                       placeholder={'输入手机号'}/>
          </View> :
          null
      }
      <View style={_styles.bank_bank_name_2nd_container}>
        <TextInput style={_styles.input_name}
                   maxLength={4}
                   secureTextEntry={true}
                   keyboardType={'numeric'}
                   onChangeText={text => setFundPassword(text)}
                   placeholder={'新的四位取款密码'}/>
      </View>
      {
        systemInfo?.coinPwdAuditOptionAry?.includes('id') ?
          renderIdCard() :
          null
      }
    </View>

    <Button title={'提交'}
            titleStyle={_styles.submit_text}
            containerStyle={[_styles.submit_bt,
              { backgroundColor: Skin1.themeColor }]}
            onPress={() => {
              bindPassword().then((res) => {
                if (res == 0) {
                  onCallback && onCallback()
                }
              })

            }}/>
  </View>

  return (
    <BaseScreen style={_styles.container} screenName={'忘记密码'}>
      {
        renderBindPwd()
      }
    </BaseScreen>
  )
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: UGColor.BackgroundColor1,
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
  bank_bank_name_2nd_container: {
    flexDirection: 'row',
    color: UGColor.TextColor1,
    alignItems: 'center',
    height: scale(70),
    borderBottomWidth: scale(1),
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
  submit_text: {
    fontSize: scale(22),
    color: 'white',
  },
  submit_bt: {
    width: '100%',
    height: scale(66),
    borderRadius: scale(8),
  },
  add_img_text: {
    fontSize: scale(24),
    color: UGColor.TextColor3,
  },
  add_img: {
    width: scale(196),
    aspectRatio: 1,
    borderWidth: scale(2),
    borderRadius: scale(8),
    borderStyle: 'dashed',
    borderColor: UGColor.LineColor2,
    marginHorizontal: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  id_image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(8),
  },
  add_img_container: {
    padding: scale(16),
  },
  add_img_bt_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: scale(16),
  },


})

export default ForgetPasswordPage
