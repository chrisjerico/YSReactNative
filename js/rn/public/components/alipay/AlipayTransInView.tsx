import React, { useState } from 'react'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import { FlatList, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { Skin1 } from '../../theme/UGSkinManagers'
import { Yuebao } from '../../type/YuebaoInterface'
import md5 from 'blueimp-md5'
import useHomePage from '../../hooks/tars/useHomePage'
import { pop } from '../../navigation/RootNavigation'

const quickArr = [100, 500, 1000, 5000, 10000, '全部金額']
export const AlipayTransInView = ({ yuebao, getData }: { yuebao: Yuebao, getData: () => void }) => {
  const { goTo, refresh, info } = useHomePage({})
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = info
  const [money, setMoney] = useState<number>()
  const [pwd, setPwd] = useState('')

  const transIn = () => {
    api.yuebao.transfer(money, 'in', md5(pwd)).promise.then(({ data }) => {
      data && getData()
      pop()
    })
  }

  return (
    <View style={{ backgroundColor: Skin1.bgColor, flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ backgroundColor: Skin1.themeColor, flex: 1, alignItems: 'center', paddingVertical: 8 }}>
          <Text style={{ color: Skin1.textColor4 }}>余额(元)</Text>
          <Text
            style={{ color: Skin1.textColor4, marginTop: 4 }}>{userInfo.balance ? parseInt(userInfo.balance).toFixed(2) : 0}</Text>
        </View>
        <View style={{ backgroundColor: Skin1.themeColor, flex: 1, alignItems: 'center', paddingVertical: 8 }}>
          <Text style={{ color: Skin1.textColor4 }}>支付宝钱包(元)</Text>
          <Text style={{ color: Skin1.textColor4, marginTop: 4 }}>{yuebao ? parseInt(yuebao?.balance).toFixed(2) : 0}</Text>
        </View>
      </View>
      <View style={{
        borderColor: '#afafaf',
        backgroundColor: '#ffffff',
        marginHorizontal: 28,
        borderWidth: 1,
        marginTop: 12,
        borderRadius: 2,
      }}>
        <TextInput
          placeholder={'转入金额'}
          style={{
            backgroundColor: '#e6e6e6',
            height: 36,
            marginVertical: 2,
            marginLeft: 10,
            paddingLeft: 4,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
          keyboardType={'numeric'}
          onChangeText={(text => setMoney(parseInt(text)))}
        >{money}</TextInput>
      </View>
      <View style={{
        borderColor: '#afafaf',
        backgroundColor: '#ffffff',
        marginHorizontal: 28,
        borderWidth: 1,
        marginTop: 12,
        borderRadius: 2,
      }}>
        <TextInput
          placeholder={'请输入验证密码'}
          style={{
            backgroundColor: '#e6e6e6',
            height: 36,
            marginVertical: 2,
            marginLeft: 10,
            paddingLeft: 4,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
          maxLength={4}
          onChangeText={text => setPwd(text)}
        />
      </View>
      {pwd.length < 4 &&
      <Text style={{ marginHorizontal: 28, paddingTop: 12, color: '#E00013', opacity: 0.4 }}>* 请输入 4 位取款密码</Text>}
      <FlatList
        ListFooterComponent={() => (
          <TouchableWithoutFeedback disabled={pwd.length < 4 || !money} onPress={transIn}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 16,
                marginTop: 8,
                borderRadius: 4,
                backgroundColor: Skin1.themeColor,
                opacity: pwd.length >= 4 && money ? 1 : 0.4,
              }}>
              <Text style={{ color: Skin1.textColor4 }}>确认转入</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        bounces={false}
        data={quickArr}
        style={{ marginTop: 12 }}
        numColumns={3}
        renderItem={({ item }) => {
          const text = typeof item == 'number' ? item + '元' : item
          const active = item === money || (money === parseInt(yuebao?.balance) && item == '全部金額')
          return (
            <TouchableWithoutFeedback onPress={() => {
              setMoney(item = typeof item == 'number' ? item : parseInt(yuebao.balance))
            }}>
              <View style={{
                backgroundColor: active ? '#ffffff' : '#eeeeee',
                flex: 1,
                borderColor: active ? Skin1.tabSelectedColor : '#eeeeee',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                marginHorizontal: 8,
                marginVertical: 4,
                borderRadius: 4,
              }}>
                <Text style={{
                  color: active ? Skin1.tabSelectedColor : Skin1.textColor1,
                  fontSize: 13,
                }}>{text}</Text>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
    </View>
  )
}
