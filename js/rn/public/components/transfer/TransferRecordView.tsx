import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import AppDefine from '../../define/AppDefine'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import { Skin1 } from '../../theme/UGSkinManagers'
import { pop } from '../../navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const TransferRecordView = () => {
  const [dataList, setDataList] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setIsRefreshing(true)
    const { data } = await api.real.transferLogs().promise
    setDataList(data.data.list)
    setDataList(data.data.list)
    setIsRefreshing(false)
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
    <View style={{ flex: 1 }}>
      <LinearGradient colors={Skin1.navBarBgColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SafeAreaView style={{ backgroundColor: Skin1.bgColor }}>
          <View style={{
            backgroundColor: Skin1.bgColor,
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
            <UGText style={{
              paddingTop: 15,
              paddingBottom: 15,
              textAlign: 'center',
              fontSize: 17,
              width: '100%',
              alignSelf: 'center',
              color: Skin1.isBlack ? '#fff' : Skin1.textColor4,
            }}>{'额度转换记录'}</UGText>
            <TouchableOpacity style={{ width: 30, position: 'absolute', left: 20 }} onPress={() => pop()}>
              <Icon size={33} name={'angle-left'} color={Skin1.isBlack ? '#fff' :Skin1.textColor4} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <LinearGradient colors={Skin1.bgColor}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}>
        <View style={{ flexDirection: 'row', borderBottomColor: "#cccccc",
          borderBottomWidth: 1, }}>
          <View
            style={{ flex: 1, paddingVertical: 16, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
            <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000" }}>游戏</UGText>
          </View>
          <View
            style={{ flex: 1, paddingVertical: 16, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
            <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000"  }}>金额</UGText>
          </View>
          <View
            style={{ flex: 1, paddingVertical: 16, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
            <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000"  }}>日期</UGText>
          </View>
          <View
            style={{ flex: 1, paddingVertical: 16, borderColor: '#d9d9d9' }}>
            <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000"  }}>模式</UGText>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        data={dataList}
        onRefresh={() => getData()}
        refreshing={isRefreshing}
        style={{ backgroundColor: Skin1.bgColor }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#cccccc' }}
        ListEmptyComponent={() => (
          <View style={{ backgroundColor: '#f6f6f6', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'absolute', width: AppDefine.width, height: AppDefine.height, top: 0 }}>
              {emptyRow()}
            </View>
            <UGText style={{ color: Skin1.isBlack ? "#000" : '#c7c7c7', fontSize: 18,  }}>暂无更多数据</UGText>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Skin1.isBlack ? Skin1.themeColor : Skin1.cellBgColor }}>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000"  }}>{item.gameName}</UGText>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000" }}>{`¥ ${item.amount}`}</UGText>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000" }}>{item.actionTime}</UGText>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16 }}>
              <UGText style={{ alignSelf: 'center', color: Skin1.isBlack ? "#fff" : "#000" }}>{item.isAuto ? '手动' : '自动'}</UGText>
            </View>
          </View>
        )}
      />
    </View>
  )
}
