import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, SafeAreaView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import AppDefine from '../define/AppDefine'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { Skin1 } from '../theme/UGSkinManagers'
import { pop } from '../navigation/RootNavigation'
import { OCHelper } from '../define/OCHelper/OCHelper'
import Icon from 'react-native-vector-icons/FontAwesome'

export const TransferRecordView = () => {
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const { data } = await api.real.transferLogs().promise
    setDataList(data.data.list)
    setDataList(data.data.list)
  }

  const emptyRow = () => {
    const arr = []
    for (let i = 0; i < 16; i++) {
      arr.push(<View style={{
        width: AppDefine.width - 20,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
        height: 50,
        alignSelf: 'flex-end',
      }} />)
    }

    return arr
  }

  return (
    <View>
      <SafeAreaView style={{ backgroundColor: Skin1.bgColor, borderBottomColor: '#cccccc', borderBottomWidth: 1 }}>
        <View style={{
          backgroundColor: Skin1.bgColor,
          width: Dimensions.get('screen').width,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
          <Text style={{
            paddingTop: 15,
            paddingBottom: 15,
            textAlign: 'center',
            fontSize: 17,
            width: '100%',
            alignSelf: 'center',
            color: Skin1.textColor1,
          }}>{'额度转换纪录'}</Text>
          <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => {
            pop()
            switch (Platform.OS) {
              case 'ios':
                OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true])
                break
              case 'android':

                break
            }
          }}>
            <Icon size={33} name={'angle-left'} color={Skin1.textColor1} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{ flex: 1, paddingVertical: 16, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
          <Text style={{ alignSelf: 'center' }}>游戏</Text>
        </View>
        <View
          style={{ flex: 1, paddingVertical: 16, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
          <Text style={{ alignSelf: 'center' }}>金额</Text>
        </View>
        <View
          style={{ flex: 1, paddingVertical: 16, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
          <Text style={{ alignSelf: 'center' }}>日期</Text>
        </View>
        <View
          style={{ flex: 1, paddingVertical: 16, borderBottomWidth: 1, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
          <Text style={{ alignSelf: 'center' }}>模式</Text>
        </View>
      </View>
      <FlatList
        data={dataList}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={{ backgroundColor: '#f6f6f6', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'absolute', width: AppDefine.width, height: AppDefine.height, top: 0 }}>
              {emptyRow()}
            </View>
            <Text style={{ color: '#c7c7c7', fontSize: 18 }}>暂无更多数据</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <Text style={{ alignSelf: 'center' }}>{item.gameName}</Text>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <Text style={{ alignSelf: 'center' }}>{`¥ ${item.amount}`}</Text>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <Text style={{ alignSelf: 'center' }}>{item.actionTime}</Text>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <Text style={{ alignSelf: 'center' }}>{item.isAuto ? '手动' : '自动'}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}
