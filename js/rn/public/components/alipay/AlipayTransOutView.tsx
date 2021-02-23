import { Yuebao } from '../../type/YuebaoInterface'
import React, { useState } from 'react'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import md5 from 'blueimp-md5'
import { pop } from '../../navigation/RootNavigation'
import { Alert, Modal, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { Skin1 } from '../../theme/UGSkinManagers'
import AppDefine from '../../define/AppDefine'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const AlipayTransOutView = ({ yuebao, getData }: { yuebao: Yuebao, getData: () => void }) => {
  const [money, setMoney] = useState<any>()
  const [fundPwd, setFundPwd] = useState<string>()
  const [showModal, setShowModal] = useState(false)
  const transferOut = () => {
    api.yuebao.transfer(money, 'out', md5(fundPwd)).promise.then(async ({ data }) => {
      data && Alert.alert('转出成功', '', [{ text: '确认', onPress: async () => {
          await setShowModal(false)
          pop()
        } }])
      getData()
    }).catch((error) => {
      setShowModal(false)
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#dddddd' }}>
        <View style={{
          marginHorizontal: 120,
          paddingVertical: 12,
          borderBottomWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Skin1.tabSelectedColor,
        }}>
          <UGText style={{
            fontSize: 15,
            color: Skin1.tabSelectedColor,
          }}>提款至余额</UGText>
        </View>
      </View>
      <View style={{ backgroundColor: Skin1.themeColor, paddingHorizontal: 12, paddingVertical: 8, marginTop: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <UGText style={{ flex: 1 / 3, color: Skin1.isBlack ? "#fff" : "#111"}}>提款金额：</UGText>
          <TextInput
            style={{ backgroundColor: '#ffffff', flex: 1, borderWidth: 1, borderColor: '#dddddd', height: 30 }}
            keyboardType={'numeric'}
            placeholder={'请输入提款金额'}
            onChangeText={(text) => setMoney(parseInt(text))}>
            {money}
          </TextInput>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12 }}>
          <UGText style={{ fontSize: 13, color: Skin1.isBlack ? '#fff' : Skin1.textColor4 }}>{`可提余额：`}</UGText>
          <UGText style={{ fontSize: 13, color: '#fb4f48' }}>{yuebao?.balance || 0.000000000}</UGText>
          <UGText style={{ fontSize: 13, color: Skin1.isBlack ? '#fff' : Skin1.textColor4 }}>{` 元`}</UGText>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => {
        money ? setShowModal(true) : Alert.alert('请输入取款金额')
      }}>
        <View style={{
          backgroundColor: Skin1.themeColor,
          marginTop: 12,
          paddingVertical: 16,
          marginHorizontal: 28,
          alignItems: 'center',
          borderRadius: 4,
        }}>
          <UGText style={{ color: '#fff' }}>确认转出</UGText>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showModal}
      >
        <View style={{
          height: '100%',
          backgroundColor: '#fff',
          top: AppDefine.height / 6,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          paddingHorizontal: 40,
          alignItems: 'center',
          borderLeftWidth: 3,
          borderRightWidth: 3,
          borderTopWidth: 4,
          borderColor: '#eee',
        }}>
          <View style={{ marginTop: 40 }}>
            <UGText style={{ color: '#111' }}>向 余额 提款</UGText>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <UGText style={{ fontSize: 30 }}>¥</UGText>
              <UGText style={{ fontSize: 50 }}>{money || 0}</UGText>
            </View>
          </View>
          <UGText style={{ color: Skin1.textColor3 }}>请输入提款密码</UGText>
          <TextInput
            secureTextEntry={true}
            style={{ borderWidth: 0.5, borderColor: '#000', marginTop: 20, width: 200, height: 30, fontSize: 18 }}
            onChangeText={(text) => setFundPwd(text)} />
          <View style={{ flexDirection: 'row', marginTop: 32 }}>
            <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
              <View style={{
                borderColor: '#111',
                borderWidth: 0.5,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 48,
                marginLeft: 12,
              }}>
                <UGText>取消</UGText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={transferOut}>
              <View style={{
                borderColor: '#000',
                backgroundColor: '#000',
                borderWidth: 0.5,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 48,
                marginLeft: 12,
              }}>
                <UGText style={{ color: '#fff' }}>确认</UGText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  )
}
