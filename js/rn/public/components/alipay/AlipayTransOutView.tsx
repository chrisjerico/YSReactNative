import { Yuebao } from '../../type/YuebaoInterface'
import React, { useState } from 'react'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import md5 from 'blueimp-md5'
import { pop } from '../../navigation/RootNavigation'
import { Modal, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { Skin1 } from '../../theme/UGSkinManagers'
import AppDefine from '../../define/AppDefine'

export const AlipayTransOutView = ({ yuebao, getData }: { yuebao: Yuebao, getData: () => void }) => {
  const [money, setMoney] = useState<any>()
  const [fundPwd, setFundPwd] = useState<string>()
  const [showModal, setShowModal] = useState(false)
  const transferOut = () => {
    api.yuebao.transfer(money, 'out', md5(fundPwd)).promise.then(async ({ data }) => {
      await setShowModal(false)
      pop()
      getData()
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
        <View style={{
          marginHorizontal: 120,
          paddingVertical: 12,
          borderBottomWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: Skin1.tabSelectedColor,
        }}>
          <Text style={{
            fontSize: 15,
            color: Skin1.tabSelectedColor,
          }}>提款至余额</Text>
        </View>
      </View>
      <View style={{ backgroundColor: Skin1.themeColor, paddingHorizontal: 12, paddingVertical: 8, marginTop: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1 / 3 }}>提款金额：</Text>
          <TextInput
            style={{ backgroundColor: '#ffffff', flex: 1, borderWidth: 1, borderColor: '#dddddd', height: 30 }}
            keyboardType={'numeric'}
            placeholder={'请输入提款金额'}
            onChangeText={(text) => setMoney(parseInt(text))}>
            {money}
          </TextInput>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12 }}>
          <Text style={{ fontSize: 13, color: Skin1.isBlack ? '#fff' : Skin1.textColor4 }}>{`可提余额：`}</Text>
          <Text style={{ fontSize: 13, color: '#fb4f48' }}>{yuebao?.balance || 0.000000000}</Text>
          <Text style={{ fontSize: 13, color: Skin1.isBlack ? '#fff' : Skin1.textColor4 }}>{` 元`}</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => setShowModal(true)}>
        <View style={{
          backgroundColor: Skin1.themeColor,
          marginTop: 12,
          paddingVertical: 16,
          marginHorizontal: 28,
          alignItems: 'center',
          borderRadius: 4,
        }}>
          <Text style={{ color: '#fff' }}>确认转出</Text>
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
            <Text style={{ color: '#111' }}>向 余额 提款</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 30 }}>¥</Text>
              <Text style={{ fontSize: 50 }}>{money || 0}</Text>
            </View>
          </View>
          <Text style={{ color: Skin1.textColor3 }}>请输入提款密码</Text>
          <TextInput
            secureTextEntry={true}
            style={{ borderWidth: 0.5, borderColor: '#000', marginTop: 20, width: 200, height: 30, fontSize: 18 }}
            onChangeText={(text) => setFundPwd(text)} />
          <View style={{ flexDirection: 'row', marginTop: 32}}>
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
                <Text>取消</Text>
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
                <Text style={{ color: '#fff' }}>确认</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
    </View>
  )
}
