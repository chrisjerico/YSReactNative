import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../../theme/UGSkinManagers'
import AppDefine from '../../define/AppDefine'
import { pop } from '../../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import moment from 'moment'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const AlipayTransferRecordView = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const start = await moment().subtract(1, 'month').format('yyyy-MM-DD hh:mm:ss')
    const end = ''
    api.yuebao.transferLogs(start, end).promise.then(({ data }) => {
      data && setData(data.data.list)
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        stickyHeaderIndices={[0]}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <UGText style={{ color: Skin1.textColor2, paddingTop: 32 }}>暂无数据</UGText>
          </View>
        )}
        style={{backgroundColor: '#f3f3f3', flex: 1}}
        contentContainerStyle={{ backgroundColor: '#f3f3f3'}}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 0.5, backgroundColor: Skin1.isBlack ? '#111' : "#fff"}}>
            <View style={{
              flex: 1,
              borderRightWidth: 0.5,
              borderRightColor: '#ccc',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>时间</UGText>
            </View>
            <View style={{
              flex: 1,
              borderRightWidth: 0.5,
              borderRightColor: '#ccc',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>类型</UGText>
            </View>
            <View style={{
              flex: 1,
              borderRightWidth: 0.5,
              borderRightColor: '#ccc',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>帐变金额</UGText>
            </View>
            <View
              style={{ flex: 1, alignItems: 'center', paddingVertical: 12 }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>余额</UGText>
            </View>
          </View>
        )}
        data={data}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 0.5, backgroundColor: Skin1.isBlack ? "#111" : "#fff" }}>
            <View style={{
              flex: 1,
              borderRightWidth: 0.5,
              borderRightColor: '#ccc',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>{item.changeTime}</UGText>
            </View>
            <View style={{
              flex: 1,
              borderRightWidth: 0.5,
              borderRightColor: '#ccc',
              alignItems: 'center',
              paddingVertical: 12,
              justifyContent: 'center'
            }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>{item.category}</UGText>
            </View>
            <View style={{
              flex: 1,
              borderRightWidth: 0.5,
              borderRightColor: '#ccc',
              alignItems: 'center',
              paddingVertical: 12,
              justifyContent: 'center'
            }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>{item.amount}</UGText>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 12,
              justifyContent: 'center'
            }}>
              <UGText style={{ fontSize: 16, color: Skin1.isBlack ? '#fff' : "#111" }}>{item.newBalance}</UGText>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const Header = () => {
  return (
    <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={{
        flexDirection: 'row',
      }}>
        <View style={{
          width: AppDefine.width,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
          <TouchableOpacity style={{ width: 30, height: 30, left: 20, position: 'absolute', zIndex: 2 }}
                            onPress={() => {
                              pop()
                            }}>
            <Icon size={28} name={'angle-left'} color={Skin1.isBlack ? '#fff' : Skin1.textColor4} />
          </TouchableOpacity>
          <UGText style={{
            alignSelf: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            flex: 1,
            color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
          }}>转入转出记录</UGText>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
