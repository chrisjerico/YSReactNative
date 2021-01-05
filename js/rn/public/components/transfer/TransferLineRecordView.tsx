import React, { useEffect, useState } from 'react'
import { api } from '../../network/NetworkRequest1/NetworkRequest1'
import { FlatList, Text, View } from 'react-native'
import AppDefine from '../../define/AppDefine'
import LinearGradient from 'react-native-linear-gradient'
import { Skin1 } from '../../theme/UGSkinManagers'

export const TransferLineRecordView = () => {
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
    <FlatList
      data={dataList}
      onRefresh={() => getData()}
      refreshing={isRefreshing}
      style={{ backgroundColor: Skin1.bgColor, flex: 1 }}
      contentContainerStyle={{ backgroundColor: '#cccccc', flex: 1 }}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={() => (
        <LinearGradient colors={Skin1.bgColor}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}>
          <View style={{
            flexDirection: 'row', borderBottomColor: '#cccccc',
            borderBottomWidth: 1,
          }}>
            <View
              style={{ flex: 1, paddingVertical: 16, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
              <Text style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>游戏</Text>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
              <Text style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>金额</Text>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16, borderRightWidth: 1, borderColor: '#d9d9d9' }}>
              <Text style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>日期</Text>
            </View>
            <View
              style={{ flex: 1, paddingVertical: 16, borderColor: '#d9d9d9' }}>
              <Text style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>模式</Text>
            </View>
          </View>
        </LinearGradient>
      )}
      ListEmptyComponent={() => (
        <View style={{ backgroundColor: '#f6f6f6', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Skin1.isBlack ? '#000' : '#c7c7c7', fontSize: 18 }}>暂无更多数据</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Skin1.isBlack ? Skin1.themeColor : Skin1.cellBgColor,
        }}>
          <View
            style={{ flex: 1, paddingVertical: 16 }}>
            <Text style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>{item.gameName}</Text>
          </View>
          <View
            style={{ flex: 1, paddingVertical: 16 }}>
            <Text style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>{`¥ ${item.amount}`}</Text>
          </View>
          <View
            style={{ flex: 1, paddingVertical: 16 }}>
            <Text style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>{item.actionTime}</Text>
          </View>
          <View
            style={{ flex: 1, paddingVertical: 16 }}>
            <Text
              style={{ alignSelf: 'center', color: Skin1.isBlack ? '#fff' : '#000' }}>{item.isAuto ? '手动' : '自动'}</Text>
          </View>
        </View>
      )}
    />
  )
}
