import React, { useState } from 'react'
import { Alert, Image, Modal, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { scale } from '../../../public/tools/Scale'
import TouchableImage from '../../../public/views/tars/TouchableImage'
import Button from '../../../public/views/tars/Button'
import AppDefine from '../../../public/define/AppDefine'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { Res } from '../../../Res/icon/Res'
import { ugLog } from '../../../public/tools/UgLog'
import PushHelper from '../../../public/define/PushHelper'
import { PushHomeGame } from '../../../public/models/Interface'
import { PageName } from '../../../public/navigation/Navigation'
import { push } from '../../../public/navigation/RootNavigation'
import { UGStore } from '../../../redux/store/UGStore'
import { ToastError } from '../../../public/tools/tars'
import { Toast } from '../../../public/tools/ToastUtils'
import APIRouter from '../../../public/network/APIRouter'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface PromotionRechargeModalProps {
  item: any,
  showPopView: boolean
  closePop: () => any
}

const PromotionRechargeModal = ({ item, showPopView, closePop }: PromotionRechargeModalProps) => {
  const [showPop, setShowPop] = useState(showPopView)
  const [money, setMoney] = useState()
  const userInfo = UGStore.globalProps.userInfo

  const goRecharge = async () => {
    const response = await APIRouter.recommend_recharge(item?.uid, money)
    closePop()
    Alert.alert(null, response?.data.msg, [
      { text: '确认' }
    ])
  }

  ugLog("item=", item)
  ugLog("showPop=", showPop)
  return (
    <Modal
      transparent={true}
      onRequestClose={()=> {setShowPop(false)}}
      >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: '80%',
            height: '61%',
            backgroundColor: 'rgb(255,255,255)',
            borderRadius: scale(12),
          }}>
          <View
            style={{
              height:60,
              alignItems: 'center',
              borderTopRightRadius: scale(10),
              borderTopLeftRadius: scale(10),
            }}>
            <UGText style={{ marginVertical:13, fontSize: 17, fontWeight: '500' }}>用户信息</UGText>
            <View style={styles.line} />
          </View>

          <ScrollView>
          <View style={{ flex:1, paddingHorizontal: scale(20) }}>
            <View style={styles.textCol}>
              <UGText style={styles.textColTitle}>帐户状态:</UGText>
              <UGText style={{ fontSize: 16, fontWeight: '500' }}>{item?.enable}</UGText>
            </View>
            <View style={styles.line} />
            <View style={styles.textCol}>
              <UGText style={styles.textColTitle}>用户姓名:</UGText>
              <UGText style={{ fontSize: 16, fontWeight: '500' }}>{item?.name}</UGText>
            </View>
            <View style={styles.line} />
            <View style={styles.textCol}>
              <UGText style={styles.textColTitle}>注册时间:</UGText>
              <UGText style={{ fontSize: 16, fontWeight: '500' }}>{item?.regtime}</UGText>
            </View>
            <View style={styles.line} />
            <View style={styles.textCol}>
              <UGText style={styles.textColTitle}>上级关系:</UGText>
              <UGText style={{ fontSize: 16, fontWeight: '500' }}>{userInfo.usr + " > " + item?.username}</UGText>
            </View>
            <View style={styles.line} />
            <View style={styles.textCol}>
              <UGText style={styles.textColTitle}>用户余额:</UGText>
              <UGText style={{ fontSize: 16, fontWeight: '500', color: 'red' }}>¥ {item?.coin}</UGText>
            </View>
            <View style={styles.line} />
            <View style={styles.textCol}>
              <UGText style={styles.textColTitle}>我的余额:</UGText>
              <UGText style={{ fontSize: 16, fontWeight: '500', color: 'red' }}>¥ {userInfo?.balance}</UGText>
            </View>
            <View style={styles.line} />
            <View style={styles.textCol}>
              <UGText style={styles.textColTitle}>充值金额:</UGText>
              <TextInput
                placeholder={'范围: 0-100000元'}
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 2,
                  height: scale(50),
                  width: scale(200),
                  padding: scale(10)
                }}
                keyboardType={'numeric'}
                onChangeText={(text => setMoney(parseInt(text)))}
              >{money}</TextInput>
            </View>
          </View>
        </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              title={'取消'}
              onPress={closePop}
              titleStyle={{ color: '#000', fontSize: 16 }}
              containerStyle={styles.cancelButton}
            />
            <Button
              title={'确认'}
              onPress={() => {
                if (money == undefined || money?.length == 0) {
                  Toast('请输入充值金额')
                } else {
                  goRecharge()
                }
              }}
              titleStyle={{ color: '#fff', fontSize: 16 }}
              containerStyle={styles.confirmButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: '#8E8E8E',
    borderWidth: AppDefine.onePx,
    width: scale(185),
    height:42,
    borderRadius: scale(5),
  },
  confirmButton: {
    backgroundColor:'#cc5c54',
    borderWidth: AppDefine.onePx,
    borderColor: '#8E8E8E',
    width: scale(185),
    height:42,
    borderRadius: scale(5),
  },
  title: {
    fontSize: scale(25),
    marginVertical: scale(10),
  },
  textCol: {
    flexDirection: 'row',
    marginVertical: scale(15),
  },
  textColTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: scale(20),
    textAlignVertical: 'center',
  },
  line: {
    height:1,
    width:'100%',
    backgroundColor:'#ddd'
  }
})

export default PromotionRechargeModal
